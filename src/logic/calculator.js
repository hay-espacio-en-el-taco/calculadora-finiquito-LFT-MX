import { differenceInDays, startOfYear, isBefore, parseISO, addYears, differenceInYears } from 'date-fns';


export const LFT_CONSTANTS = {
  DAYS_IN_YEAR: 365,
  MIN_PRIMA_VACACIONAL: 0.25,
  MIN_AGUINALDO_DAYS: 15,
};

export const getVacationDaysByLaw = (years) => {
  if (years < 1) return 0;
  if (years === 1) return 12;
  if (years === 2) return 14;
  if (years === 3) return 16;
  if (years === 4) return 18;
  if (years === 5) return 20;
  if (years <= 10) return 22;
  if (years <= 15) return 24;
  if (years <= 20) return 26;
  if (years <= 25) return 28;
  return 30;
};

export const calculateAguinaldo = (dailySalary, startDate, endDate, contractAguinaldoDays = 15) => {
  const dStart = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const dEnd = typeof endDate === 'string' ? parseISO(endDate) : endDate;

  const firstDayOfYear = startOfYear(dEnd);
  const calculationStart = isBefore(dStart, firstDayOfYear) ? firstDayOfYear : dStart;

  const daysWorkedThisYear = differenceInDays(dEnd, calculationStart) + 1;
  const proportionalDays = (contractAguinaldoDays / LFT_CONSTANTS.DAYS_IN_YEAR) * daysWorkedThisYear;
  
  return {
    amount: Number((proportionalDays * dailySalary).toFixed(2)),
    daysWorkedThisYear,
    proportionalDays: Number(proportionalDays.toFixed(4))
  };
};

export const calculateVacations = (dailySalary, startDate, endDate, contractPrimaVacacional = 0.25) => {
  const dStart = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const dEnd = typeof endDate === 'string' ? parseISO(endDate) : endDate;

  const totalYears = differenceInYears(dEnd, dStart);
  const lastAnniversary = addYears(dStart, totalYears);
  
  const daysSinceAnniversary = differenceInDays(dEnd, lastAnniversary) + 1;
  
  const vacationDaysForThisYear = getVacationDaysByLaw(totalYears + 1);
  
  const proportionalVacationDays = (vacationDaysForThisYear / LFT_CONSTANTS.DAYS_IN_YEAR) * daysSinceAnniversary;
  const vacationAmount = proportionalVacationDays * dailySalary;
  const primaAmount = vacationAmount * contractPrimaVacacional;

  return {
    vacationAmount: Number(vacationAmount.toFixed(2)),
    primaAmount: Number(primaAmount.toFixed(2)),
    daysSinceAnniversary,
    proportionalVacationDays: Number(proportionalVacationDays.toFixed(4))
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
};

export const ECON_2026 = {
  MIN_SALARY_GENERAL: 315.04,
  MIN_SALARY_FRONTERA: 440.87,
  UMA: 117.31
};

/**
 * Calcula el Salario Diario Integrado (SDI)
 * El SDI es la base para las indemnizaciones de 90 y 20 días.
 */
export const calculateSDI = (dailySalary, aguinaldoDays = 15, vacationDays = 12, primaVacacional = 0.25) => {
  const aguinaldoFactor = aguinaldoDays / 365;
  const vacationFactor = (vacationDays * primaVacacional) / 365;
  
  // Factor de Integración Mínimo de Ley (aprox 1.0493 el primer año)
  const integrationFactor = 1 + aguinaldoFactor + vacationFactor;
  
  return Number((dailySalary * integrationFactor).toFixed(2));
};

/**
 * Indemnización Constitucional (90 días)
 * @param {number} sdi - Salario Diario Integrado
 */
export const calculateIndemnity90 = (sdi) => {
  return Number((sdi * 90).toFixed(2));
};

/**
 * Prima de Antigüedad (Art. 162 LFT)
 * @param {number} dailySalary - Salario Diario (SD), NO el integrado.
 * @param {number} yearsOfService - Años totales (incluyendo fracciones)
 * @param {boolean} isFrontera - Para determinar el tope del salario mínimo
 */
export const calculateSeniorityPremium = (dailySalary, yearsOfService, isFrontera = false) => {
  const minSalary = isFrontera ? ECON_2026.MIN_SALARY_FRONTERA : ECON_2026.MIN_SALARY_GENERAL;
  
  // REGLA LFT: El salario base para este cálculo se topa a 2 salarios mínimos
  const cap = minSalary * 2;
  const baseSalary = Math.min(dailySalary, cap);
  
  // 12 días de salario por cada año de servicio
  const amount = baseSalary * 12 * yearsOfService;
  
  return {
    amount: Number(amount.toFixed(2)),
    isCapped: dailySalary > cap,
    capUsed: cap
  };
};

/**
 * Indemnización de 20 días por año (Art. 50 LFT)
 * Se usa comúnmente en negociaciones de despido injustificado.
 */
export const calculateIndemnity20 = (sdi, yearsOfService) => {
  return Number((sdi * 20 * yearsOfService).toFixed(2));
};

/**
 * Valida los datos capturados antes de calcular.
 * Los errores impiden el cálculo; las advertencias solo se muestran.
 */
export const validateInputs = ({
  startDate,
  endDate,
  monthlySalary,
  pendingVacationDays,
  aguinaldoDays = String(LFT_CONSTANTS.MIN_AGUINALDO_DAYS),
  primaVacacionalPercent = String(LFT_CONSTANTS.MIN_PRIMA_VACACIONAL * 100),
  sdiMode = 'calculado',
  sdiManual = '',
}, today = new Date()) => {
  const errors = {};
  const warnings = [];

  if (!startDate) errors.startDate = 'Captura la fecha de ingreso.';
  if (!endDate) errors.endDate = 'Captura la fecha de salida.';

  if (startDate && endDate) {
    const dStart = parseISO(startDate);
    const dEnd = parseISO(endDate);
    if (Number.isNaN(dStart.getTime())) errors.startDate = 'La fecha de ingreso no es válida.';
    if (Number.isNaN(dEnd.getTime())) errors.endDate = 'La fecha de salida no es válida.';
    if (!errors.startDate && !errors.endDate) {
      if (!isBefore(dStart, dEnd)) {
        errors.endDate = 'La fecha de salida debe ser posterior a la de ingreso.';
      }
      if (isBefore(today, dStart)) {
        errors.startDate = 'La fecha de ingreso no puede ser futura.';
      } else if (isBefore(today, dEnd)) {
        warnings.push('La fecha de salida es futura: el resultado es una proyección.');
      }
    }
  }

  const salary = Number(monthlySalary);
  if (!monthlySalary || Number.isNaN(salary) || salary <= 0) {
    errors.monthlySalary = 'El sueldo mensual debe ser mayor a 0.';
  }

  const pending = Number(pendingVacationDays);
  if (pendingVacationDays !== '' && (Number.isNaN(pending) || pending < 0)) {
    errors.pendingVacationDays = 'Los días pendientes no pueden ser negativos.';
  }

  // Art. 87 LFT: el contrato puede mejorar el aguinaldo, nunca reducirlo
  const aguinaldo = Number(aguinaldoDays);
  if (aguinaldoDays === '' || Number.isNaN(aguinaldo) || aguinaldo < LFT_CONSTANTS.MIN_AGUINALDO_DAYS) {
    errors.aguinaldoDays = `El mínimo legal es de ${LFT_CONSTANTS.MIN_AGUINALDO_DAYS} días (Art. 87 LFT).`;
  }

  // Art. 80 LFT: la prima vacacional no puede ser menor al 25 %
  const prima = Number(primaVacacionalPercent);
  if (primaVacacionalPercent === '' || Number.isNaN(prima) || prima < LFT_CONSTANTS.MIN_PRIMA_VACACIONAL * 100) {
    errors.primaVacacionalPercent = `El mínimo legal es del ${LFT_CONSTANTS.MIN_PRIMA_VACACIONAL * 100} % (Art. 80 LFT).`;
  } else if (prima > 100) {
    warnings.push('La prima vacacional capturada es mayor al 100 %. Verifica que sea correcta.');
  }

  if (sdiMode === 'capturado') {
    const sdi = Number(sdiManual);
    if (!sdiManual || Number.isNaN(sdi) || sdi <= 0) {
      errors.sdiManual = 'Captura un SDI mayor a 0.';
    } else if (!errors.monthlySalary && sdi < salary / 30) {
      errors.sdiManual = 'El SDI no puede ser menor al salario diario (sueldo mensual / 30).';
    }
  }

  return { errors, warnings, isValid: Object.keys(errors).length === 0 };
};

/**
 * Calcula el finiquito y, en su caso, la indemnización completa.
 * Fundamento de cada concepto en docs/MARCO_LEGAL.md.
 */
export const calculateSettlement = ({
  startDate,
  endDate,
  monthlySalary,
  zone,
  separationType,
  pendingVacationDays = 0,
  applies20Days = false,
  aguinaldoDays = LFT_CONSTANTS.MIN_AGUINALDO_DAYS,
  primaVacacionalPercent = LFT_CONSTANTS.MIN_PRIMA_VACACIONAL * 100,
  sdiMode = 'calculado',
  sdiManual = '',
}) => {
  const dStart = parseISO(startDate);
  const dEnd = parseISO(endDate);
  const isFrontera = zone === 'frontera';
  const isDespido = separationType === 'despido';

  // Prestaciones del contrato, nunca menores a las de ley (Arts. 80 y 87 LFT)
  const contractAguinaldoDays = Math.max(Number(aguinaldoDays) || 0, LFT_CONSTANTS.MIN_AGUINALDO_DAYS);
  const contractPrima = Math.max((Number(primaVacacionalPercent) || 0) / 100, LFT_CONSTANTS.MIN_PRIMA_VACACIONAL);

  // Art. 89 LFT: el salario mensual se divide entre 30
  const dailySalary = Number(monthlySalary) / 30;

  // Antigüedad con fracciones para conceptos proporcionales
  const yearsOfService = (differenceInDays(dEnd, dStart) + 1) / LFT_CONSTANTS.DAYS_IN_YEAR;
  const completedYears = differenceInYears(dEnd, dStart);

  // Arts. 84 y 89 LFT: SDI con las prestaciones del contrato y los días de vacaciones según antigüedad (Art. 76).
  // Si el usuario conoce su SDI (p. ej. con otras prestaciones integrables), se usa el capturado.
  const calculatedSdi = calculateSDI(dailySalary, contractAguinaldoDays, getVacationDaysByLaw(completedYears + 1), contractPrima);
  const isSdiCaptured = sdiMode === 'capturado' && Number(sdiManual) > 0;
  const sdi = isSdiCaptured ? Number(Number(sdiManual).toFixed(2)) : calculatedSdi;

  // El finiquito se calcula con el salario ordinario (cuota diaria); el SDI solo es base de indemnizaciones (Art. 89)
  const aguinaldo = calculateAguinaldo(dailySalary, dStart, dEnd, contractAguinaldoDays);
  const vacations = calculateVacations(dailySalary, dStart, dEnd, contractPrima);

  // Arts. 76, 80 y 81 LFT: vacaciones de años anteriores no disfrutadas, con su prima
  const pendingDays = Number(pendingVacationDays) || 0;
  const pendingVacationAmount = Number((pendingDays * dailySalary).toFixed(2));
  const pendingPrimaAmount = Number((pendingVacationAmount * contractPrima).toFixed(2));

  // Art. 162 fr. III LFT: en renuncia solo con 15 años o más; en despido siempre
  const seniorityApplies = isDespido || completedYears >= 15;
  const seniority = seniorityApplies
    ? calculateSeniorityPremium(dailySalary, yearsOfService, isFrontera)
    : null;

  const indemnity90 = isDespido ? calculateIndemnity90(sdi) : 0;
  // Art. 50 fr. II LFT: solo en los supuestos de los Arts. 49, 52 y 947
  const indemnity20 = isDespido && applies20Days ? calculateIndemnity20(sdi, yearsOfService) : 0;

  const finiquitoTotal = aguinaldo.amount
    + vacations.vacationAmount + vacations.primaAmount
    + pendingVacationAmount + pendingPrimaAmount
    + (!isDespido && seniority ? seniority.amount : 0);

  const indemnityTotal = indemnity90 + indemnity20 + (isDespido && seniority ? seniority.amount : 0);

  return {
    dailySalary: Number(dailySalary.toFixed(2)),
    sdi,
    calculatedSdi,
    isSdiCaptured,
    contractAguinaldoDays,
    contractPrimaPercent: Number((contractPrima * 100).toFixed(2)),
    yearsOfService: Number(yearsOfService.toFixed(4)),
    completedYears,
    isDespido,
    aguinaldo,
    vacations,
    pendingVacationDays: pendingDays,
    pendingVacationAmount,
    pendingPrimaAmount,
    seniority,
    indemnity90,
    indemnity20,
    finiquitoTotal: Number(finiquitoTotal.toFixed(2)),
    indemnityTotal: Number(indemnityTotal.toFixed(2)),
    grossTotal: Number((finiquitoTotal + indemnityTotal).toFixed(2)),
  };
};

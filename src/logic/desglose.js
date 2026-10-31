import { formatCurrency } from './calculator';

// Referencias a los artículos de src/data/articulos.json que fundamentan cada concepto
export const ARTICULOS = {
  aguinaldo: ['LFT-87'],
  vacaciones: ['LFT-76', 'LFT-77', 'LFT-78', 'LFT-79'],
  primaVacacional: ['LFT-80'],
  primaAntiguedad: ['LFT-162', 'LFT-485', 'LFT-486'],
  indemnizacion90: ['CPEUM-123-A-XXII', 'LFT-48', 'LFT-50'],
  indemnizacion20: ['LFT-50', 'LFT-49', 'LFT-52'],
  salarioDiario: ['LFT-89', 'LFT-82'],
  sdi: ['LFT-84', 'LFT-89'],
};

const formatYears = (years) => `${years.toFixed(2)} años`;

/**
 * Arma el desglose que se muestra en pantalla y en el PDF a partir del resultado de calculateSettlement.
 * Cada concepto lleva su fundamento legal y la fórmula aplicada.
 */
export const buildBreakdown = (result) => {
  const seniorityBase = result.seniority
    ? (result.seniority.isCapped ? result.seniority.capUsed : result.dailySalary)
    : 0;
  const seniorityRow = result.seniority && {
    id: 'primaAntiguedad',
    concepto: 'Prima de antigüedad',
    articulo: 'Art. 162 LFT',
    ids: ARTICULOS.primaAntiguedad,
    detalle: `12 días × ${formatYears(result.yearsOfService)} × ${formatCurrency(seniorityBase)}${result.seniority.isCapped ? ' (tope)' : ''}`,
    importe: result.seniority.amount,
  };

  const vacationDays = result.vacations.proportionalVacationDays + result.pendingVacationDays;

  const finiquito = [
    {
      id: 'aguinaldo',
      concepto: 'Aguinaldo proporcional',
      articulo: 'Art. 87 LFT',
      ids: ARTICULOS.aguinaldo,
      detalle: `${result.contractAguinaldoDays} días por año · ${result.aguinaldo.proportionalDays.toFixed(2)} días proporcionales`,
      importe: result.aguinaldo.amount,
    },
    {
      id: 'vacaciones',
      concepto: 'Vacaciones',
      articulo: 'Arts. 76-79 LFT',
      ids: ARTICULOS.vacaciones,
      detalle: result.pendingVacationDays > 0
        ? `${vacationDays.toFixed(2)} días (proporcionales y pendientes de años anteriores)`
        : `${vacationDays.toFixed(2)} días proporcionales`,
      importe: Number((result.vacations.vacationAmount + result.pendingVacationAmount).toFixed(2)),
    },
    {
      id: 'primaVacacional',
      concepto: 'Prima vacacional',
      articulo: 'Art. 80 LFT',
      ids: ARTICULOS.primaVacacional,
      detalle: `${result.contractPrimaPercent} % sobre las vacaciones`,
      importe: Number((result.vacations.primaAmount + result.pendingPrimaAmount).toFixed(2)),
    },
  ];
  if (!result.isDespido && seniorityRow) {
    finiquito.push({ ...seniorityRow, articulo: 'Art. 162 LFT (15 años o más)' });
  }

  const indemnizacion = [];
  if (result.isDespido) {
    indemnizacion.push({
      id: 'indemnizacion90',
      concepto: 'Indemnización constitucional (90 días)',
      articulo: 'Art. 123 Const. / Arts. 48 y 50 LFT',
      ids: ARTICULOS.indemnizacion90,
      detalle: `90 días × SDI ${formatCurrency(result.sdi)}`,
      importe: result.indemnity90,
    });
    if (result.indemnity20 > 0) {
      indemnizacion.push({
        id: 'indemnizacion20',
        concepto: '20 días por año',
        articulo: 'Art. 50 fr. II LFT',
        ids: ARTICULOS.indemnizacion20,
        detalle: `20 días × ${formatYears(result.yearsOfService)} × SDI ${formatCurrency(result.sdi)}`,
        importe: result.indemnity20,
      });
    }
    if (seniorityRow) indemnizacion.push(seniorityRow);
  }

  return { finiquito, indemnizacion };
};

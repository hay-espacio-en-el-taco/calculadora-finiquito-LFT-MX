import { lazy, Suspense, useState } from 'react';
import ArticuloLink from './ArticuloLink';
import Icon from './Icon';
import ReporteImpresion from './ReporteImpresion';
import { calculateSettlement, formatCurrency, validateInputs } from '../logic/calculator';
import { ARTICULOS, buildBreakdown } from '../logic/desglose';

// El texto de los artículos solo se descarga al abrir el primero
const ArticuloModal = lazy(() => import('./ArticuloModal'));

const INITIAL_FORM = {
  startDate: '2020-01-15',
  endDate: '2026-03-31',
  monthlySalary: '25000',
  zone: 'general',
  separationType: 'renuncia',
  pendingVacationDays: '0',
  applies20Days: false,
  aguinaldoDays: '15',
  primaVacacionalPercent: '25',
  sdiMode: 'calculado',
  sdiManual: '',
};

const inputClass =
  'w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all';
const labelClass = 'text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5';
const sectionTitleClass =
  'text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block border-b border-slate-100 pb-2';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[11px] text-[#ba1a1a] mt-1 ml-0.5">
      {message}
    </p>
  );
}

function ConceptRow({ concepto, onOpenArticle }) {
  return (
    <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-900">{concepto.concepto}</span>
        <span className="text-[10px] text-slate-400 italic">
          <ArticuloLink ids={concepto.ids} onOpen={onOpenArticle}>
            {concepto.articulo}
          </ArticuloLink>{' '}
          · {concepto.detalle}
        </span>
      </div>
      <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">{formatCurrency(concepto.importe)}</span>
    </div>
  );
}

function Landing() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState(() => validateInputs(INITIAL_FORM).warnings);
  const [result, setResult] = useState(() => calculateSettlement(INITIAL_FORM));
  // Datos con los que se hizo el último cálculo (el PDF refleja el resultado en pantalla, no el formulario sin calcular)
  const [calculatedForm, setCalculatedForm] = useState(INITIAL_FORM);
  const [openArticle, setOpenArticle] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateInputs(form);
    setErrors(validation.errors);
    setWarnings(validation.warnings);
    if (validation.isValid) {
      setResult(calculateSettlement(form));
      setCalculatedForm(form);
    }
  };

  // El navegador genera el PDF con su diálogo de impresión ("Guardar como PDF"), usando ReporteImpresion
  const handleExportPdf = () => {
    const originalTitle = document.title;
    document.title = `Estimacion-finiquito-${new Date().toISOString().slice(0, 10)}`;
    window.addEventListener('afterprint', () => { document.title = originalTitle; }, { once: true });
    window.print();
  };

  const isDespidoSelected = form.separationType === 'despido';
  const breakdown = buildBreakdown(result);

  return (
    <>
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 print:hidden">
        {/* Input Form Section */}
        <section className="lg:col-span-5">
          <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-lg">
            <div className="flex items-center gap-3 mb-10">
              <h1 className="font-display text-xl font-bold text-slate-900">
                Datos del Trabajador
              </h1>
            </div>
            <form className="space-y-10" onSubmit={handleSubmit} noValidate>
              {/* Personal & Contract Data */}
              <div className="space-y-6">
                <h2 className={sectionTitleClass}>Datos Personales &amp; Contrato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="startDate" className={labelClass}>
                      Fecha de Ingreso
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.startDate)}
                      aria-describedby={errors.startDate ? 'startDate-error' : undefined}
                      className={inputClass}
                    />
                    <FieldError id="startDate-error" message={errors.startDate} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="endDate" className={labelClass}>
                      Fecha de Salida
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={form.endDate}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.endDate)}
                      aria-describedby={errors.endDate ? 'endDate-error' : undefined}
                      className={inputClass}
                    />
                    <FieldError id="endDate-error" message={errors.endDate} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="monthlySalary" className={labelClass}>
                    Sueldo Mensual Bruto
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      $
                    </span>
                    <input
                      id="monthlySalary"
                      name="monthlySalary"
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={form.monthlySalary}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.monthlySalary)}
                      aria-describedby={errors.monthlySalary ? 'monthlySalary-error' : undefined}
                      className={`${inputClass} pl-7`}
                    />
                  </div>
                  <FieldError id="monthlySalary-error" message={errors.monthlySalary} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zone" className={labelClass}>
                    Zona Geográfica
                  </label>
                  <select
                    id="zone"
                    name="zone"
                    value={form.zone}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="general">Zona General</option>
                    <option value="frontera">Zona Libre de la Frontera Norte</option>
                  </select>
                </div>
              </div>

              {/* Contract Benefits */}
              <div className="space-y-6">
                <h2 className={sectionTitleClass}>Prestaciones del Contrato</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="aguinaldoDays" className={labelClass}>
                      Días de Aguinaldo
                    </label>
                    <input
                      id="aguinaldoDays"
                      name="aguinaldoDays"
                      type="number"
                      min="15"
                      step="1"
                      inputMode="numeric"
                      value={form.aguinaldoDays}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.aguinaldoDays)}
                      aria-describedby={errors.aguinaldoDays ? 'aguinaldoDays-error' : 'aguinaldoDays-help'}
                      className={inputClass}
                    />
                    <p id="aguinaldoDays-help" className="text-[10px] text-slate-400 mt-1 ml-0.5">
                      Mínimo de ley: 15 días (
                      <ArticuloLink ids={ARTICULOS.aguinaldo} onOpen={setOpenArticle}>
                        Art. 87 LFT
                      </ArticuloLink>
                      ).
                    </p>
                    <FieldError id="aguinaldoDays-error" message={errors.aguinaldoDays} />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="primaVacacionalPercent" className={labelClass}>
                      Prima Vacacional (%)
                    </label>
                    <input
                      id="primaVacacionalPercent"
                      name="primaVacacionalPercent"
                      type="number"
                      min="25"
                      step="0.01"
                      inputMode="decimal"
                      value={form.primaVacacionalPercent}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.primaVacacionalPercent)}
                      aria-describedby={
                        errors.primaVacacionalPercent ? 'primaVacacionalPercent-error' : 'primaVacacionalPercent-help'
                      }
                      className={inputClass}
                    />
                    <p id="primaVacacionalPercent-help" className="text-[10px] text-slate-400 mt-1 ml-0.5">
                      Mínimo de ley: 25 % (
                      <ArticuloLink ids={ARTICULOS.primaVacacional} onOpen={setOpenArticle}>
                        Art. 80 LFT
                      </ArticuloLink>
                      ).
                    </p>
                    <FieldError id="primaVacacionalPercent-error" message={errors.primaVacacionalPercent} />
                  </div>
                </div>
                <fieldset className="flex flex-col gap-2">
                  <legend className={labelClass}>Salario Diario Integrado (SDI)</legend>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <label htmlFor="sdiMode-calculado" className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        id="sdiMode-calculado"
                        name="sdiMode"
                        type="radio"
                        value="calculado"
                        checked={form.sdiMode === 'calculado'}
                        onChange={handleChange}
                      />
                      Calcularlo automáticamente
                    </label>
                    <label htmlFor="sdiMode-capturado" className="flex items-center gap-2 text-xs text-slate-600">
                      <input
                        id="sdiMode-capturado"
                        name="sdiMode"
                        type="radio"
                        value="capturado"
                        checked={form.sdiMode === 'capturado'}
                        onChange={handleChange}
                      />
                      Capturar mi SDI
                    </label>
                  </div>
                  {form.sdiMode === 'capturado' && (
                    <div className="flex flex-col">
                      <label htmlFor="sdiManual" className={labelClass}>
                        SDI diario
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                          $
                        </span>
                        <input
                          id="sdiManual"
                          name="sdiManual"
                          type="number"
                          min="0"
                          step="0.01"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={form.sdiManual}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.sdiManual)}
                          aria-describedby={errors.sdiManual ? 'sdiManual-error' : 'sdiManual-help'}
                          className={`${inputClass} pl-7`}
                        />
                      </div>
                      <FieldError id="sdiManual-error" message={errors.sdiManual} />
                    </div>
                  )}
                  <p id="sdiManual-help" className="text-[10px] text-slate-400 ml-0.5 leading-relaxed">
                    El SDI es la base de las indemnizaciones (
                    <ArticuloLink ids={['LFT-89']} onOpen={setOpenArticle}>
                      Art. 89 LFT
                    </ArticuloLink>
                    ) e incluye todas las prestaciones (
                    <ArticuloLink ids={['LFT-84']} onOpen={setOpenArticle}>
                      Art. 84 LFT
                    </ArticuloLink>
                    ): vales, bonos, fondo de ahorro, etc. Si las recibes, captúralo. El que aparece
                    en tu recibo o en el IMSS puede estar topado y ser distinto.
                  </p>
                </fieldset>
              </div>

              {/* Pending Benefits */}
              <div className="space-y-6">
                <h2 className={sectionTitleClass}>Prestaciones Pendientes</h2>
                <div className="flex flex-col">
                  <label htmlFor="pendingVacationDays" className={labelClass}>
                    Días de Vacaciones Pendientes de Años Anteriores
                  </label>
                  <input
                    id="pendingVacationDays"
                    name="pendingVacationDays"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={form.pendingVacationDays}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.pendingVacationDays)}
                    aria-describedby={
                      errors.pendingVacationDays ? 'pendingVacationDays-error' : 'pendingVacationDays-help'
                    }
                    className={inputClass}
                  />
                  <p id="pendingVacationDays-help" className="text-[10px] text-slate-400 mt-1 ml-0.5">
                    Las vacaciones proporcionales del año en curso se calculan automáticamente.
                  </p>
                  <FieldError id="pendingVacationDays-error" message={errors.pendingVacationDays} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="separationType" className={labelClass}>
                    Tipo de Separación
                  </label>
                  <select
                    id="separationType"
                    name="separationType"
                    value={form.separationType}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="renuncia">Renuncia Voluntaria</option>
                    <option value="despido">Despido Injustificado</option>
                  </select>
                </div>
                {isDespidoSelected && (
                  <div className="flex items-start gap-2">
                    <input
                      id="applies20Days"
                      name="applies20Days"
                      type="checkbox"
                      checked={form.applies20Days}
                      onChange={handleChange}
                      className="mt-0.5"
                    />
                    <label htmlFor="applies20Days" className="text-[11px] text-slate-500 leading-relaxed">
                      Incluir 20 días por año (
                      <ArticuloLink ids={['LFT-50']} onOpen={setOpenArticle}>
                        Art. 50 fr. II LFT
                      </ArticuloLink>
                      ). Solo procede si el patrón se negó a reinstalar (
                      <ArticuloLink ids={['LFT-49']} onOpen={setOpenArticle}>
                        Art. 49
                      </ArticuloLink>
                      ) o si el trabajador rescindió por causa imputable al patrón (
                      <ArticuloLink ids={['LFT-52']} onOpen={setOpenArticle}>
                        Art. 52
                      </ArticuloLink>
                      ).
                    </label>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white text-xs font-bold tracking-widest rounded transition-all hover:bg-slate-800 uppercase"
              >
                Realizar Cálculo Legal
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="lg:col-span-7 space-y-10" aria-live="polite">
          {warnings.length > 0 && (
            <div className="bg-amber-50 border-l-2 border-amber-400 px-6 py-3 text-xs text-amber-800">
              {warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Icon name="descargar" className="w-4 h-4" />
              Descargar desglose en PDF
            </button>
          </div>

          {/* Summary Card */}
          <div className="bg-white p-10 border border-slate-100 shadow-sm rounded-lg">
            <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                    Finiquito
                  </span>
                  <div className="text-2xl font-display font-semibold text-slate-900">
                    {formatCurrency(result.finiquitoTotal)}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                    Indemnización
                  </span>
                  <div className="text-2xl font-display font-semibold text-slate-900">
                    {formatCurrency(result.indemnityTotal)}
                  </div>
                </div>
              </div>
              <div className="md:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a] mb-1 block">
                  Total Bruto Estimado
                </span>
                <div className="text-5xl font-display font-bold text-[#16a34a] tracking-tight leading-none">
                  {formatCurrency(result.grossTotal)}
                </div>
                <span className="text-[10px] text-slate-400 mt-2 block">
                  Antes de ISR (cálculo de retención pendiente)
                </span>
              </div>
            </div>
          </div>

          {/* SDI Bar */}
          <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-y border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Salario Diario Integrado (SDI)
              </span>
              <span className="text-[10px] text-slate-400">
                {result.isSdiCaptured ? 'Capturado' : 'Calculado'} · Salario diario{' '}
                {formatCurrency(result.dailySalary)} (
                <ArticuloLink ids={ARTICULOS.salarioDiario} onOpen={setOpenArticle}>
                  Art. 89 LFT
                </ArticuloLink>
                )
              </span>
            </div>
            <span className="font-display text-lg font-bold text-slate-900">
              {formatCurrency(result.sdi)}{' '}
              <span className="text-[10px] font-medium text-slate-400 ml-1">MXN/Día</span>
            </span>
          </div>

          {/* Breakdown */}
          <div className="space-y-10">
            {/* Finiquito de Ley */}
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b-2 border-slate-900 pb-2">
                <h3 className="font-display font-bold text-slate-900 flex items-baseline gap-2">
                  Tu Finiquito de Ley
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                    Proporcionales
                  </span>
                </h3>
                <span className="text-xl font-bold text-slate-900">
                  {formatCurrency(result.finiquitoTotal)}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {breakdown.finiquito.map((concepto) => (
                  <ConceptRow key={concepto.id} concepto={concepto} onOpenArticle={setOpenArticle} />
                ))}
              </div>
            </div>

            {/* Indemnización */}
            {result.isDespido && (
              <div className="space-y-4">
                <div className="flex items-end justify-between border-b-2 border-slate-900 pb-2">
                  <h3 className="font-display font-bold text-slate-900 flex items-baseline gap-2">
                    Indemnización por Despido
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                      Constitucional
                    </span>
                  </h3>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(result.indemnityTotal)}
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {breakdown.indemnizacion.map((concepto) => (
                    <ConceptRow key={concepto.id} concepto={concepto} onOpenArticle={setOpenArticle} />
                  ))}
                </div>
              </div>
            )}

            {result.seniority?.isCapped && (
              <div className="mt-8 bg-slate-50 p-6 border-l-2 border-slate-300 flex gap-4">
                <Icon name="info" className="w-5 h-5 shrink-0 text-slate-400" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                    Nota: Límite de Prima de Antigüedad
                  </p>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Su Prima de Antigüedad fue topada a{' '}
                    <span className="font-bold text-slate-900">
                      {formatCurrency(result.seniority.capUsed)}
                    </span>{' '}
                    por día (dos salarios mínimos), conforme al tope legal establecido para este
                    concepto específico (
                    <ArticuloLink ids={ARTICULOS.primaAntiguedad} onOpen={setOpenArticle}>
                      Arts. 162, 485 y 486 LFT
                    </ArticuloLink>
                    ).
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <ReporteImpresion datos={calculatedForm} result={result} breakdown={breakdown} warnings={warnings} />

      {openArticle && (
        <Suspense fallback={null}>
          <ArticuloModal ids={openArticle.ids} titulo={openArticle.titulo} onClose={() => setOpenArticle(null)} />
        </Suspense>
      )}
    </>
  );
}

export default Landing;

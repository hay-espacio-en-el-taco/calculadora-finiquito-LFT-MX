import { formatCurrency } from '../logic/calculator';

const ZONAS = { general: 'Zona General', frontera: 'Zona Libre de la Frontera Norte' };
const SEPARACIONES = { renuncia: 'Renuncia voluntaria', despido: 'Despido injustificado' };

const formatDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

function TablaConceptos({ titulo, conceptos, total }) {
  if (conceptos.length === 0) return null;
  return (
    <table className="w-full table-fixed text-[11px] border-collapse mb-4">
      <colgroup>
        <col className="w-[28%]" />
        <col className="w-[37%]" />
        <col className="w-[21%]" />
        <col className="w-[14%]" />
      </colgroup>
      <thead>
        <tr className="border-b-2 border-slate-900 text-left">
          <th className="py-1.5 font-bold" colSpan={3}>{titulo}</th>
          <th className="py-1.5 font-bold text-right">{formatCurrency(total)}</th>
        </tr>
      </thead>
      <tbody>
        {conceptos.map((concepto) => (
          <tr key={concepto.id} className="border-b border-slate-200 align-top">
            <td className="py-1.5 pr-2 font-medium">{concepto.concepto}</td>
            <td className="py-1.5 pr-2 text-slate-600">{concepto.detalle}</td>
            <td className="py-1.5 pr-2 text-slate-600 italic">{concepto.articulo}</td>
            <td className="py-1.5 text-right whitespace-nowrap">{formatCurrency(concepto.importe)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Versión del desglose que solo aparece al imprimir o guardar como PDF
function ReporteImpresion({ datos, result, breakdown, warnings }) {
  const fechaElaboracion = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  const datosCapturados = [
    ['Fecha de ingreso', formatDate(datos.startDate)],
    ['Fecha de salida', formatDate(datos.endDate)],
    ['Antigüedad', `${result.yearsOfService.toFixed(2)} años`],
    ['Tipo de separación', SEPARACIONES[datos.separationType]],
    ['Sueldo mensual bruto', formatCurrency(Number(datos.monthlySalary))],
    ['Salario diario (Art. 89 LFT)', formatCurrency(result.dailySalary)],
    ['Salario diario integrado', `${formatCurrency(result.sdi)} (${result.isSdiCaptured ? 'capturado' : 'calculado'})`],
    ['Zona geográfica', ZONAS[datos.zone]],
    ['Aguinaldo del contrato', `${result.contractAguinaldoDays} días`],
    ['Prima vacacional del contrato', `${result.contractPrimaPercent} %`],
    ['Vacaciones pendientes de años anteriores', `${Number(datos.pendingVacationDays) || 0} días`],
  ];
  if (result.isDespido) {
    datosCapturados.push(['20 días por año (Art. 50 fr. II)', datos.applies20Days ? 'Incluidos' : 'No incluidos']);
  }

  return (
    <div className="hidden print:block font-sans text-slate-900 text-[12px]">
      <header className="border-b-2 border-slate-900 pb-3 mb-5">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">Calculadora de Finiquito Justo (LFT 2026)</p>
        <h1 className="font-display text-xl font-bold">Estimación de finiquito y liquidación</h1>
        <p className="text-[11px] text-slate-600">Elaborado el {fechaElaboracion}</p>
      </header>

      <section className="mb-5">
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Datos del cálculo</h2>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-[11px]">
          {datosCapturados.map(([etiqueta, valor]) => (
            <div key={etiqueta} className="flex justify-between gap-4 border-b border-slate-100 py-0.5">
              <dt className="text-slate-600">{etiqueta}</dt>
              <dd className="font-medium text-right">{valor}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-5">
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Desglose</h2>
        <TablaConceptos titulo="Finiquito" conceptos={breakdown.finiquito} total={result.finiquitoTotal} />
        <TablaConceptos titulo="Indemnización por despido" conceptos={breakdown.indemnizacion} total={result.indemnityTotal} />
        <div className="flex justify-between items-baseline border-t-2 border-slate-900 pt-2">
          <span className="font-bold">Total bruto estimado (antes de ISR)</span>
          <span className="font-display text-xl font-bold">{formatCurrency(result.grossTotal)}</span>
        </div>
      </section>

      <section className="text-[10px] leading-relaxed text-slate-600 space-y-1.5 border-t border-slate-200 pt-3">
        {warnings.map((warning) => (
          <p key={warning}>{warning}</p>
        ))}
        {result.seniority?.isCapped && (
          <p>
            La prima de antigüedad se calculó con un salario topado a {formatCurrency(result.seniority.capUsed)} diarios,
            el doble del salario mínimo de la zona (Arts. 162, 485 y 486 LFT).
          </p>
        )}
        <p>
          Los montos son brutos: no incluyen la retención de ISR. Tampoco incluyen salarios devengados, reparto de
          utilidades (PTU) ni salarios vencidos. Se asume un contrato por tiempo indeterminado.
        </p>
        <p>
          Esta estimación es informativa y no constituye asesoría legal. El plazo para demandar por despido es de 2 meses
          (Art. 518 LFT) y antes de demandar debe acudirse al Centro de Conciliación. La Procuraduría Federal de la
          Defensa del Trabajo (PROFEDET) ofrece asesoría gratuita.
        </p>
      </section>
    </div>
  );
}

export default ReporteImpresion;

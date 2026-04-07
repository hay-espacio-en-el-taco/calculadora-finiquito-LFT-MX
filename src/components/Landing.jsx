function Landing() {
  return (
    <div className="bg-[#f8fafc] text-slate-800 font-['Inter'] min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-slate-900 font-['Work_Sans']">
            Calculadora de Finiquito Justo (LFT 2026)
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a
            className="text-slate-900 border-b-2 border-slate-900 pb-1 text-xs font-semibold tracking-wide"
            href="#"
          >
            Calculadora
          </a>
          <a
            className="text-slate-400 pb-1 hover:text-slate-600 text-xs font-semibold tracking-wide transition-colors"
            href="#"
          >
            Historial
          </a>
          <a
            className="text-slate-400 pb-1 hover:text-slate-600 text-xs font-semibold tracking-wide transition-colors"
            href="#"
          >
            Artículos LFT
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Form Section */}
        <section className="lg:col-span-5">
          <div className="bg-white p-8 border border-slate-100 shadow-sm rounded-lg">
            <div className="flex items-center gap-3 mb-10">
              <h1 className="font-['Work_Sans'] text-xl font-bold text-slate-900">
                Datos del Trabajador
              </h1>
            </div>
            <form className="space-y-10">
              {/* Personal & Contract Data */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block border-b border-slate-100 pb-2">
                  Datos Personales &amp; Contrato
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                      Fecha de Ingreso
                    </label>
                    <input
                      type="date"
                      defaultValue="2020-01-15"
                      className="bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                      Fecha de Salida
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-03-31"
                      className="bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                    Sueldo Mensual Bruto
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                      $
                    </span>
                    <input
                      className="w-full pl-7 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all"
                      placeholder="0.00"
                      type="number"
                      defaultValue="25000"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                    Zona Geográfica
                  </label>
                  <select className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all">
                    <option>Zona General</option>
                    <option>Zona Libre de la Frontera Norte</option>
                  </select>
                </div>
              </div>

              {/* Pending Benefits */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block border-b border-slate-100 pb-2">
                  Prestaciones Pendientes
                </h2>
                <div className="flex flex-col">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                    Días de Vacaciones Pendientes
                  </label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all"
                    type="number"
                    defaultValue="12"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-medium text-slate-500 mb-1.5 ml-0.5">
                    Tipo de Separación
                  </label>
                  <select className="w-full appearance-none bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-0 rounded p-2 text-sm transition-all">
                    <option>Renuncia Voluntaria</option>
                    <option defaultValue="">Despido Injustificado</option>
                  </select>
                </div>
              </div>

              <button className="w-full py-3.5 bg-slate-900 text-white text-xs font-bold tracking-widest rounded transition-all hover:bg-slate-800 uppercase">
                Realizar Cálculo Legal
              </button>
            </form>
          </div>
        </section>

        {/* Results Section */}
        <section className="lg:col-span-7 space-y-10">
          {/* Summary Card */}
          <div className="bg-white p-10 border border-slate-100 shadow-sm rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Total Bruto
                </span>
                <div className="text-2xl font-['Work_Sans'] font-semibold text-slate-900">
                  $124,560.00
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                  Retenciones (ISR)
                </span>
                <div className="text-2xl font-['Work_Sans'] font-semibold text-[#ba1a1a]">
                  -$12,450.50
                </div>
              </div>
              <div className="md:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16a34a] mb-1 block">
                  Monto Neto a Recibir
                </span>
                <div className="text-5xl font-['Work_Sans'] font-bold text-[#16a34a] tracking-tight leading-none">
                  $112,109.50
                </div>
              </div>
            </div>
          </div>

          {/* SDI Bar */}
          <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-y border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Salario Diario Integrado (SDI)
              </span>
            </div>
            <span className="font-['Work_Sans'] text-lg font-bold text-slate-900">
              $1,245.88{" "}
              <span className="text-[10px] font-medium text-slate-400 ml-1">
                MXN/Día
              </span>
            </span>
          </div>

          {/* Breakdown */}
          <div className="space-y-10">
            {/* Finiquito de Ley */}
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b-2 border-slate-900 pb-2">
                <h3 className="font-['Work_Sans'] font-bold text-slate-900 flex items-baseline gap-2">
                  Tu Finiquito de Ley
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                    Proporcionales
                  </span>
                </h3>
                <span className="text-xl font-bold text-slate-900">
                  $18,430.00
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      Aguinaldo Proporcional
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Art. 87 LFT
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    $8,400.00
                  </span>
                </div>
                <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      Vacaciones &amp; Prima Vacacional
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Art. 76-80 LFT
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    $10,030.00
                  </span>
                </div>
              </div>
            </div>

            {/* Indemnización */}
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b-2 border-slate-900 pb-2">
                <h3 className="font-['Work_Sans'] font-bold text-slate-900 flex items-baseline gap-2">
                  Indemnización por Despido
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                    Constitucional
                  </span>
                </h3>
                <span className="text-xl font-bold text-slate-900">
                  $93,679.50
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      Indemnización (90 días)
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Art. 123 Const.
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    $75,450.00
                  </span>
                </div>
                <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      20 Días por año (Acumulado)
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Art. 50 LFT
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    $12,400.00
                  </span>
                </div>
                <div className="border-b border-slate-100 last:border-0 py-3 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      Prima de Antigüedad
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Art. 162 LFT
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    $5,829.50
                  </span>
                </div>
              </div>
              <div className="mt-8 bg-slate-50 p-6 border-l-2 border-slate-300 flex gap-4">
                <span className="material-symbols-outlined text-slate-400">
                  info
                </span>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                    Nota: Límite de Prima de Antigüedad
                  </p>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Su Prima de Antigüedad fue topada a{" "}
                    <span className="font-bold text-slate-900">$630.08</span>{" "}
                    por día (dos salarios mínimos), conforme al tope legal
                    establecido para este concepto específico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white border-t border-slate-200 z-50">
        <div className="flex flex-col items-center justify-center text-slate-900">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Inicio
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">request_quote</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Cálculos
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">gavel</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Leyes
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[9px] font-bold uppercase tracking-wider">
            Perfil
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Landing;

import Icon from './Icon';

const PAGES = [
  { id: 'calculadora', label: 'Calculadora', icon: 'calculadora' },
  { id: 'marco-legal', label: 'Marco Legal', icon: 'ley' },
];

function Navigation({ currentPage }) {
  return (
    <>
      {/* Top Navigation */}
      <nav
        aria-label="Navegación principal"
        className="bg-white border-b border-slate-200 flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 print:hidden"
      >
        <a href="#calculadora" className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
            Calculadora de Finiquito Justo (LFT 2026)
          </span>
        </a>
        <div className="hidden md:flex items-center space-x-10">
          {PAGES.map((page) => {
            const isActive = page.id === currentPage;
            return (
              <a
                key={page.id}
                href={`#${page.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'text-slate-900 border-b-2 border-slate-900 pb-1 text-xs font-semibold tracking-wide'
                    : 'text-slate-400 pb-1 hover:text-slate-600 text-xs font-semibold tracking-wide transition-colors'
                }
              >
                {page.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Bottom Mobile Navigation */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden print:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white border-t border-slate-200 z-50"
      >
        {PAGES.map((page) => {
          const isActive = page.id === currentPage;
          return (
            <a
              key={page.id}
              href={`#${page.id}`}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center ${isActive ? 'text-slate-900' : 'text-slate-400'}`}
            >
              <Icon name={page.icon} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{page.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;

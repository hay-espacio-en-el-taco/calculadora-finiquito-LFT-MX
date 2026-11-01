import { lazy, Suspense, useEffect, useState } from 'react';
import Landing from './components/Landing';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import './App.css';

// El renderizador de Markdown solo se descarga al abrir el Marco Legal
const MarcoLegal = lazy(() => import('./components/MarcoLegal'));

const DEFAULT_PAGE = 'calculadora';
const KNOWN_PAGES = new Set(['calculadora', 'marco-legal']);

// Navegación por hash: permite enlazar cada sección y usar el botón "atrás" sin un router
const getPageFromHash = () => {
  const page = window.location.hash.replace('#', '');
  return KNOWN_PAGES.has(page) ? page : DEFAULT_PAGE;
};

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showCalculadora = currentPage === 'calculadora';

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen pb-20 md:pb-0 print:bg-white print:pb-0">
      <Navigation currentPage={currentPage} />
      <div className={showCalculadora ? undefined : 'hidden'}>
        <Landing />
      </div>
      {currentPage === 'marco-legal' && (
        <Suspense fallback={<p className="max-w-4xl mx-auto px-8 py-10 text-sm text-slate-400">Cargando…</p>}>
          <MarcoLegal />
        </Suspense>
      )}
      <Footer />
    </div>
  );
}

export default App;

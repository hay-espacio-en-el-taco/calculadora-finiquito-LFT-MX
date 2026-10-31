import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Fuente única de verdad legal: se muestra el mismo documento que mantiene el equipo
import marcoLegal from '../../docs/MARCO_LEGAL.md?raw';

// Los enlaces externos abren en otra pestaña; los relativos a otros .md del repo no existen en la app
function MarkdownLink({ href = '', children }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <span>{children}</span>;
}

// Las tablas anchas se desplazan dentro de su contenedor, no la página
function MarkdownTable({ children }) {
  return (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}

function MarcoLegal() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
      <article className="bg-white p-6 sm:p-10 border border-slate-100 shadow-sm rounded-lg prose prose-slate prose-sm max-w-none prose-headings:font-display prose-a:text-slate-900 prose-table:text-xs">
        <Markdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink, table: MarkdownTable }}>
          {marcoLegal}
        </Markdown>
      </article>
    </main>
  );
}

export default MarcoLegal;

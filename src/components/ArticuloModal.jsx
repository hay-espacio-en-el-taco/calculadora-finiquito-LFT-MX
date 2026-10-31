import { useEffect, useRef } from 'react';
import Icon from './Icon';
// Texto oficial extraído de los PDF de la Cámara de Diputados con scripts/extraer_articulos.py
import datos from '../data/articulos.json';

function ArticuloModal({ ids, titulo, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  // Un clic fuera del contenido (sobre el fondo) cierra el modal
  const handleClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close();
  };

  const articulos = ids.map((id) => ({ id, ...datos.articulos[id] })).filter((articulo) => articulo.parrafos);
  const leyes = [...new Set(articulos.map((articulo) => articulo.ley))];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby="articulo-modal-titulo"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[85vh] rounded-lg p-0 shadow-xl backdrop:bg-slate-900/50"
    >
      <div className="flex flex-col max-h-[85vh] font-sans text-slate-800">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Texto vigente</p>
            <h2 id="articulo-modal-titulo" className="font-display text-lg font-bold text-slate-900">
              {titulo}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Cerrar"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="cerrar" />
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-5 space-y-8">
          {articulos.map((articulo) => (
            <article key={articulo.id} className="space-y-3">
              <h3 className="font-display text-sm font-bold text-slate-900">
                {datos.fuentes[articulo.ley].nombre} — {articulo.titulo}
              </h3>
              {articulo.parrafos.map((parrafo) => (
                <p key={parrafo} className="text-sm leading-relaxed text-slate-700">
                  {parrafo}
                </p>
              ))}
              {articulo.reformas.length > 0 && (
                <p className="text-[11px] italic text-slate-400">{articulo.reformas.join(' · ')}</p>
              )}
            </article>
          ))}
        </div>

        <footer className="border-t border-slate-200 px-6 py-3 text-[11px] text-slate-500 space-y-1">
          {leyes.map((ley) => (
            <p key={ley}>
              {datos.fuentes[ley].nombre}, última reforma publicada en el DOF el{' '}
              {datos.fuentes[ley].ultimaReforma}.{' '}
              <a
                href={datos.fuentes[ley].url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-slate-900"
              >
                Ver la ley completa (Cámara de Diputados)
              </a>
            </p>
          ))}
        </footer>
      </div>
    </dialog>
  );
}

export default ArticuloModal;

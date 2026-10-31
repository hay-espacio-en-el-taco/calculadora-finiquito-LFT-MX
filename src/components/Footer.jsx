import Icon from './Icon';
import { REPO_LABEL, REPO_URL } from '../constants';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white print:hidden">
      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-500">
        <div className="space-y-1">
          <p>
            <span className="font-semibold text-slate-700">Proyecto de código abierto.</span> El repositorio es
            público y <span className="font-semibold text-slate-700">¡los Pull Requests son bienvenidos!</span>
          </p>
          <p>Estimación informativa: no constituye asesoría legal.</p>
        </div>
        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-slate-700 hover:text-slate-900 break-all"
          >
            <Icon name="github" className="w-4 h-4 shrink-0" />
            {REPO_LABEL}
          </a>
          <a
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-slate-900"
          >
            Reportar un error o sugerir una mejora
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

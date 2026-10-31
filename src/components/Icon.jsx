// Íconos SVG en línea: evitan descargar la fuente completa de Material Symbols
const PATHS = {
  calculadora: (
    <>
      <rect x="5" y="2.75" width="14" height="18.5" rx="2" />
      <rect x="8" y="5.75" width="8" height="3.5" rx="0.5" />
      <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" strokeWidth="2.25" />
    </>
  ),
  ley: (
    <>
      <path d="M12 3v17M7 20h10M4.5 7h15M12 4.5 4.5 7M12 4.5 19.5 7" />
      <path d="M4.5 7 2 13a2.5 2.5 0 0 0 5 0L4.5 7ZM19.5 7 17 13a2.5 2.5 0 0 0 5 0l-2.5-6Z" />
    </>
  ),
  descargar: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19.5h14" />,
  cerrar: <path d="M6 6l12 12M18 6 6 18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.75h.01" strokeWidth="2.25" />
    </>
  ),
};

function Icon({ name, className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

export default Icon;

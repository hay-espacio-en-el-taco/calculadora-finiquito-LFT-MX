// Referencia legal que abre el texto oficial del artículo en un modal
function ArticuloLink({ ids, onOpen, children }) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ ids, titulo: children })}
      className="underline decoration-dotted underline-offset-2 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 rounded-sm cursor-pointer"
    >
      {children}
    </button>
  );
}

export default ArticuloLink;

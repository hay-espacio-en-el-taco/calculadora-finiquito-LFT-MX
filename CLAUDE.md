# CLAUDE.md

Las reglas del proyecto viven en `AGENTS.md` (fuente única para todos los agentes):

@AGENTS.md

## Notas específicas para Claude Code

- **Validación legal con búsqueda web:** antes de implementar o documentar cualquier regla, cifra o criterio, búscalo en la web y prioriza las fuentes oficiales de `AGENTS.md`. El sitio del SJF (sjf2.scjn.gob.mx) y algunos PDF del SAT no se leen de forma automatizada: si no puedes confirmar algo, márcalo 🟡 en `docs/NOTAS_INTERNAS.md` y dile al usuario qué debe cotejar a mano. No lo des por verificado.
- **Cita las fuentes** que consultaste, tanto en tu respuesta como en la documentación.
- **Comprobación de cálculos:** después de cambiar `src/logic/calculator.js`, ejecuta la función con casos reales (por ejemplo, `node -e 'import("./src/logic/calculator.js").then(...)'`) y compara contra el cálculo a mano antes de reportar el resultado.
- **Prueba en el navegador:** si el puerto 5173 está ocupado, usa otro (`npx vite --port 5199 --strictPort`) y detén el servidor al terminar.
- **Commits:** solo cuando el usuario lo pida, y en una rama, no en `main`.

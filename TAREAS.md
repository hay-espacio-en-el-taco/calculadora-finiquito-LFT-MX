# Tareas para el lanzamiento — Calculadora de Finiquito LFT MX

> **Corte de revisión:** 30 de octubre de 2026.
> El fundamento legal de cada tarea está en [`docs/MARCO_LEGAL.md`](./docs/MARCO_LEGAL.md) (versión pública que muestra la app). El estado de las verificaciones y de la implementación está en [`docs/NOTAS_INTERNAS.md`](./docs/NOTAS_INTERNAS.md). Antes de trabajar en cualquier tarea, sigue el flujo de validación legal de [`AGENTS.md`](./AGENTS.md). Ninguna tarea de cálculo se considera terminada si no tiene un artículo que la respalde **y** un test unitario.

**Estado general:** 🔴 **No lista para lanzar.** La interfaz es un mockup estático con cifras fijas, la lógica de cálculo no está conectada y tiene errores legales y técnicos.

Prioridades: **P0** = bloquea el lanzamiento · **P1** = necesaria para un lanzamiento responsable · **P2** = mejora posterior.

---

## P0 — Bloqueantes técnicos

- [x] **Eliminar la `a` suelta en `src/logic/calculator.js:30`.**
- [x] **Agregar `date-fns` a `dependencies`** en `package.json`.
- [x] **Conectar la interfaz con la lógica.** `Landing.jsx` usa `calculateSettlement` de `src/logic/calculator.js`.
- [x] Formulario controlado; el envío usa `preventDefault`.
- [x] Validar las entradas (`validateInputs`): fecha de salida posterior a la de ingreso, salario mayor a 0, días pendientes no negativos, fecha de ingreso no futura (error) y fecha de salida futura (advertencia).
- [x] Corregir los `<select>` con valores reales (`renuncia`/`despido`, `general`/`frontera`).
- [x] Asociar cada `<label>` con su `<input>` (`htmlFor` / `id`), con `aria-invalid` y mensajes de error asociados.
- [x] `npm run lint` y `npm run build` pasan.
- [x] Interacción probada en el navegador: navegación, envío sin recarga, cambio a despido, prestaciones del contrato, SDI capturado y mensajes de error.

## P0 — Correcciones legales

| # | Tarea | Fundamento |
|---|---|---|
| | **Avance:** al conectar la interfaz quedaron resueltos **L2, L3, L5, L6 (falta el test) y L7**, y **L1** de forma parcial (casilla opcional con explicación; falta la cita de la jurisprudencia). | |
| L1 | **Los 20 días por año no deben sumarse en todo despido injustificado.** Hacerlos condicionales: (a) el patrón se niega a reinstalar en los supuestos del Art. 49, (b) rescisión por el trabajador (Art. 52), (c) negativa a acatar la resolución (Art. 947). Explicarlo en la interfaz. | Arts. 49, 50 fr. II, 52 y 947 LFT; criterio de la 2a. Sala de la SCJN |
| L2 | **Salario diario = sueldo mensual / 30**, no / 30.4. | Art. 89 LFT |
| L3 | **SDI con los días de vacaciones según la antigüedad**, no con 12 fijos (`calculateSDI`). | Arts. 76, 84 y 89 LFT |
| L4 | **Corregir la tabla de vacaciones para más de 30 años**: 31 a 35 años = 32 días, y +2 por cada 5 años. Hoy se queda en 30. | Art. 76 LFT (DOF 27-12-2022) |
| L5 | **Prima de antigüedad condicionada**: en una renuncia solo con 15 años o más; en un despido, siempre. | Art. 162 fr. III LFT |
| L6 | **Tope de la prima de antigüedad = 2 × salario mínimo de la zona** ($630.08 general / $881.74 frontera en 2026). Ya implementado; falta su test. | Arts. 162, 485 y 486 LFT; Resolución CONASAMI 2026 |
| L7 | **Usar "Días de vacaciones pendientes"** (hoy se captura y se ignora). Sumar las pendientes de años anteriores más las proporcionales del año en curso, ambas con prima vacacional. | Arts. 76, 79, 80, 81 y 516 LFT |
| L8 | **Agregar salarios devengados y no pagados** (días trabajados del periodo sin pagar). | Arts. 82, 83 y 88 LFT |
| L9 | **Implementar el ISR real** o quitar la cifra de retención de la interfaz. Exenciones: aguinaldo 30 UMA, prima vacacional 15 UMA, separación 90 UMA por año (fracción mayor a 6 meses = año completo). Retención: Art. 96 con la tarifa del Anexo 8 RMF 2026 para lo ordinario y Art. 95 con la tasa efectiva para la separación. | Arts. 93 fr. XIII y XIV, 94, 95 y 96 LISR; Anexo 8 RMF 2026 |
| L10 | **UMA según la fecha de salida**: $113.14 hasta el 31-01-2026 y $117.31 desde el 01-02-2026. | Publicación del INEGI, DOF 09-01-2026 |
| L11 | **Mostrar un aviso legal en la interfaz**: es una estimación, no es asesoría legal; asume un contrato por tiempo indeterminado; plazo de 2 meses para demandar; conciliación prejudicial obligatoria; enlace a la PROFEDET. | Arts. 33, 47, 518 y 684-A a 684-E LFT |

## P0 — Verificaciones contra fuente oficial

- [x] **Tarifa del Anexo 8 RMF 2026** documentada (`docs/MARCO_LEGAL.md`, sección 2; detalle de la verificación en `docs/NOTAS_INTERNAS.md`). Tres fuentes coinciden y la tabla es internamente consistente.
  - [ ] Cotejo final contra el PDF oficial del SAT o el DOF del 28-12-2025: comparar a mano los 11 renglones (no fue posible descargarlo de forma automatizada).
- [x] **Resolución CONASAMI 2026:** DOF del **09-12-2025**, código DOF 5775534.
- [x] **Jurisprudencia de los 20 días:** *"INDEMNIZACIÓN DE 20 DÍAS DE SALARIO POR CADA AÑO DE SERVICIOS PRESTADOS, PROCEDENCIA DE LA."*, Cuarta Sala, contradicción Varios 3/85 (07-08-1989), **registro digital 1008929**. Solo procede en los casos de los Arts. 49, 52 y 947. Confirma el criterio de la herramienta.
  - [ ] Confirmar el registro y el número de tesis directamente en sjf2.scjn.gob.mx (se citó desde transcripciones).
- [ ] **Tesis sobre salario mínimo vs. UMA en el tope de la prima:** no se localizó una tesis con registro. Hoy el fundamento es la letra del Art. 486 LFT ("doble del salario mínimo"). Falta buscarla a mano en el SJF.
- [ ] **Abogado:** definir si la base de la prima de antigüedad es el SD o el SDI. Hay criterios encontrados; la herramienta usa el SD. Impacto de ejemplo en `docs/CASOS_DE_PRUEBA.md`, caso C2.
- [ ] **Abogado:** revisar y firmar [`docs/CASOS_DE_PRUEBA.md`](./docs/CASOS_DE_PRUEBA.md) (7 casos + 10 criterios). Antes, corregir L4 (el caso C6 lo exhibe).

---

## Hecho — Prestaciones del contrato y SDI

- [x] Capturar los **días de aguinaldo** (mínimo 15, Art. 87) y el **porcentaje de prima vacacional** (mínimo 25 %, Art. 80), con validación del mínimo legal.
- [x] **SDI capturado o calculado.** El calculado integra el aguinaldo y la prima del contrato; el capturado no puede ser menor al salario diario. Se usa en los 90 días y en los 20 días por año.
- [x] El finiquito sigue calculándose con la **cuota diaria**, conforme al criterio mayoritario (ver `docs/MARCO_LEGAL.md`, sección 5.3). Falta que el abogado valide el criterio K y que se citen los registros de las tesis.

## P1 — Calidad y lanzamiento responsable

- [ ] Configurar **Vitest** y escribir tests unitarios de cada función de `src/logic/calculator.js` con casos calculados a mano (incluir los límites: 0 años, exactamente 1 año, 15 años, más de 30 años, salario sobre el tope, año bisiesto, baja en enero y en diciembre).
- [ ] Resolver la ruta de la lógica: `copilot-instructions.md` pide `src/utils/` y el código vive en `src/logic/`. Elegir una y documentarla.
- [ ] Constantes económicas **por año** (`ECON[2025]`, `ECON[2026]`) para calcular bajas de años anteriores.
- [ ] Aguinaldo: permitir indicar si ya se pagó en el año, para no duplicarlo en bajas de diciembre.
- [ ] Aguinaldo y vacaciones en años bisiestos: evitar que la proporción supere el 100 % (15/365 × 366).
- [ ] Mostrar el **desglose y la fórmula** de cada concepto con su artículo (requisito de transparencia del Art. 33 LFT).
- [ ] Mostrar la nota del tope de la prima de antigüedad **solo cuando se aplica**.
- [x] Navegación real: **Calculadora** y **Marco Legal** (`#calculadora`, `#marco-legal`). Se quitaron "Historial", "Artículos LFT" y "Perfil".
- [x] La página **Marco Legal** muestra `docs/MARCO_LEGAL.md` directamente (fuente única) y se carga de forma diferida.
- [x] Documentos separados: `docs/MARCO_LEGAL.md` es la versión pública, redactada para el usuario y sin notas de desarrollo; `docs/NOTAS_INTERNAS.md` concentra las verificaciones, el estado de implementación, los errores conocidos y el mantenimiento.
- [x] Fuentes alojadas en el propio sitio con `@fontsource-variable` (Inter y Work Sans), sin peticiones a Google. Material Symbols reemplazado por 3 íconos SVG en línea (`src/components/Icon.jsx`). Verificado: la página no hace ninguna petición a dominios externos.
- [x] Limpieza: se quitaron `react-pdf` y `serverless`; se eliminó `public/menu.pdf` (era el menú de un restaurante); la licencia de `package.json` ahora es MIT. 
- [x] Repositorio renombrado en GitHub de `claculadora-…` (errata) a `calculadora-finiquito-LFT-MX`; URLs actualizadas en todo el proyecto (incluida la ruta base de GitHub Pages). GitHub redirige el nombre anterior, pero **no** la URL vieja de GitHub Pages.
- [x] Metadatos en `index.html`: `description`, `theme-color`, Open Graph (`og:title`, `og:description`, `og:locale` es_MX, `og:site_name`) y Twitter Card; `lang="es-MX"`.
- [x] Publicación en GitHub Pages: workflow `.github/workflows/deploy.yml` (lint + build en cada push a `main`), `base` en `vite.config.js`, `og:url` y URL canónica.
- [ ] Activar GitHub Pages en el repositorio: Settings → Pages → Source: **GitHub Actions** (una sola vez).
- [x] Imagen para redes `public/og-image.png` (1200×630) con `og:image` absoluto y tarjeta grande de Twitter/X. Se genera desde `scripts/og-image.html` (instrucciones dentro del archivo).
- [x] Repositorio público y "¡PRs bienvenidos!" con la URL del repo en: barra superior (ícono de GitHub), pie de página de todas las páginas (con enlace para reportar errores), PDF, sección 9 de `MARCO_LEGAL.md`, README e imagen para redes. La URL vive en `src/constants.js`.
- [ ] Después de publicar, revisar la vista previa con el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/) o pegando el enlace en WhatsApp.
- [x] Favicon provisional propio (`public/favicon.svg`, balanza blanca y verde sobre slate) y `apple-touch-icon.png` de 180 px; se eliminó `vite.svg`.
- [ ] Reemplazar el favicon provisional por el definitivo cuando exista la identidad visual.

## P2 — Funcionalidades posteriores

- [ ] Salarios vencidos como "escenario de juicio" (hasta 12 meses + 2 % mensual sobre 15 meses). Art. 48 LFT.
- [ ] Contratos por tiempo determinado. Art. 50 fr. I LFT.
- [ ] PTU pendiente. Arts. 117 a 131 LFT.
- [ ] Horas extra pendientes, considerando la reforma de 40 horas (DOF 01-05-2026; reducción gradual desde 2027). Arts. 66 a 68 LFT.
- [ ] Salario variable: promedio de los últimos 30 días. Art. 89 LFT.
- [x] Exportar el desglose a PDF: botón "Descargar desglose en PDF" que usa el diálogo de impresión del navegador ("Guardar como PDF") con un formato de hoja carta (`ReporteImpresion.jsx`): datos del cálculo, desglose con fórmula y artículo, total y avisos legales. Sin dependencias nuevas.
- [x] Modal con el texto oficial de cada artículo: todas las referencias legales de la calculadora (desglose, ayudas del formulario, casilla de los 20 días, nota del tope) se pueden abrir. Texto literal de los PDF oficiales en `src/data/articulos.json`, generado con `scripts/extraer_articulos.py`.
- [ ] Enlazar también los artículos citados en la página **Marco Legal** al mismo modal.
- [ ] Opción "persona trabajadora de plataformas digitales" (Art. 49 fr. VI y Art. 50 fr. IV): los 20 días proceden siempre.
- [ ] Historial de cálculos guardado solo en el navegador del usuario (`localStorage`), para comparar escenarios. Sin servidor ni datos personales.
- [ ] Seguimiento de la iniciativa de aguinaldo de 30 días (no aprobada al corte).

---

## Mantenimiento recurrente

Ver la sección 3 de [`docs/NOTAS_INTERNAS.md`](./docs/NOTAS_INTERNAS.md): salarios mínimos (diciembre), Anexo 8 RMF (diciembre), UMA (enero) y revisión anual de reformas.

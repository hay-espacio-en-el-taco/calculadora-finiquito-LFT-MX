# AGENTS.md — Calculadora de Finiquito LFT MX

Guía para cualquier agente de IA o persona que desarrolle en este repositorio.

## Regla principal

**Todo cálculo, cifra, texto legal o criterio debe estar validado contra las leyes mexicanas VIGENTES al momento del cambio.**

Esta herramienta le dice a personas trabajadoras cuánto dinero les corresponde. Un error legal puede hacer que alguien acepte menos de lo que le corresponde o que reclame algo improcedente. Por eso:

- **Nunca** implementes ni documentes una regla legal "de memoria". Las leyes, las cifras y los criterios judiciales cambian cada año.
- **Nunca** des por vigente una cifra sin revisar su fecha de vigencia y su fuente oficial.
- Si no puedes verificar algo, **no lo presentes como definitivo**: regístralo como pendiente (ver "Flujo de validación legal").

---

## Flujo de validación legal (obligatorio para cualquier cambio de cálculo o de contenido legal)

1. **Identifica el fundamento:** el artículo exacto (LFT, CPEUM, LISR, RLISR) y, si aplica, la jurisprudencia.
2. **Verifica el texto vigente** en la fuente oficial (tabla de abajo). Confirma la fecha de la última reforma del artículo.
3. **Busca reformas recientes**, publicadas o en vigor, que lo modifiquen, e **iniciativas en discusión** (no aprobadas = no aplican, pero se documentan para darles seguimiento).
4. **Revisa los criterios judiciales** en el Semanario Judicial de la Federación (SJF) cuando la ley admita interpretación. Cita el **registro digital**, la instancia, la época y el rubro.
5. **Confirma las cifras por año y por fecha de vigencia**: salario mínimo (por zona, desde el 1 de enero), UMA (del 1 de febrero al 31 de enero), tarifa de ISR (Anexo 8 de la RMF del año).
6. **Documenta** antes o junto con el código:
   - [`docs/MARCO_LEGAL.md`](./docs/MARCO_LEGAL.md): el fundamento, en lenguaje para el usuario (ver reglas abajo). Actualiza la fecha de "Información vigente".
   - [`docs/NOTAS_INTERNAS.md`](./docs/NOTAS_INTERNAS.md): el estado de la verificación (✅ verificado en fuente oficial, 🟡 solo fuentes secundarias o parcial, 🔴 decisión pendiente) y las fuentes usadas.
   - [`TAREAS.md`](./TAREAS.md): lo que quede pendiente.
7. **Implementa** con el artículo citado en un comentario junto a la fórmula.
8. **Agrega o actualiza casos** en [`docs/CASOS_DE_PRUEBA.md`](./docs/CASOS_DE_PRUEBA.md) si el cambio altera algún resultado, y tests unitarios cuando exista el runner.

Si una fuente secundaria (blog, despacho, medio) contradice a una oficial, **prevalece la oficial**. Si dos fuentes secundarias se contradicen y no hay oficial disponible, márcalo 🟡 y no lo implementes como definitivo.

### Fuentes oficiales

| Qué | Dónde |
|---|---|
| Texto vigente de la LFT, la LISR y la CPEUM, y sus reformas | <https://www.diputados.gob.mx/LeyesBiblio/> (LFT: `pdf/LFT.pdf`, reformas: `ref/lft.htm`) |
| Decretos, salarios mínimos, UMA, Anexos de la RMF | Diario Oficial de la Federación: <https://www.dof.gob.mx> |
| Salarios mínimos | CONASAMI: <https://www.gob.mx/conasami> (resolución en el DOF de diciembre) |
| UMA | INEGI: <https://www.inegi.org.mx/temas/uma/> (publicada en enero, vigente desde el 1 de febrero) |
| Tarifas de ISR y subsidio para el empleo | SAT, Anexo 8 de la RMF: <https://www.sat.gob.mx> |
| Jurisprudencia y tesis | Semanario Judicial de la Federación: <https://sjf2.scjn.gob.mx> |

---

## Reglas legales vigentes que ya aplica la herramienta

El detalle y sus fuentes están en `docs/MARCO_LEGAL.md`; el estado de cada verificación, en `docs/NOTAS_INTERNAS.md`. **Revalídalas antes de modificarlas.**

- **Salario diario:** sueldo mensual ÷ **30** (Art. 89 LFT). No usar 30.4 (criterio de nómina e IMSS).
- **Finiquito** (aguinaldo, vacaciones, prima vacacional): con el **salario diario (ordinario)**, no con el SDI.
- **Indemnizaciones** (90 días y 20 días por año): con el **SDI** (Arts. 84 y 89 LFT), capturado por el usuario o calculado con las prestaciones del contrato y los días de vacaciones según la antigüedad.
- **Aguinaldo:** mínimo **15 días** (Art. 87). Se acepta un valor mayor si lo da el contrato, nunca uno menor.
- **Vacaciones:** tabla del Art. 76 reformado (DOF 27-12-2022): 12, 14, 16, 18 y 20 días en los años 1 a 5; después, +2 días cada 5 años, **sin límite superior**.
- **Prima vacacional:** mínimo **25 %** (Art. 80). Se acepta un porcentaje mayor si lo da el contrato.
- **20 días por año (Art. 50 fr. II):** **no** procede en todo despido injustificado; solo en los supuestos de los Arts. 49, 52 y 947 (jurisprudencia con registro 1008929). En la interfaz siempre es opcional.
- **Prima de antigüedad:** 12 días por año, con el salario topado al **doble del salario mínimo de la zona** (Arts. 162, 485 y 486), con **salario mínimo y no UMA**. En renuncia solo con 15 años o más; en despido, siempre.
- **ISR:** exenciones en UMA (Art. 93 fr. XIII y XIV LISR); retención con el Art. 96 (ingresos ordinarios) y el Art. 95 (pagos por separación, con la tasa efectiva).
- **Contrato:** la herramienta asume un contrato **por tiempo indeterminado**.

---

## Documentación: qué va en cada archivo

| Archivo | Audiencia | Contenido |
|---|---|---|
| `docs/MARCO_LEGAL.md` | **Público.** Se muestra tal cual en la página "Marco Legal" | Fundamento legal en lenguaje para el usuario. **Prohibido:** nombres de funciones, pendientes, marcas ⚠️/🐞/✅, menciones a `TAREAS.md` y enlaces relativos a archivos del repo (no funcionan en la app) |
| `docs/NOTAS_INTERNAS.md` | Equipo | Estado de las verificaciones, estado de implementación, errores conocidos, mantenimiento anual, fuentes secundarias |
| `docs/CASOS_DE_PRUEBA.md` | Abogado revisor | Casos calculados con la lógica real y criterios por validar |
| `TAREAS.md` | Equipo | Pendientes por prioridad (P0, P1, P2), con su artículo |
| `README.md` | Público del repo | Descripción, instalación, resumen legal |

### Mantenimiento anual obligatorio

- **Diciembre:** salarios mínimos del año siguiente y tarifa de ISR (Anexo 8 de la RMF).
- **Enero:** UMA (vigente desde el 1 de febrero).
- **Cada año:** revisar las reformas a la LFT y la LISR, y las iniciativas pendientes (por ejemplo, la del aguinaldo de 30 días).

Las cifras se guardan **por año** y se eligen según la **fecha de salida** del trabajador, no según la fecha actual.

---

## Stack y comandos

- **React 19** con JSX (sin TypeScript), **Vite 7** y **TailwindCSS 4** (plugin `@tailwindcss/vite`, sin `tailwind.config.js`; tipografía con `@tailwindcss/typography`).
- **date-fns** para fechas; **react-markdown** y **remark-gfm** para mostrar `MARCO_LEGAL.md`.
- Fuentes **Inter** y **Work Sans** alojadas en el sitio con `@fontsource-variable` (clases `font-sans` y `font-display`). Íconos SVG en línea en `src/components/Icon.jsx`. **No cargues recursos de terceros** (Google Fonts, CDN, analítica) sin acordarlo: la app no debe enviar datos del usuario a otros dominios.
- **ESLint 9** (flat config): punto y coma obligatorio, comillas simples y línea final.

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run lint     # debe pasar sin errores antes de terminar cualquier cambio
npm run build    # debe compilar sin errores
npm run preview
```

El sitio se publica en GitHub Pages (`https://hay-espacio-en-el-taco.github.io/calculadora-finiquito-LFT-MX/`) con `.github/workflows/deploy.yml` en cada push a `main`. Por eso `vite.config.js` define `base: '/calculadora-finiquito-LFT-MX/'`: no uses rutas absolutas escritas a mano (`/algo`) en el código; usa imports o `import.meta.env.BASE_URL`.

Todavía no hay runner de tests. Configurar **Vitest** es una tarea P1 de `TAREAS.md`.

## Estructura

```
src/
├── logic/calculator.js       # Funciones PURAS de cálculo legal (sin React)
├── logic/desglose.js         # Conceptos del desglose con su artículo y fórmula (pantalla y PDF)
├── data/articulos.json       # Texto OFICIAL de los artículos: NO se edita a mano
├── components/
│   ├── Landing.jsx           # Calculadora: formulario + resultados
│   ├── MarcoLegal.jsx        # Muestra docs/MARCO_LEGAL.md (carga diferida)
│   ├── Icon.jsx              # Íconos SVG en línea
│   ├── ArticuloLink.jsx      # Referencia legal que abre el modal
│   ├── ArticuloModal.jsx     # Texto oficial del artículo (carga diferida)
│   └── ReporteImpresion.jsx  # Formato del PDF (solo visible al imprimir)
│   └── Navigation.jsx        # Barra superior y barra móvil
├── App.jsx                   # Navegación por hash (#calculadora, #marco-legal)
└── main.jsx
docs/                         # MARCO_LEGAL, NOTAS_INTERNAS, CASOS_DE_PRUEBA
scripts/extraer_articulos.py  # Genera src/data/articulos.json desde los PDF oficiales
TAREAS.md
```

## Convenciones de código

- **Toda la lógica legal va en `src/logic/` como funciones puras.** Los componentes no calculan conceptos legales: llaman a `calculateSettlement` y `validateInputs`.
- **Cada fórmula lleva un comentario con su artículo** (por ejemplo, `// Art. 87 LFT: ...`).
- **Los mínimos legales se validan, nunca se asumen:** si el usuario captura menos que la ley, se muestra un error con el artículo.
- Las constantes legales y económicas (`LFT_CONSTANTS`, `ECON_2026`) no se escriben "a mano" dentro de las fórmulas.
- Componentes funcionales con hooks, en archivos `PascalCase.jsx` dentro de `src/components/`.
- Estilos solo con clases de Tailwind, conservando la paleta slate/neutral existente.
- Código, comentarios e interfaz en **español de México**. No mezclar idiomas en la interfaz.
- **Accesibilidad:** cada `input` con su `label` (`htmlFor`/`id`), errores ligados con `aria-describedby` y `aria-invalid`, y etiquetas semánticas (`main`, `nav`, `section`, `fieldset`).
- Cada concepto de la interfaz muestra su artículo, y la referencia se puede abrir en el modal con `ArticuloLink`. Si citas un artículo nuevo, agrégalo a `ARTICULOS_LFT` en `scripts/extraer_articulos.py` y regenera `src/data/articulos.json` desde el PDF oficial. **Nunca escribas el texto de un artículo a mano.**
- El PDF se genera con la impresión del navegador: lo que se vea en pantalla debe reflejarse también en `ReporteImpresion.jsx`, que usa el mismo `buildBreakdown`.
- La interfaz no debe presentar como definitivo algo que no se calcula: por ejemplo, el total es "antes de ISR" mientras el ISR no esté implementado.

## Verificación antes de dar un cambio por terminado

1. `npm run lint` y `npm run build` pasan.
2. Si cambió un cálculo: verifica los montos a mano o con los casos de `docs/CASOS_DE_PRUEBA.md` y regenera los afectados.
3. Si cambió la interfaz: pruébala en el navegador (envío del formulario, renuncia y despido, mensajes de error, ancho de móvil).
4. La documentación (`MARCO_LEGAL.md`, `NOTAS_INTERNAS.md`, `TAREAS.md`) refleja el cambio.

## Git

- No hagas commit directo a `main`: trabaja en una rama (`feature/...`, `fix/...`, `docs/...`).
- Si el commit cambia un cálculo legal, el mensaje debe incluir el artículo y la fuente (por ejemplo, `fix: tabla de vacaciones >30 años (Art. 76 LFT, DOF 27-12-2022)`).
- No subas `.DS_Store`, `dist/` ni `node_modules/`.

## Qué NO hacer

- No inventes números de tesis, registros, fechas del DOF ni cifras. Si no los encuentras, márcalos como pendientes.
- No apliques iniciativas de ley no aprobadas.
- No uses la UMA donde la ley dice salario mínimo, ni al revés.
- No sumes conceptos que solo proceden en juicio (salarios vencidos) a una liquidación sin dejarlo explícito.
- No ocultes limitaciones: si algo no se calcula, la interfaz y `MARCO_LEGAL.md` lo dicen.
- No agregues dependencias sin necesidad; las librerías pesadas se cargan de forma diferida.

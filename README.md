# Calculadora de Finiquito Justo — LFT 2026 🇲🇽

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX)
[![Publicar en GitHub Pages](https://github.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX/actions/workflows/deploy.yml/badge.svg)](https://github.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX/actions/workflows/deploy.yml)

Una calculadora web interactiva para calcular el finiquito e indemnización conforme a la **Ley Federal del Trabajo (LFT) de México**, actualizada para 2026.

> 🔓 **Repositorio público y de código abierto. ¡Los Pull Requests son bienvenidos!** Lee [Contribuir](#-contribuir) y [`AGENTS.md`](./AGENTS.md) antes de empezar.

**👉 Úsala en línea: [https://hay-espacio-en-el-taco.github.io/calculadora-finiquito-LFT-MX/](https://hay-espacio-en-el-taco.github.io/calculadora-finiquito-LFT-MX/)**

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## ¿Qué es esto?

Esta herramienta permite a trabajadores y empleadores mexicanos calcular de manera transparente y precisa los montos correspondientes a una terminación laboral, ya sea por **renuncia voluntaria** o **despido injustificado**. Los cálculos se basan directamente en los artículos de la LFT y la Constitución Política de los Estados Unidos Mexicanos.

---

## 🚧 Estado del Proyecto

**En desarrollo, aún no listo para producción.** La interfaz es un prototipo con cifras de ejemplo y la lógica de cálculo todavía no está conectada. Consulta [`TAREAS.md`](./TAREAS.md) para ver los pendientes del lanzamiento.

---

## ✨ Funcionalidades (objetivo del lanzamiento)

- **Finiquito de Ley** — Salarios devengados, aguinaldo proporcional (Art. 87 LFT), y vacaciones proporcionales y pendientes con prima vacacional (Arts. 76–81 LFT).
- **Indemnización por Despido Injustificado** — 90 días de salario integrado (Art. 123 CPEUM / Art. 48 LFT) y prima de antigüedad (Art. 162 LFT). Los **20 días por año** (Art. 50 fr. II LFT) se calculan solo cuando proceden legalmente (Arts. 49 y 52 LFT).
- **Prestaciones superiores a la ley** — Días de aguinaldo (mínimo 15) y porcentaje de prima vacacional (mínimo 25 %) configurables.
- **Salario Diario Integrado (SDI)** — Se puede capturar o calcular. Es la base de las indemnizaciones (Arts. 84 y 89 LFT); el finiquito se calcula con la cuota diaria.
- **Tope legal de prima de antigüedad** — Doble del salario mínimo de la zona (Arts. 162, 485 y 486 LFT).
- **Zonas geográficas** — Zona General y Zona Libre de la Frontera Norte.
- **Retenciones de ISR** — Exenciones del Art. 93 LISR y retención de los Arts. 95 y 96 LISR (Anexo 8 RMF 2026).
- **Texto oficial de cada artículo** — Al hacer clic en una referencia (por ejemplo, Art. 87 LFT) se abre el texto vigente.
- **Desglose en PDF** — Descarga del cálculo con fórmulas, artículos y avisos legales.
- **Interfaz responsiva** — Diseño adaptado para escritorio y dispositivos móviles.

---

## 🏛️ Marco Legal

El fundamento completo, las cifras oficiales 2026 y las fuentes están en [`docs/MARCO_LEGAL.md`](./docs/MARCO_LEGAL.md), que también se muestra en la página "Marco Legal" de la app. El estado de las verificaciones y el procedimiento de actualización anual están en [`docs/NOTAS_INTERNAS.md`](./docs/NOTAS_INTERNAS.md).

| Concepto | Fundamento Legal | Cuándo aplica |
|---|---|---|
| Salarios devengados | Arts. 82, 83 y 88 LFT | Siempre |
| Aguinaldo proporcional | Art. 87 LFT (mínimo 15 días) | Siempre |
| Vacaciones | Arts. 76, 79 y 81 LFT (tabla reformada, DOF 27-12-2022) | Siempre |
| Prima vacacional | Art. 80 LFT (mínimo 25 %) | Siempre |
| Indemnización (90 días) | Art. 123 fr. XXII CPEUM / Arts. 48 y 50 fr. III LFT | Despido injustificado |
| 20 días por año | Art. 50 fr. II LFT | Solo en los casos de los Arts. 49, 52 y 947 LFT |
| Prima de antigüedad | Art. 162 LFT | Despido: siempre · Renuncia: con 15 años o más |
| Tope prima de antigüedad | Arts. 485 y 486 LFT — 2 × salario mínimo de la zona | Siempre que se pague la prima |
| Salario diario | Art. 89 LFT — sueldo mensual / 30 | Base de todos los conceptos |
| Exenciones ISR | Art. 93 fr. XIII y XIV LISR (en UMA) | Siempre |
| Retención ISR | Arts. 95 y 96 LISR, Anexo 8 RMF 2026 | Siempre |

**Cifras 2026:** salario mínimo general $315.04 · frontera norte $440.87 · UMA $117.31 (vigente desde el 01-02-2026).

---

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX.git
cd calculadora-finiquito-LFT-MX

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera el bundle de producción en `dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint sobre todo el código fuente |

### Publicación

Cada push a `main` publica el sitio en GitHub Pages con el workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), que ejecuta `npm run lint` y `npm run build`. El sitio vive en `/calculadora-finiquito-LFT-MX/` (`base` en `vite.config.js`); si se renombra el repositorio, hay que actualizar `base` y las URLs de `index.html`.

---

## 📁 Estructura del Proyecto

```
calculadora-finiquito-LFT-MX/
├── docs/
│   ├── MARCO_LEGAL.md    # Fundamento legal público (se muestra en la app)
│   ├── NOTAS_INTERNAS.md # Verificaciones, estado y mantenimiento (solo equipo)
│   └── CASOS_DE_PRUEBA.md # Casos para la revisión del abogado
├── public/               # Recursos estáticos
├── src/
│   ├── components/
│   │   ├── Landing.jsx     # Calculadora (formulario + resultados)
│   │   ├── MarcoLegal.jsx  # Página que muestra docs/MARCO_LEGAL.md
│   │   ├── Navigation.jsx  # Barra superior y barra móvil
│   │   ├── ArticuloModal.jsx    # Texto oficial de cada artículo
│   │   ├── ReporteImpresion.jsx # Formato del desglose en PDF
│   │   └── Icon.jsx        # Íconos SVG en línea
│   ├── data/
│   │   └── articulos.json  # Texto oficial de los artículos (generado)
│   ├── logic/
│   │   └── calculator.js # Funciones puras de cálculo
│   ├── App.jsx           # Componente raíz
│   ├── App.css           # Estilos globales de la app
│   ├── index.css         # Estilos base (Tailwind)
│   └── main.jsx          # Punto de entrada de React
├── AGENTS.md             # Reglas de desarrollo y validación legal (fuente única)
├── CLAUDE.md             # Importa AGENTS.md + notas para Claude Code
├── TAREAS.md             # Pendientes para el lanzamiento
├── index.html            # Template HTML
├── vite.config.js        # Configuración de Vite
├── eslint.config.js      # Configuración de ESLint
└── package.json
```

---

## 🤝 Contribuir

Este repositorio es **público** y **¡los Pull Requests son bienvenidos!** Si encuentras un error en los cálculos legales, quieres agregar una nueva funcionalidad o mejorar la documentación, por favor:

1. Lee **[`AGENTS.md`](./AGENTS.md)**: reúne las convenciones del proyecto y el flujo obligatorio para validar cualquier cambio contra las leyes mexicanas vigentes. Aplica tanto a personas como a agentes de IA.
2. Haz un **fork** del repositorio.
3. Crea una rama con un nombre descriptivo: `git checkout -b feature/calculo-ptu`.
4. Realiza tus cambios y escribe commits claros.
5. Abre un **Pull Request** describiendo los cambios realizados.

Para reportar errores o solicitar funcionalidades, abre un [Issue](https://github.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX/issues).

> ⚠️ **Importante:** Si los cambios afectan cálculos legales, incluye la referencia al artículo de la LFT o la fuente normativa correspondiente y actualiza [`docs/MARCO_LEGAL.md`](./docs/MARCO_LEGAL.md) (texto para el público) y [`docs/NOTAS_INTERNAS.md`](./docs/NOTAS_INTERNAS.md).

---

## ⚖️ Aviso Legal

Esta herramienta se proporciona con fines **informativos y educativos** únicamente. Los resultados son una estimación basada en la información ingresada y no constituyen asesoría legal. Asume un contrato por tiempo indeterminado. Para situaciones específicas, consulta a un abogado laboral certificado o a la [PROFEDET](https://www.gob.mx/profedet), que ofrece asesoría gratuita.

Recuerda que el plazo para demandar por despido es de **2 meses** (Art. 518 LFT) y que antes de demandar debes acudir al Centro de Conciliación (Art. 684-B LFT).

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

Hecho con ❤️ por [Hay espacio en el taco](https://github.com/hay-espacio-en-el-taco)

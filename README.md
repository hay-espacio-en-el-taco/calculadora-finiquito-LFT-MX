# Calculadora de Finiquito Justo — LFT 2026 🇲🇽

Una calculadora web interactiva para calcular el finiquito e indemnización conforme a la **Ley Federal del Trabajo (LFT) de México**, actualizada para 2026.

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## ¿Qué es esto?

Esta herramienta permite a trabajadores y empleadores mexicanos calcular de manera transparente y precisa los montos correspondientes a una terminación laboral, ya sea por **renuncia voluntaria** o **despido injustificado**. Los cálculos se basan directamente en los artículos de la LFT y la Constitución Política de los Estados Unidos Mexicanos.

---

## ✨ Funcionalidades

- **Finiquito de Ley** — Aguinaldo proporcional (Art. 87 LFT) y vacaciones con prima vacacional (Art. 76–80 LFT).
- **Indemnización por Despido Injustificado** — 90 días constitucionales (Art. 123 CPEUM), 20 días por año trabajado (Art. 50 LFT) y prima de antigüedad (Art. 162 LFT).
- **Salario Diario Integrado (SDI)** — Cálculo automático del SDI utilizado como base de todos los conceptos.
- **Tope legal de prima de antigüedad** — Aplicación automática del tope de dos salarios mínimos vigentes.
- **Zonas geográficas** — Soporte para Zona General y Zona Libre de la Frontera Norte.
- **Retenciones de ISR** — Estimación de la retención fiscal aplicable al finiquito.
- **Interfaz responsiva** — Diseño adaptado para escritorio y dispositivos móviles.

---

## 🏛️ Marco Legal

| Concepto | Fundamento Legal |
|---|---|
| Aguinaldo Proporcional | Art. 87 LFT |
| Vacaciones Proporcionales | Art. 76 LFT |
| Prima Vacacional | Art. 80 LFT |
| Indemnización (90 días) | Art. 123 Constitución / Art. 48 LFT |
| 20 días por año | Art. 50 LFT |
| Prima de Antigüedad | Art. 162 LFT |
| Salario Mínimo (tope prima de antigüedad) | Art. 162 LFT — 2 SMG |

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

---

## 📁 Estructura del Proyecto

```
calculadora-finiquito-LFT-MX/
├── public/               # Recursos estáticos
├── src/
│   ├── components/
│   │   └── Landing.jsx   # Componente principal de la calculadora
│   ├── App.jsx           # Componente raíz
│   ├── App.css           # Estilos globales de la app
│   ├── index.css         # Estilos base (Tailwind)
│   └── main.jsx          # Punto de entrada de React
├── index.html            # Template HTML
├── vite.config.js        # Configuración de Vite
├── eslint.config.js      # Configuración de ESLint
└── package.json
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si encuentras un error en los cálculos legales, quieres agregar una nueva funcionalidad o mejorar la documentación, por favor:

1. Haz un **fork** del repositorio.
2. Crea una rama con un nombre descriptivo: `git checkout -b feature/calculo-ptu`.
3. Realiza tus cambios y escribe commits claros.
4. Abre un **Pull Request** describiendo los cambios realizados.

Para reportar errores o solicitar funcionalidades, abre un [Issue](https://github.com/hay-espacio-en-el-taco/calculadora-finiquito-LFT-MX/issues).

> ⚠️ **Importante:** Si los cambios afectan cálculos legales, incluye la referencia al artículo de la LFT o la fuente normativa correspondiente.

---

## ⚖️ Aviso Legal

Esta herramienta se proporciona con fines **informativos y educativos** únicamente. Los resultados son una estimación basada en la información ingresada y no constituyen asesoría legal. Para situaciones específicas, consulta a un abogado laboral certificado.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

Hecho con ❤️ por [Hay espacio en el taco](https://github.com/hay-espacio-en-el-taco)

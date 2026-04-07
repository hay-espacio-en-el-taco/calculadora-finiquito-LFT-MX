# Copilot Instructions — Calculadora de Finiquito LFT MX

## Descripción del Proyecto

Esta es una aplicación web construida con **React 19**, **Vite 7** y **TailwindCSS 4** que calcula el finiquito e indemnización de trabajadores mexicanos conforme a la **Ley Federal del Trabajo (LFT)**.

---

## Stack Tecnológico

- **Framework UI:** React 19 con JSX (no TypeScript)
- **Build tool:** Vite 7
- **Estilos:** TailwindCSS 4 (via `@tailwindcss/vite` plugin — sin archivo `tailwind.config.js`)
- **Linter:** ESLint 9 con configuración flat config (`eslint.config.js`)
- **PDF:** `react-pdf` para generación de documentos
- **Idioma del código y UI:** Español (México)

---

## Convenciones de Código

- Usa **componentes funcionales** con hooks de React. Sin clases.
- Los nombres de componentes van en `PascalCase` y los archivos en `PascalCase.jsx`.
- Los estilos se aplican exclusivamente con **clases de Tailwind** directamente en el JSX. No uses CSS-in-JS ni archivos `.module.css` para componentes nuevos.
- Mantén los componentes en `src/components/`.
- No uses TypeScript. Todos los archivos de código son `.jsx` o `.js`.
- Los comentarios en el código deben estar en **español**.

---

## Lógica de Negocio (Cálculos Legales)

Cuando implementes o modifiques cálculos de finiquito, sigue estas reglas:

### Conceptos del Finiquito de Ley (Renuncia o Despido)
- **Aguinaldo proporcional:** `(díasDelAño / 365) × 15 días de salario` — Art. 87 LFT
- **Vacaciones proporcionales:** Según tabla de Art. 76 LFT (reformada 2023: mínimo 12 días el 1er año, +2 días por año hasta 20, luego +2 cada 5 años)
- **Prima vacacional:** `25% sobre los días de vacaciones` — Art. 80 LFT

### Conceptos de Indemnización por Despido Injustificado
- **90 días de SDI:** Indemnización constitucional — Art. 123 CPEUM / Art. 48 LFT
- **20 días por año:** Por cada año completo de servicio — Art. 50 LFT
- **Prima de antigüedad:** `12 días de salario por año`, topado a **2 veces el salario mínimo general (SMG)** vigente — Art. 162 LFT

### Salario Diario Integrado (SDI)
`SDI = (Salario Mensual / 30.4) × Factor de Integración`
El factor de integración incluye aguinaldo, vacaciones y prima vacacional y varía por antigüedad.

### Reglas Importantes
- Siempre referencia el artículo legal en los comentarios y en la UI cuando muestres un concepto.
- El tope de prima de antigüedad debe aplicarse automáticamente.
- Soporta **Zona General** y **Zona Libre de la Frontera Norte** (diferente salario mínimo).
- Para despido injustificado aplican TODOS los conceptos. Para renuncia voluntaria, solo el finiquito de ley (aguinaldo, vacaciones, prima vacacional) más prima de antigüedad si hay más de 15 años o el trabajador se retira.

---

## Comandos de Desarrollo

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción
npm run lint     # Linting con ESLint
npm run preview  # Preview del build
```

---

## Estructura de Archivos Relevante

```
src/
├── components/
│   └── Landing.jsx     # Componente principal: formulario + resultados
├── App.jsx             # Raíz de la app
└── main.jsx            # Entry point
```

---

## Guías para el Agente

1. **Precisión legal primero:** Cualquier cambio en cálculos debe estar respaldado por el artículo de la LFT correspondiente. Si hay duda, indícalo en un comentario.
2. **No cambies la UI sin razón:** El diseño usa una paleta slate/neutral minimalista. Mantén consistencia.
3. **Internacionalización:** La app es exclusivamente en español mexicano. No mezcles idiomas.
4. **Accesibilidad:** Usa etiquetas semánticas HTML (`<label>`, `<main>`, `<section>`, `<nav>`). Los `input` deben tener su `label` asociado.
5. **Performance:** Evita re-renders innecesarios. Usa `useMemo` o `useCallback` cuando calcules valores derivados costosos.
6. **Tests:** Si agregas lógica de cálculo nueva, extráela a una función pura en `src/utils/` y escribe tests unitarios para ella.

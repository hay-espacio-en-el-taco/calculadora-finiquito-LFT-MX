# Notas internas del Marco Legal

> **Solo para el equipo. Este archivo no se muestra en la aplicación.**
> Complementa a [`MARCO_LEGAL.md`](./MARCO_LEGAL.md), que es la **versión pública** que se ve en la página "Marco Legal".
> **Corte de verificación:** 30 de octubre de 2026.

## Reglas de mantenimiento

El flujo completo de validación legal y las convenciones del proyecto están en [`AGENTS.md`](../AGENTS.md). Estas reglas lo complementan para la documentación legal.

1. **`MARCO_LEGAL.md` se publica tal cual en la app.** Debe estar escrito para el usuario: sin nombres de funciones, sin pendientes, sin ⚠️/🐞/✅ y sin enlaces a archivos del repo (los relativos no funcionan en la app).
2. Todo cálculo debe tener su fundamento en `MARCO_LEGAL.md`. Si cambia una ley, una cifra oficial o un criterio judicial: **primero** se actualiza `MARCO_LEGAL.md` (y la fecha de "Información vigente"), **después** el código (`src/logic/calculator.js`) y **al final** este archivo.
3. Las verificaciones pendientes, los errores conocidos y las decisiones abiertas viven **aquí** y en [`TAREAS.md`](../TAREAS.md), nunca en el documento público.

---

## 1. Estado de las verificaciones

| Dato o criterio | Estado | Qué falta |
|---|---|---|
| Texto de los artículos que muestra el modal (`src/data/articulos.json`) | ✅ Extraído con `scripts/extraer_articulos.py` de los PDF oficiales de la Cámara de Diputados descargados el 30-10-2026: **LFT, última reforma DOF 14-05-2026**; **CPEUM, última reforma DOF 07-10-2026**. Revisado contra el PDF (párrafos y fracciones completos; las notas de reforma quedan separadas) | Regenerarlo cada vez que haya una reforma (ver la sección 3) |
| Reforma LFT DOF 14-05-2026 | ✅ Solo reforma los Arts. 304, 307, 308, 309 y 310, la denominación del Capítulo XI del Título Sexto, y adiciona el 305 Bis (personas trabajadoras artistas). **No afecta los cálculos** | — |
| Plataformas digitales (Art. 49 fr. VI y Art. 50 fr. IV, DOF 24-12-2024) | ✅ Documentado en `MARCO_LEGAL.md` 4.2. Para estas personas los 20 días por año proceden siempre, junto con los 3 meses | Valorar una opción de "persona trabajadora de plataformas digitales" que active los 20 días automáticamente |
| Salarios mínimos 2026 | ✅ Verificado en fuente oficial: DOF 09-12-2025, código 5775534 | — |
| UMA 2026 | ✅ Verificado: boletín del INEGI, DOF 09-01-2026 | — |
| Tarifa ISR 2026 (Anexo 8) | 🟡 Tres transcripciones independientes coinciden renglón por renglón ([Siempre Contable](https://www.siemprecontable.net/recursos/tablas-isr-2026), [Academia de Amparo](https://www.academiadeamparo.com/p/tarifas-isr-2026-mensual-y-anual.html), [Praxium](https://praxiumconsultores.com/blog/tarifa-isr-mensual-2026-art-96)). Además es consistente por dentro: cada cuota fija es igual al impuesto acumulado del renglón anterior (±$0.01) y los límites son continuos | Cotejar a mano los 11 renglones contra el PDF del SAT o el DOF del 28-12-2025 (no se pudo descargar de forma automatizada) |
| Subsidio para el empleo 2026 | 🟡 Solo fuentes secundarias: $536.21 en enero, $535.65 de febrero a diciembre, ingreso máximo $11,492.66 mensuales | Cotejo oficial y definir su tratamiento en el mes de la baja. No aplica a pagos por separación |
| Jurisprudencia de los 20 días (registro 1008929) | 🟡 Citada desde transcripciones ([Juristeca](https://juristeca.com/mx/scjn/tesis-jurisprudenciales/1989/8/registro-1008929-indemnizacion-de-20-dias-de-salario-por-cada-ano-de-servicios-prestados-procedencia-de-la), [Conciliación y Arbitraje México](https://www.conciliacionyarbitraje.mx/2026/09/el-mito-de-los-20-dias-la-indemnizacion.html), un foro que cita "Varios 3/85" y la Gaceta núm. 34, oct. 1990, p. 43) | Confirmar en <https://sjf2.scjn.gob.mx> el registro y el número de tesis de la Cuarta Sala (el SJF no se deja leer de forma automatizada) |
| Criterio relacionado: CT 278/2010 (ejecutoria, registro 22587) | 🟡 Consistente con el anterior: si el patrón queda eximido de reinstalar en una relación por tiempo indeterminado, aplica solo la fr. II del Art. 50, con antigüedad contada hasta la resolución | Leer la ejecutoria completa en el SJF |
| Tope de la prima de antigüedad con salario mínimo y no UMA | 🟡 Fundamento actual: la letra del Art. 486 LFT. No se localizó ninguna tesis con registro. Algunos blogs sostienen 2 UMA ($234.62 en 2026 contra $630.08), sin citar jurisprudencia. Hay un comunicado de la Segunda Sala sobre la base de la prima (Arts. 485 y 486) que habla de salario mínimo, pero el sitio de la SCJN rechazó la descarga automatizada | Buscar a mano en el SJF ("prima de antigüedad" + "salario mínimo" / "Unidad de Medida y Actualización") y citar el registro |
| Base de la prima de antigüedad: salario diario o integrado | 🔴 **Decisión del abogado.** Hay criterios encontrados: la fr. II del Art. 162 remite a los Arts. 485 y 486 y no al 84 (práctica mayoritaria: salario diario), pero existen tesis aisladas de Tribunales Colegiados que usan el SDI. Hoy se usa el salario diario | Ver el caso C2 en [`CASOS_DE_PRUEBA.md`](./CASOS_DE_PRUEBA.md): $79,864.11 con salario diario contra $84,568.33 con SDI |
| Finiquito con salario ordinario y no con SDI | 🟡 Criterio mayoritario (2006 y tesis de Tribunales Colegiados de 2011, según [fuente secundaria](https://www.elcontribuyente.mx/2025/12/cuota-diaria-vs-salario-integrado-como-se-calcula-realmente-el-aguinaldo/)). Hay precedentes aislados que calculan las vacaciones y la prima con salario integrado | Citar los registros en el SJF. Validación del abogado (criterio K). Considerar que las prestaciones ordinarias y regulares diarias (Art. 82) se suman a la cuota diaria |

---

## 2. Estado de implementación por concepto

| Concepto (sección de `MARCO_LEGAL.md`) | Estado | Notas |
|---|---|---|
| 3.1 Salarios devengados | ❌ No implementado | `TAREAS.md` L8 |
| 3.2 Aguinaldo proporcional | ✅ `calculateAguinaldo` | Días del contrato capturables (mínimo 15). Pendiente: años bisiestos (15/365 × 366) y aguinaldo ya pagado en bajas de diciembre |
| 3.3 Vacaciones | 🐞 **Error conocido** | `getVacationDaysByLaw` devuelve 30 para cualquier antigüedad mayor a 25 años; a partir de 31 años deben ser 32, +2 cada 5 años (`TAREAS.md` L4; lo exhibe el caso C6) |
| 3.4 Prima vacacional | ✅ | Porcentaje del contrato capturable (mínimo 25 %) |
| 3.5 PTU pendiente | ❌ No implementado | Como mínimo, mostrar un aviso en la interfaz |
| 3.6 / 4.3 Prima de antigüedad | ✅ `calculateSeniorityPremium` | Condicionada por tipo de separación y antigüedad; tope por zona. Falta el test del tope (L6) |
| 4.1 Indemnización de 90 días | ✅ `calculateIndemnity90` | Con el SDI capturado o calculado |
| 4.2 20 días por año | ✅ Casilla opcional | Solo con despido y si el usuario marca el supuesto |
| 4.4 Salarios vencidos | ❌ No implementado | P2: "escenario de juicio" |
| 4.5 Tiempo determinado | ❌ No soportado | La interfaz aún no lo advierte (L11) |
| 5.1 Salario diario | ✅ `calculateSettlement` divide entre 30 | No usar 30.4 (criterio de nómina e IMSS) |
| 5.2 SDI | ✅ `calculateSDI` | Ojo: su valor por defecto es `vacationDays = 12`; `calculateSettlement` le pasa los días según la antigüedad. Quien la llame directamente debe pasarlos |
| 6 ISR | ❌ No implementado | La interfaz muestra el total bruto con la leyenda "antes de ISR" (L9). La UMA debe elegirse según la fecha de salida (L10) |
| 7 Avisos procesales | ❌ No están en la interfaz | `TAREAS.md` L11 |

---

## 3. Mantenimiento anual (diciembre y enero)

1. **Diciembre:** actualizar los salarios mínimos del año siguiente (Resolución CONASAMI en el DOF).
2. **Finales de diciembre:** actualizar la tarifa de ISR (Anexo 8 de la RMF del año siguiente) y el decreto del subsidio para el empleo.
3. **Enero:** actualizar la UMA (INEGI, alrededor del 10 de enero, vigente desde el 1 de febrero).
4. Revisar las reformas a la LFT y la LISR publicadas en el año: <https://www.diputados.gob.mx/LeyesBiblio/ref/lft.htm>.
5. Descargar los PDF vigentes de la LFT y la CPEUM y regenerar el texto de los artículos: `python3 scripts/extraer_articulos.py LFT.pdf CPEUM.pdf` (requiere `pdftotext`). Revisa el diff de `src/data/articulos.json`: si cambió el texto de un artículo, revisa el cálculo y `MARCO_LEGAL.md`.
6. Seguir la iniciativa de aguinaldo de 30 días (no aprobada al 30-10-2026).
7. Actualizar `MARCO_LEGAL.md` (incluida la fecha de "Información vigente"), después las constantes de `src/logic/calculator.js` y al final este archivo.
8. Mantener las cifras **por año** (por ejemplo `ECON[2025]`, `ECON[2026]`) para calcular bajas de años anteriores con las cifras que les correspondan.

---

## 4. Fuentes secundarias consultadas (30-10-2026)

- Salarios mínimos: [IDC Online](https://idconline.mx/laboral/2025/12/09/ya-es-oficial-el-monto-de-los-salarios-minimos-del-2026), [Holland & Knight](https://www.hklaw.com/es/insights/publications/2025/12/ajustes-a-los-salarios-minimos-en-mexico-para-el-2026), [EY](https://www.ey.com/es_mx/technical/tax/boletines-fiscales/incremento-salarios-minimos-2026)
- UMA: [IDC Online](https://idconline.mx/laboral/2026/01/09/valor-uma-2026-inegi-publica-nuevos-montos)
- Jornada de 40 horas: [Deloitte](https://www.deloitte.com/latam/es/services/legal/perspectives/se-publica-en-el-dof-la-reforma-a-la-ley-federal-del-trabajo-sobre-la-reduccion-de-la-jornada-laboral.html), [El Financiero](https://www.elfinanciero.com.mx/nacional/2026/03/03/reduccion-de-la-jornada-laboral-a-40-horas-en-mexico-es-oficial-publican-documento-en-el-dof/)
- Tarifa ISR: [ElConta.MX](https://elconta.mx/tablas-isr-sat-ejercicio-2026-anexo-8-rmf/)
- Aguinaldo (iniciativa no aprobada): [Expansión](https://expansion.mx/finanzas-personales/2026/10/05/doble-aguinaldo-2026-esto-se-sabe-sobre-pago-trabajadores), [El Imparcial](https://www.elimparcial.com/dinero/2026/10/19/quienes-si-y-quienes-no-recibiran-doble-aguinaldo-este-diciembre-de-2026-segun-la-ley-federal-del-trabajo/)
- Prima de antigüedad, salario mínimo vs. UMA y SD vs. SDI: [IDC Online](https://idconline.mx/laboral/2023/09/05/tope-de-prima-de-antiguedad-con-salario-minimo-general-o-profesional)

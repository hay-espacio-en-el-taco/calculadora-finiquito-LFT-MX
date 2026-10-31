# Casos de prueba para revisión legal

> **Propósito:** que un abogado laboral valide los resultados de la herramienta antes del lanzamiento.
> **Generados:** 30-10-2026 con `calculateSettlement` (`src/logic/calculator.js`), con cifras 2026.
> **Fecha de salida en todos los casos:** 15-10-2026. Contrato por tiempo indeterminado. Sin ISR (aún no implementado).

## Criterios que aplica la herramienta (para validar)

| # | Criterio | Fundamento | ¿Lo valida el abogado? |
|---|---|---|---|
| A | Salario diario = sueldo mensual / 30 | Art. 89 LFT | ☐ Sí ☐ No |
| B | SDI = SD × (1 + 15/365 + días de vacaciones según la antigüedad × 25 % / 365) | Arts. 84 y 89 LFT | ☐ Sí ☐ No |
| C | Aguinaldo = 15/365 × días trabajados en el año calendario × SD | Art. 87 LFT | ☐ Sí ☐ No |
| D | Vacaciones proporcionales = días que corresponden al año de servicio **en curso** / 365 × días desde el último aniversario × SD | Arts. 76 y 79 LFT | ☐ Sí ☐ No |
| E | Prima vacacional = 25 % de las vacaciones (proporcionales y pendientes) | Art. 80 LFT | ☐ Sí ☐ No |
| F | Indemnización = 90 días de **SDI** | Art. 123 CPEUM; Art. 48 LFT | ☐ Sí ☐ No |
| G | Prima de antigüedad = 12 días × **SD (cuota diaria)** topado a 2 salarios mínimos de la zona × años con fracción | Arts. 162, 485 y 486 LFT | ☐ SD ☐ SDI |
| H | Prima de antigüedad en renuncia solo con 15 años **cumplidos** o más | Art. 162 fr. III LFT | ☐ Sí ☐ No |
| I | 20 días de **SDI** por año con fracción, solo si el usuario indica el supuesto de los Arts. 49, 52 o 947 | Art. 50 fr. II LFT; registro 1008929 | ☐ Sí ☐ No |
| J | Antigüedad con fracción = (días entre fechas + 1) / 365 | — | ☐ Sí ☐ No |
| K | El finiquito (aguinaldo, vacaciones y prima vacacional) usa la **cuota diaria**; el SDI solo se usa en las indemnizaciones | Arts. 82, 84 y 89 LFT | ☐ Sí ☐ No |
| L | Con aguinaldo o prima superiores a la ley, el SDI calculado los integra; el SDI capturado por el usuario sustituye al calculado | Arts. 84 y 89 LFT | ☐ Sí ☐ No |

## Resultados

Montos en MXN. SD = salario diario; SDI = salario diario integrado.

| Caso | Escenario | Ingreso | Sueldo mensual | Zona | SD | SDI | Antigüedad (años) |
|---|---|---|---|---|---|---|---|
| C1 | Renuncia, 3 años | 01-06-2023 | $15,000 | General | 500.00 | 526.71 | 3.3781 |
| C2 | Renuncia, 16 años (procede prima, sin tope) | 01-03-2010 | $12,000 | General | 400.00 | 423.56 | 16.6384 |
| C3 | Despido injustificado, 6 años, salario sobre el tope | 15-01-2020 | $25,000 | General | 833.33 | 880.14 | 6.7562 |
| C4 | Despido con menos de 1 año; el patrón se niega a reinstalar (Art. 49 fr. I) | 01-02-2026 | $10,000 | General | 333.33 | 349.77 | 0.7041 |
| C5 | Despido, frontera norte, 10 años | 01-09-2016 | $30,000 | Frontera | 1,000.00 | 1,057.53 | 10.1288 |
| C6 | Despido, 32 años | 01-05-1994 | $20,000 | General | 666.67 | 707.76 | 32.4822 |
| C7 | Renuncia con 6 días de vacaciones pendientes de años anteriores | 10-01-2022 | $18,000 | General | 600.00 | 632.88 | 4.7671 |

| Caso | Aguinaldo | Vacaciones | Prima vacacional | Prima de antigüedad | 90 días | 20 días/año | **Total bruto** | ✔ Abogado |
|---|---|---|---|---|---|---|---|---|
| C1 | $5,917.81 (11.84 d) | $3,378.08 (6.76 d) | $844.52 | No procede | — | — | **$10,140.41** | ☐ |
| C2 | $4,734.25 | $6,524.93 (16.31 d) | $1,631.23 | $79,864.11 | — | — | **$92,754.52** | ☐ |
| C3 | $9,863.01 | $13,762.56 (16.52 d) | $3,440.64 | $51,083.09 (topada a $630.08) | $79,212.60 | — | **$157,361.90** | ☐ |
| C4 | $3,520.55 | $2,816.44 (8.45 d) | $704.11 | $2,816.44 | $31,479.30 | $4,925.53 | **$46,262.37** | ☐ |
| C5 | $11,835.62 | $2,958.90 (2.96 d) | $739.73 | $107,171.27 (topada a $881.74) | $95,177.70 | — | **$217,883.22** | ☐ |
| C6 | $7,890.41 | $9,205.48 (13.81 d) ⚠️ | $2,301.37 ⚠️ | $245,596.55 (topada a $630.08) | $63,698.40 ⚠️ | — | **$328,692.21** ⚠️ | ☐ |
| C7 | $7,101.37 | $12,772.60 (15.29 d prop. + 6 pend.) | $3,193.15 | No procede | — | — | **$23,067.12** | ☐ |

### Caso adicional: prestaciones superiores a la ley (C3 modificado)

Mismos datos que C3 (despido, 15-01-2020 a 15-10-2026, $25,000):

| Variante | SDI | Aguinaldo | Prima vacacional | 90 días |
|---|---|---|---|---|
| Ley (15 días, 25 %) | $880.14 | $9,863.01 | $3,440.64 | $79,212.60 |
| Contrato con 30 días de aguinaldo y 50 % de prima | $926.94 | $19,726.03 | $6,881.28 | $83,424.60 |
| SDI capturado de $1,000.00 (prestaciones de ley) | $1,000.00 | $9,863.01 | $3,440.64 | $90,000.00 |

### Observaciones conocidas

- **C6 tiene un error conocido (tarea L4):** en el año de servicio 33 corresponden 32 días de vacaciones (Art. 76), pero la lógica usa 30. Afecta las vacaciones, la prima vacacional y el SDI (por lo tanto, los 90 días). Se debe corregir antes de la revisión final.
- **C2 es el caso sensible al criterio G:** con el SDI ($423.56) en lugar del SD ($400.00), la prima de antigüedad sería de **$84,568.33** en lugar de $79,864.11.
- **C4:** con menos de un año, la prima de antigüedad es proporcional (0.7041 años). Hay que confirmar que proceda en despido con esta antigüedad (Art. 162 fr. III: "separados de su empleo, independientemente de la justificación o injustificación del despido").
- **Fuera de alcance por ahora:** ISR, salarios devengados, PTU y salarios vencidos (ver `TAREAS.md`).

## Firma de validación

| Abogado | Cédula profesional | Fecha | Observaciones |
|---|---|---|---|
| | | | |

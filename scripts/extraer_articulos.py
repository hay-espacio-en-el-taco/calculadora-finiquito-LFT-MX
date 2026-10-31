"""Extrae el texto oficial de los artículos que cita la calculadora.

Uso (requiere `pdftotext`, de poppler):
    python3 scripts/extraer_articulos.py ruta/LFT.pdf ruta/CPEUM.pdf

Los PDF se descargan de la Cámara de Diputados:
    https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf
    https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf

Genera src/data/articulos.json con el texto literal de cada artículo y sus notas de reforma.
Después de regenerarlo, revisa el diff: un cambio en el texto de un artículo puede requerir
actualizar los cálculos y docs/MARCO_LEGAL.md (ver AGENTS.md).
"""
import json
import re
import subprocess
import sys
from pathlib import Path

SALIDA = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'articulos.json'

# Artículos de la LFT que se muestran en la calculadora
ARTICULOS_LFT = ['48', '49', '50', '52', '76', '77', '78', '79', '80', '82', '84', '87', '89', '162', '485', '486']

ENCABEZADO = re.compile(
    r'^(\d+ de \d+|LEY FEDERAL DEL TRABAJO|CONSTITUCIÓN POLÍTICA DE LOS ESTADOS UNIDOS MEXICANOS'
    r'|CÁMARA DE DIPUTADOS DEL H\. CONGRESO DE LA UNIÓN|Última Reforma DOF .*|Secretaría General'
    r'|Secretaría de Servicios Parlamentarios)$'
)
NOTA_REFORMA = re.compile(
    r'^(?!Artículo \d+[\. ])(Artículo|Párrafo|Fracción|Inciso|Reforma|Denominación|Último|Apartado'
    r'|Primer|Segundo|Tercer|Fe de erratas)\b.*DOF \d{2}-\d{2}-\d{4}'
)
MARCADOR = re.compile(r'^([IVXL]+( Bis)?\.|[a-z]\))$')


def pdf_a_texto(ruta):
    return subprocess.run(['pdftotext', str(ruta), '-'], check=True, capture_output=True, text=True).stdout


def ultima_reforma(texto):
    return re.search(r'Última Reforma DOF (\d{2}-\d{2}-\d{4})', texto).group(1)


def armar_parrafos(lineas):
    """Une las líneas cortadas por el PDF en párrafos y separa las notas de reforma."""
    lineas = [linea.rstrip() for linea in lineas if not ENCABEZADO.match(linea.strip())]
    ancho = max((len(linea) for linea in lineas), default=100)
    parrafos, notas, actual, prefijo = [], [], '', ''

    def cerrar():
        nonlocal actual
        if actual:
            parrafos.append(actual.strip())
            actual = ''

    for linea in lineas:
        texto = linea.strip()
        if not texto:
            cerrar()
            continue
        if NOTA_REFORMA.match(texto):
            cerrar()
            notas.append(texto)
            continue
        if MARCADOR.match(texto):
            cerrar()
            prefijo = texto + ' '
            continue
        actual = actual + ' ' + texto if actual else prefijo + texto
        prefijo = ''
        # Una línea más corta que el ancho del PDF que termina en puntuación cierra el párrafo
        if len(linea) < ancho * 0.8 and texto[-1] in '.:;':
            cerrar()
    cerrar()
    return parrafos, notas


def articulo_lft(texto, numero):
    lineas = texto.split('\n')
    inicio = next(i for i, linea in enumerate(lineas) if re.match(rf'^Artículo {numero}\.-', linea))
    fin = next(
        i for i in range(inicio + 1, len(lineas))
        if re.match(r'^(Artículo \d+( Bis| Ter)?\.-|CAPITULO|CAPÍTULO|TITULO|TÍTULO)', lineas[i])
    )
    lineas[inicio] = re.sub(rf'^Artículo {numero}\.-\s*', '', lineas[inicio])
    return armar_parrafos(lineas[inicio:fin])


def fraccion_xxii_apartado_a(texto):
    lineas = texto.split('\n')
    art_123 = next(i for i, linea in enumerate(lineas) if linea.startswith('Artículo 123.'))
    inicio = next(i for i in range(art_123, len(lineas)) if lineas[i].strip() == 'XXII.')
    fin = next(i for i in range(inicio + 1, len(lineas)) if lineas[i].startswith('XXII Bis.'))
    return armar_parrafos(['XXII.'] + lineas[inicio + 1:fin])


def main(ruta_lft, ruta_cpeum):
    lft = pdf_a_texto(ruta_lft)
    cpeum = pdf_a_texto(ruta_cpeum)
    datos = {
        'fuentes': {
            'LFT': {
                'nombre': 'Ley Federal del Trabajo',
                'ultimaReforma': ultima_reforma(lft),
                'url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf',
            },
            'CPEUM': {
                'nombre': 'Constitución Política de los Estados Unidos Mexicanos',
                'ultimaReforma': ultima_reforma(cpeum),
                'url': 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf',
            },
        },
        'articulos': {},
    }
    for numero in ARTICULOS_LFT:
        parrafos, notas = articulo_lft(lft, numero)
        datos['articulos'][f'LFT-{numero}'] = {
            'ley': 'LFT', 'titulo': f'Artículo {numero}', 'parrafos': parrafos, 'reformas': notas,
        }
    parrafos, notas = fraccion_xxii_apartado_a(cpeum)
    datos['articulos']['CPEUM-123-A-XXII'] = {
        'ley': 'CPEUM', 'titulo': 'Artículo 123, Apartado A, fracción XXII', 'parrafos': parrafos, 'reformas': notas,
    }

    SALIDA.write_text(json.dumps(datos, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{len(datos["articulos"])} artículos → {SALIDA}')
    print(f'LFT: última reforma DOF {datos["fuentes"]["LFT"]["ultimaReforma"]}')
    print(f'CPEUM: última reforma DOF {datos["fuentes"]["CPEUM"]["ultimaReforma"]}')


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])

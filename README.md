# Bada Edifica

Soluciones profesionales de construcción en Barcelona. Un equipo, todos los oficios.

## Descripción

Sitio web corporativo de Bada Edifica, empresa de construcción y edificación con sede en Badalona, Barcelona. Ofrece servicios de electricidad, fontanería, construcción, reformas, limpieza post-obra y seguridad contra incendios.

## Tecnologías

- HTML5 semántico
- CSS3 con animaciones y efectos visuales
- JavaScript vanilla (sin frameworks)
- Fuente: Oswald (Google Fonts)
- Diseño responsive
- Bilingüe: Español (por defecto) e Inglés

## Estructura

```
/
├── index.html          # Página principal
├── about.html          # Sobre nosotros
├── services.html       # Servicios
├── projects.html       # Proyectos
├── contact.html        # Contacto + Mapa
├── career.html         # Carreras / Trabaja con nosotros
├── css/
│   └── styles.css  # Único archivo de estilos
├── js/
│   ├── translations.js    # Motor de traducciones ES/EN
│   └── main.js            # Animaciones, scroll, interactividad
├── public/
│   ├── images/             # Imágenes del sitio
│   └── logo/               # Logos (dark, white, favicon)
├── .htaccess           # Reglas Apache (URLs sin extensión, HTTPS, caché)
├── robots.txt          # Configuración SEO
├── llms.txt            # Contexto para LLMs
└── README.md
```

## Características

- **Diseño Moderno**: Blanco/negro con rojo (#ff0000) como acento principal
- **Animaciones**: Scroll reveal, parallax, ripple effect, cursor glow, progress bar
- **WhatsApp flotante**: Botón fijo con enlace directo a WhatsApp
- **Mapa interactivo**: Sección de mapa OpenStreetMap en la página de contacto
- **Traducciones**: Cambio de idioma sin recargar la página
- **Formulario**: Envío de datos por email a info@badaedifica.com
- **URLs limpias**: .htaccess elimina extensiones .html en producción

## Idiomas

- **ES** — Español (idioma por defecto)
- **EN** — Inglés

El cambio de idioma se guarda en `localStorage` y persiste entre visitas.

## Desarrollo Local

El sitio es estático — no requiere build ni dependencias. Abrir cualquier `.html` en el navegador.

Para servir localmente con las reglas de `.htaccess`:
```bash
python3 -m http.server 8000
```

## Contacto

- Teléfono: +34 935 593 581
- Email: info@badaedifica.com
- WhatsApp: +34 677 076 166
- Dirección: Carrer Alcalde Martínez Ecija 33, 08917 Badalona, Barcelona, Spain

# RTC — Real Time Controls

**Sitio informativo** de RTC, un sistema de gestión de órdenes de servicio técnico (asignación de técnicos en campo, seguimiento en tiempo real, cobros y garantías digitales), ya construido y en uso real por empresas de mantenimiento, refrigeración y climatización.

🔗 **Ver sitio en vivo:** _(agregar URL de Netlify aquí una vez desplegado, ej. `https://rtc-landing.netlify.app`)_

> **Nota:** este repositorio contiene únicamente el sitio público informativo/comercial de RTC — donde se explica qué es el producto y cómo funciona. El código de la plataforma real (panel administrativo, backend, lógica de negocio y datos de clientes) es privado y no forma parte de este repositorio.

---

## Vista previa

_(agregar aquí un screenshot o GIF del sitio una vez esté desplegado)_

## Sobre RTC

RTC nace para resolver un problema común en pequeñas y medianas empresas de servicios técnicos: la coordinación de órdenes de trabajo se maneja por WhatsApp, cuadernos o llamadas, sin trazabilidad ni garantía documentada para el cliente final.

Este sitio explica el flujo completo del producto — **registro del servicio → asignación de técnico → ejecución → pago y garantía** — a través de animaciones construidas 100% en SVG y CSS que ilustran cómo opera la plataforma real.

## Características de este sitio

- 🎨 Diseño oscuro, tipografía monoespaciada y acentos en teal/verde, orientado a un producto técnico/SaaS
- ✨ Animaciones nativas en SVG + CSS (sin librerías de animación) que ilustran cada paso del flujo del producto
- 📱 Totalmente responsive (menú móvil, grillas adaptables)
- 🖱️ Mockup ilustrativo del panel de órdenes en tiempo real, en el hero
- 📩 Formulario de contacto integrado con [EmailJS](https://www.emailjs.com/) (envío directo desde el navegador, sin backend)
- ⚡ Cero dependencias de build: HTML, CSS y JavaScript nativos

## Tecnologías

| Categoría   | Tecnología                                  |
|-------------|----------------------------------------------|
| Estructura  | HTML5 semántico                               |
| Estilos     | CSS3 (variables, Grid, Flexbox, animaciones SVG/CSS) |
| Interacción | JavaScript (ES6+, vanilla, sin frameworks)    |
| Formulario  | [EmailJS](https://www.emailjs.com/)           |
| Tipografía  | IBM Plex Sans / IBM Plex Mono (Google Fonts)  |
| Íconos      | Font Awesome (CDN)                            |
| Despliegue  | [Netlify](https://www.netlify.com/)           |

## Estructura del proyecto

```
rtc-landing/
├── index.html             # Estructura y contenido de la página
├── landing.css             # Estilos (variables, secciones, animaciones)
├── landing.js               # Comportamiento (mockup, formulario, scroll reveal)
├── netlify.toml             # Configuración de despliegue y headers para Netlify
└── assets/
    └── logo-rtc-nuevo.svg  # Isotipo del logo
```

## Cómo correrlo localmente

No requiere instalación de dependencias. Basta con clonar el repo y abrir el archivo, o levantar un servidor estático simple:

```bash
git clone https://github.com/<tu-usuario>/rtc-landing.git
cd rtc-landing
python3 -m http.server 8080
```

Y entrar a `http://localhost:8080`.

## Configurar el formulario de contacto (opcional)

El formulario usa EmailJS para enviar correos directamente desde el navegador. Para activarlo con tu propia cuenta:

1. Crea una cuenta gratuita en [emailjs.com](https://www.emailjs.com/) y un *Service* (por ejemplo, Gmail).
2. Crea un *Template* con las variables `{{nombre}}`, `{{empresa}}`, `{{ciudad}}`, `{{correo}}`, `{{mensaje}}`.
3. En `landing.js`, reemplaza los valores de `CONFIG.emailjs` con tu `serviceId`, `templateId` y `publicKey`.

> Por seguridad, este repositorio público no incluye credenciales reales.

## Despliegue en Netlify

El sitio es 100% estático (sin build), así que el despliegue en Netlify no requiere configuración adicional — ya incluye un [`netlify.toml`](./netlify.toml) con la publicación y los headers de seguridad/caché listos.

**Opción A — Desde la web de Netlify (recomendada):**

1. Entra a [app.netlify.com](https://app.netlify.com/) → **Add new site → Import an existing project**.
2. Conecta tu cuenta de GitHub y selecciona el repositorio `rtc-landing`.
3. Netlify detecta automáticamente el `netlify.toml`:
   - **Build command:** _(vacío)_
   - **Publish directory:** `.`
4. **Deploy site**. En 1-2 minutos queda publicado en una URL tipo `https://<nombre-random>.netlify.app`.
5. Opcional: en **Site configuration → Domain management**, cambia el subdominio (ej. `rtc-landing.netlify.app`) o conecta un dominio propio.

Cada `git push` a `main` vuelve a desplegar el sitio automáticamente.

**Opción B — Desde la terminal (Netlify CLI):**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Autor

**Marisol** — Desarrolladora y Diseñadora
Tecnóloga en Análisis y Desarrollo de Software (ADSO), SENA — Montería, Colombia

## Licencia

Este sitio informativo está bajo la licencia MIT (ver [LICENSE](./LICENSE)). El producto RTC y su código fuente real no están cubiertos por esta licencia y permanecen privados.

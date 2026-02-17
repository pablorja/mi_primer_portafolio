# Freelancer Portafolio - Pablo Santamaría

Portafolio web profesional responsivo de **Pablo Santamaría**, desarrollador web y freelancer especializado en diseño y desarrollo de sitios web modernos.

## 🚀 Características

- ✨ **Diseño Moderno**: Interfaz con tema oscuro y animaciones suaves.
- 📱 **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorio (Mobile-First).
- 💼 **Gestión de Proyectos**: Carga dinámica de proyectos desde API/JSON.
- 📧 **Formulario de Contacto**: Integrado con backend y base de datos SQLite.
- 🛠️ **Panel de Administración**: Visualización de contactos recibidos.
- 🔍 **SEO Optimizado**: Estructura semántica para mejor posicionamiento.

## 📂 Estructura del Proyecto

```
freelancer-portafolio/
├── index.html          # Página principal
├── proyectos.html      # Portafolio completo detallado
├── admin.html          # Panel de administración de contactos
├── server.js           # Servidor backend (Node.js + Express)
├── CSS/                # Estilos (SASS/CSS)
├── JS/                 # Lógica del frontend (Vanilla JS)
├── data/               # Datos (proyectos en JSON)
├── docs/               # Documentación detallada
├── IMG/                # Imágenes y recursos visuales
└── PROYECTS/           # Páginas estáticas de proyectos individuales
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5 & CSS3** - Estructura y estilos modernos.
- **JavaScript (ES6+)** - Interactividad y consumo de APIs.
- **Bootstrap 5.3** - Framework CSS para diseño responsivo.
- **Bootstrap Icons** - Iconografía vectorial.

### Backend
- **Node.js & Express** - Servidor web y API REST.
- **SQLite3** - Base de datos ligera para almacenamiento de contactos.
- **CORS & Body-parser** - Middlewares para manejo de peticiones.

## 🚀 Instalación y Configuración

### Requisitos Previos
- [Node.js](https://nodejs.org/) instalado.

### Pasos para Ejecutar Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/pablorja/mi_primer_portafolio.git
   cd mi_primer_portafolio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```

4. **Ver el sitio:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📈 API Endpoints

El backend ofrece los siguientes endpoints:

- `GET /api/projects`: Obtiene la lista de proyectos.
- `POST /api/contacto`: Guarda un nuevo mensaje de contacto.
- `GET /api/contactos`: Obtiene todos los mensajes (usado en el panel admin).

## 📝 Documentación Adicional

Puedes encontrar guías detalladas sobre despliegue y configuración en la carpeta `docs/`:
- [Documentación Técnica](docs/DOCUMENTACION_TECNICA.md)
- [Guía de Despliegue en Netlify](docs/DEPLOY_NETLIFY.md)
- [Configuración de Base de Datos](docs/README_BASE_DATOS.md)

---
**Desarrollador**: Pablo Santamaría  
**Última actualización**: Noviembre 2025

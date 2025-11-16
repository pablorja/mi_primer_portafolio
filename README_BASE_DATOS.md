# Sistema de Base de Datos para Contactos

## 📋 Descripción
Sistema simple de base de datos SQLite para guardar los datos de clientes potenciales que llenan el formulario de contacto.

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

## ▶️ Uso

1. Iniciar el servidor:
```bash
npm start
```

2. El servidor estará disponible en: `http://localhost:3000`

3. Abrir `index.html` en el navegador para usar el formulario

4. Abrir `admin.html` para ver todos los contactos guardados

## 📊 Estructura de la Base de Datos

**Tabla: contactos**
- `id` - INTEGER (Primary Key, Auto-increment)
- `nombre` - TEXT (Nombre del cliente)
- `email` - TEXT (Correo electrónico)
- `numero` - TEXT (Número de teléfono)
- `mensaje` - TEXT (Mensaje del cliente)
- `fecha_registro` - DATETIME (Fecha y hora del registro)

## 🔌 API Endpoints

### POST /api/contacto
Guarda un nuevo contacto
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "numero": "3001234567",
  "message": "Necesito información sobre sus servicios"
}
```

### GET /api/contactos
Obtiene todos los contactos

### GET /api/contacto/:id
Obtiene un contacto específico por ID

## 📁 Archivos Creados

- `server.js` - Servidor backend con Express
- `package.json` - Dependencias del proyecto
- `JS/contacto.js` - Script para manejar el formulario
- `admin.html` - Panel para ver contactos
- `contactos.db` - Base de datos SQLite (se crea automáticamente)

## 💡 Características

✅ Base de datos SQLite (no requiere instalación adicional)
✅ API REST para guardar y consultar contactos
✅ Panel de administración para ver contactos
✅ Validación de campos requeridos
✅ Timestamps automáticos
✅ Interfaz responsive con Bootstrap

## 🔧 Desarrollo

Para desarrollo con auto-reload:
```bash
npm run dev
```

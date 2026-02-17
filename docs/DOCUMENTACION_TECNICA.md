# 📚 DOCUMENTACIÓN TÉCNICA - SISTEMA DE CONTACTOS

## 📋 Índice
1. [Arquitectura del Sistema](#arquitectura)
2. [Base de Datos](#base-de-datos)
3. [Backend (server.js)](#backend)
4. [Frontend](#frontend)
5. [Flujo de Datos](#flujo-de-datos)
6. [Instalación y Uso](#instalacion)

---

## 🏗️ Arquitectura del Sistema {#arquitectura}

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA DEL SISTEMA                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   FRONTEND   │ ◄────► │   BACKEND    │ ◄────► │  BASE DATOS  │
│              │  HTTP   │              │  SQL    │              │
│  index.html  │         │  server.js   │         │ contactos.db │
│  admin.html  │         │  Express.js  │         │   SQLite     │
│ contacto.js  │         │              │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
```

### Componentes:

**FRONTEND:**
- `index.html` - Página principal con formulario de contacto
- `admin.html` - Panel de administración para ver contactos
- `JS/contacto.js` - Lógica del formulario

**BACKEND:**
- `server.js` - Servidor Node.js con Express
- API REST con 3 endpoints

**BASE DE DATOS:**
- `contactos.db` - Base de datos SQLite
- Tabla: `contactos`

---

## 🗄️ Base de Datos {#base-de-datos}

### Tecnología: SQLite

**¿Por qué SQLite?**
- ✅ No requiere instalación de servidor
- ✅ Base de datos en un solo archivo
- ✅ Perfecta para aplicaciones pequeñas/medianas
- ✅ Fácil de respaldar (copiar archivo)
- ✅ Sin configuración compleja

### Estructura de la Tabla

```sql
CREATE TABLE contactos (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre          TEXT NOT NULL,
  email           TEXT NOT NULL,
  numero          TEXT NOT NULL,
  mensaje         TEXT NOT NULL,
  fecha_registro  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Descripción de Campos:

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| `id` | INTEGER | Identificador único | PRIMARY KEY, AUTOINCREMENT |
| `nombre` | TEXT | Nombre del cliente | NOT NULL |
| `email` | TEXT | Correo electrónico | NOT NULL |
| `numero` | TEXT | Teléfono de contacto | NOT NULL |
| `mensaje` | TEXT | Mensaje del cliente | NOT NULL |
| `fecha_registro` | DATETIME | Fecha/hora de registro | DEFAULT CURRENT_TIMESTAMP |

### Ejemplo de Registro:

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "numero": "3001234567",
  "mensaje": "Necesito información sobre sus servicios",
  "fecha_registro": "2025-11-15 10:30:00"
}
```

---

## ⚙️ Backend (server.js) {#backend}

### Tecnologías Utilizadas:

```javascript
const express = require('express');        // Framework web
const sqlite3 = require('sqlite3');        // Base de datos
const cors = require('cors');              // CORS
const bodyParser = require('body-parser'); // Parser de datos
```

### Middleware Configurado:

1. **CORS** - Permite peticiones desde diferentes orígenes
2. **Body Parser JSON** - Lee datos JSON del body
3. **Body Parser URL Encoded** - Lee datos de formularios
4. **Static Files** - Sirve archivos HTML, CSS, JS

### API REST Endpoints:

#### 1. POST /api/contacto
**Guardar nuevo contacto**

```javascript
// REQUEST
POST http://localhost:3000/api/contacto
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "numero": "3001234567",
  "message": "Necesito información"
}

// RESPONSE (Éxito)
{
  "success": true,
  "message": "Contacto guardado exitosamente",
  "id": 1
}

// RESPONSE (Error)
{
  "success": false,
  "message": "Todos los campos son requeridos"
}
```

**Validaciones:**
- ✅ Todos los campos son obligatorios
- ✅ Prevención de SQL Injection (prepared statements)
- ✅ Manejo de errores de base de datos

#### 2. GET /api/contactos
**Obtener todos los contactos**

```javascript
// REQUEST
GET http://localhost:3000/api/contactos

// RESPONSE
{
  "success": true,
  "contactos": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "numero": "3001234567",
      "mensaje": "Necesito información",
      "fecha_registro": "2025-11-15 10:30:00"
    },
    ...
  ]
}
```

**Características:**
- ✅ Ordenados por fecha (más reciente primero)
- ✅ Retorna array vacío si no hay contactos

#### 3. GET /api/contacto/:id
**Obtener contacto por ID**

```javascript
// REQUEST
GET http://localhost:3000/api/contacto/1

// RESPONSE (Encontrado)
{
  "success": true,
  "contacto": {
    "id": 1,
    "nombre": "Juan Pérez",
    ...
  }
}

// RESPONSE (No encontrado)
{
  "success": false,
  "message": "Contacto no encontrado"
}
```

### Ciclo de Vida del Servidor:

```
1. INICIO
   ├─ Conectar a base de datos
   ├─ Crear tabla si no existe
   └─ Iniciar servidor en puerto 3000

2. OPERACIÓN
   ├─ Escuchar peticiones HTTP
   ├─ Procesar endpoints
   └─ Responder con JSON

3. CIERRE (Ctrl+C)
   ├─ Cerrar conexión a base de datos
   └─ Terminar proceso limpiamente
```

---

## 🎨 Frontend {#frontend}

### 1. Formulario de Contacto (index.html)

**Campos del formulario:**
```html
<input id="name" type="text" required>
<input id="email" type="email" required>
<input id="numero" type="number" required>
<textarea id="message" required></textarea>
```

### 2. Script del Formulario (JS/contacto.js)

**Flujo de ejecución:**

```
1. Usuario llena formulario
   ↓
2. Usuario hace clic en "Enviar"
   ↓
3. Evento 'submit' capturado
   ↓
4. preventDefault() - Evita recarga de página
   ↓
5. Recopilar datos del formulario
   ↓
6. Enviar petición POST a /api/contacto
   ↓
7. Esperar respuesta del servidor
   ↓
8. Mostrar mensaje de éxito/error
   ↓
9. Limpiar formulario (si éxito)
```

**Código simplificado:**
```javascript
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    numero: document.getElementById('numero').value,
    message: document.getElementById('message').value
  };
  
  const response = await fetch('http://localhost:3000/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (data.success) {
    alert('¡Mensaje enviado!');
    formulario.reset();
  }
});
```

### 3. Panel de Administración (admin.html)

**Funcionalidades:**
- ✅ Carga automática al abrir la página
- ✅ Botón de actualización manual
- ✅ Tabla responsive con Bootstrap
- ✅ Links mailto: y tel: para contacto rápido
- ✅ Truncado de mensajes largos
- ✅ Formato de fecha localizado

**Estados de la interfaz:**
1. **Cargando** - Muestra spinner
2. **Con datos** - Muestra tabla
3. **Sin datos** - Muestra mensaje informativo
4. **Error** - Muestra alerta

---

## 🔄 Flujo de Datos {#flujo-de-datos}

### Guardar Contacto:

```
┌─────────────┐
│   USUARIO   │
│ Llena form  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  JS/contacto.js     │
│ Captura datos       │
│ Valida campos       │
└──────┬──────────────┘
       │ POST /api/contacto
       │ { name, email, numero, message }
       ▼
┌─────────────────────┐
│   server.js         │
│ Valida datos        │
│ Ejecuta INSERT      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  contactos.db       │
│ Guarda registro     │
│ Retorna ID          │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   RESPUESTA         │
│ { success, id }     │
└─────────────────────┘
```

### Ver Contactos:

```
┌─────────────┐
│   USUARIO   │
│ Abre admin  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  admin.html         │
│ Ejecuta función     │
│ cargarContactos()   │
└──────┬──────────────┘
       │ GET /api/contactos
       ▼
┌─────────────────────┐
│   server.js         │
│ Ejecuta SELECT      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  contactos.db       │
│ Retorna registros   │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   admin.html        │
│ Renderiza tabla     │
└─────────────────────┘
```

---

## 🚀 Instalación y Uso {#instalacion}

### Requisitos Previos:
- Node.js (v14 o superior)
- npm (incluido con Node.js)

### Instalación:

```bash
# 1. Instalar dependencias
npm install

# Esto instalará:
# - express: Framework web
# - sqlite3: Base de datos
# - cors: Manejo de CORS
# - body-parser: Parser de datos
# - nodemon: Auto-reload (dev)
```

### Uso:

```bash
# Iniciar servidor (producción)
npm start

# Iniciar servidor (desarrollo con auto-reload)
npm run dev
```

### Acceder a la aplicación:

```
Formulario de contacto:
http://localhost:3000/index.html

Panel de administración:
http://localhost:3000/admin.html
```

### Detener servidor:

```bash
# Presionar Ctrl+C en la terminal
```

---

## 🔒 Seguridad

### Medidas implementadas:

1. **Prepared Statements** - Previene SQL Injection
   ```javascript
   db.run(sql, [name, email, numero, message], ...)
   ```

2. **Validación de campos** - Verifica datos requeridos
   ```javascript
   if (!name || !email || !numero || !message) {
     return res.status(400).json({ ... });
   }
   ```

3. **CORS configurado** - Controla acceso desde otros dominios

4. **Manejo de errores** - No expone información sensible

### Recomendaciones adicionales:

- 🔐 Agregar autenticación para admin.html
- 🔐 Validar formato de email y teléfono
- 🔐 Limitar tasa de peticiones (rate limiting)
- 🔐 Sanitizar inputs para prevenir XSS
- 🔐 Usar HTTPS en producción

---

## 📦 Archivos del Proyecto

```
proyecto/
├── server.js              # Servidor backend
├── package.json           # Dependencias
├── contactos.db          # Base de datos (se crea automáticamente)
├── .gitignore            # Archivos ignorados por Git
├── index.html            # Página principal
├── admin.html            # Panel de administración
├── JS/
│   └── contacto.js       # Script del formulario
├── CSS/
│   └── styles.css        # Estilos personalizados
└── README_BASE_DATOS.md  # Documentación básica
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
# Solución: Instalar dependencias
npm install
```

### Error: "EADDRINUSE: address already in use"
```bash
# Solución: Puerto 3000 ocupado
# Cambiar PORT en server.js o cerrar proceso:
# Windows: netstat -ano | findstr :3000
# Linux/Mac: lsof -ti:3000 | xargs kill
```

### Error: "CORS policy"
```bash
# Solución: Verificar que CORS esté habilitado en server.js
app.use(cors());
```

### Base de datos no se crea
```bash
# Solución: Verificar permisos de escritura en carpeta
# La base de datos se crea automáticamente al iniciar
```

---

## 📈 Mejoras Futuras

- [ ] Paginación de contactos
- [ ] Búsqueda y filtros
- [ ] Exportar contactos a CSV/Excel
- [ ] Envío de emails automáticos
- [ ] Dashboard con estadísticas
- [ ] Autenticación de administrador
- [ ] Validación avanzada de campos
- [ ] Respaldo automático de base de datos
- [ ] API de eliminación de contactos
- [ ] Edición de contactos existentes

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar esta documentación
2. Verificar logs del servidor
3. Revisar consola del navegador (F12)

---

**Última actualización:** 15 de Noviembre, 2025

/**
 * ============================================
 * SERVIDOR BACKEND PARA SISTEMA DE CONTACTOS
 * ============================================
 * 
 * Este servidor maneja:
 * - Conexión con base de datos SQLite
 * - API REST para guardar y consultar contactos
 * - Servir archivos estáticos (HTML, CSS, JS)
 * 
 * Tecnologías:
 * - Express: Framework web para Node.js
 * - SQLite3: Base de datos ligera sin servidor
 * - CORS: Permite peticiones desde diferentes orígenes
 * - Body-Parser: Procesa datos JSON y formularios
 */

// ============================================
// IMPORTACIÓN DE MÓDULOS
// ============================================
const express = require('express');        // Framework web
const sqlite3 = require('sqlite3').verbose(); // Base de datos SQLite
const cors = require('cors');              // Manejo de CORS
const bodyParser = require('body-parser'); // Parser de datos
const path = require('path');              // Manejo de rutas
const fs = require('fs');                  // Manejo de archivos

// ============================================
// CONFIGURACIÓN INICIAL
// ============================================
const app = express();           // Crear aplicación Express
const PORT = 3000;               // Puerto donde correrá el servidor

// ============================================
// MIDDLEWARE - Configuración de Express
// ============================================
// CORS: Permite que el frontend haga peticiones al backend
app.use(cors());

// Body Parser: Permite leer datos JSON del body de las peticiones
app.use(bodyParser.json());

// Body Parser: Permite leer datos de formularios HTML
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(__dirname));

// ============================================
// CONEXIÓN A BASE DE DATOS
// ============================================
/**
 * Crea o conecta con la base de datos SQLite
 * 
 * Archivo: contactos.db
 * - Si no existe, se crea automáticamente
 * - Si existe, se conecta a ella
 * 
 * SQLite es una base de datos:
 * - Sin servidor (no requiere instalación adicional)
 * - Almacenada en un solo archivo
 * - Perfecta para aplicaciones pequeñas y medianas
 */
const db = new sqlite3.Database('./contactos.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
    crearTabla(); // Crear tabla si no existe
  }
});

// ============================================
// CREACIÓN DE TABLA EN BASE DE DATOS
// ============================================
/**
 * Crea la tabla 'contactos' si no existe
 * 
 * ESTRUCTURA DE LA TABLA:
 * ┌─────────────────┬──────────┬─────────────────────────────────┐
 * │ Campo           │ Tipo     │ Descripción                     │
 * ├─────────────────┼──────────┼─────────────────────────────────┤
 * │ id              │ INTEGER  │ ID único, auto-incrementable    │
 * │ nombre          │ TEXT     │ Nombre del cliente              │
 * │ email           │ TEXT     │ Correo electrónico              │
 * │ numero          │ TEXT     │ Número de teléfono              │
 * │ mensaje         │ TEXT     │ Mensaje del cliente             │
 * │ fecha_registro  │ DATETIME │ Fecha/hora automática           │
 * └─────────────────┴──────────┴─────────────────────────────────┘
 * 
 * PRIMARY KEY: Identifica de forma única cada registro
 * AUTOINCREMENT: El ID se incrementa automáticamente
 * NOT NULL: Campo obligatorio
 * DEFAULT CURRENT_TIMESTAMP: Se guarda la fecha/hora actual automáticamente
 */
function crearTabla() {
  const sql = `
    CREATE TABLE IF NOT EXISTS contactos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      numero TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.run(sql, (err) => {
    if (err) {
      console.error('❌ Error al crear tabla:', err);
    } else {
      console.log('✅ Tabla contactos lista');
    }
  });
}

// ============================================
// API ENDPOINTS - RUTAS DEL SERVIDOR
// ============================================

/**
 * POST /api/contacto
 * ==================
 * Guarda un nuevo contacto en la base de datos
 * 
 * MÉTODO: POST
 * URL: http://localhost:3000/api/contacto
 * 
 * BODY (JSON):
 * {
 *   "name": "Juan Pérez",
 *   "email": "juan@example.com",
 *   "numero": "3001234567",
 *   "message": "Necesito información"
 * }
 * 
 * RESPUESTA EXITOSA (200):
 * {
 *   "success": true,
 *   "message": "Contacto guardado exitosamente",
 *   "id": 1
 * }
 * 
 * RESPUESTA ERROR (400/500):
 * {
 *   "success": false,
 *   "message": "Descripción del error"
 * }
 */
app.post('/api/contacto', (req, res) => {
  // Extraer datos del body de la petición
  const { name, email, numero, message } = req.body;
  
  // VALIDACIÓN: Verificar que todos los campos estén presentes
  if (!name || !email || !numero || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }
  
  // SQL: Insertar nuevo registro en la tabla
  // Los '?' son placeholders que previenen SQL Injection
  const sql = `INSERT INTO contactos (nombre, email, numero, mensaje) VALUES (?, ?, ?, ?)`;
  
  // Ejecutar query de inserción
  db.run(sql, [name, email, numero, message], function(err) {
    if (err) {
      console.error('❌ Error al guardar contacto:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al guardar el contacto' 
      });
    }
    
    // Respuesta exitosa con el ID del nuevo registro
    console.log(`✅ Nuevo contacto guardado - ID: ${this.lastID}`);
    res.json({ 
      success: true, 
      message: 'Contacto guardado exitosamente',
      id: this.lastID  // ID del registro insertado
    });
  });
});

/**
 * GET /api/projects
 * ==================
 * Obtiene todos los proyectos del archivo JSON
 *
 * MÉTODO: GET
 * URL: http://localhost:3000/api/projects
 *
 * RESPUESTA EXITOSA (200):
 * {
 *   "success": true,
 *   "proyectos": [ ... ]
 * }
 */
app.get('/api/projects', (req, res) => {
  const projectsPath = path.join(__dirname, 'data', 'projects.json');

  fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error al leer proyectos:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener proyectos'
      });
    }

    try {
      const projects = JSON.parse(data);
      res.json({
        success: true,
        proyectos: projects
      });
    } catch (parseErr) {
      console.error('❌ Error al parsear proyectos:', parseErr);
      res.status(500).json({
        success: false,
        message: 'Error al procesar datos de proyectos'
      });
    }
  });
});

/**
 * GET /api/contactos
 * ==================
 * Obtiene todos los contactos de la base de datos
 * 
 * MÉTODO: GET
 * URL: http://localhost:3000/api/contactos
 * 
 * RESPUESTA EXITOSA (200):
 * {
 *   "success": true,
 *   "contactos": [
 *     {
 *       "id": 1,
 *       "nombre": "Juan Pérez",
 *       "email": "juan@example.com",
 *       "numero": "3001234567",
 *       "mensaje": "Necesito información",
 *       "fecha_registro": "2025-11-15 10:30:00"
 *     },
 *     ...
 *   ]
 * }
 * 
 * Los contactos se ordenan del más reciente al más antiguo
 */
app.get('/api/contactos', (req, res) => {
  // SQL: Seleccionar todos los registros ordenados por fecha descendente
  const sql = `SELECT * FROM contactos ORDER BY fecha_registro DESC`;
  
  // db.all() obtiene todos los registros que coincidan
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('❌ Error al obtener contactos:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al obtener contactos' 
      });
    }
    
    console.log(`✅ Consultados ${rows.length} contactos`);
    res.json({ 
      success: true, 
      contactos: rows  // Array con todos los contactos
    });
  });
});

/**
 * GET /api/contacto/:id
 * =====================
 * Obtiene un contacto específico por su ID
 * 
 * MÉTODO: GET
 * URL: http://localhost:3000/api/contacto/1
 * 
 * PARÁMETROS:
 * - id: ID del contacto a buscar (en la URL)
 * 
 * RESPUESTA EXITOSA (200):
 * {
 *   "success": true,
 *   "contacto": {
 *     "id": 1,
 *     "nombre": "Juan Pérez",
 *     "email": "juan@example.com",
 *     "numero": "3001234567",
 *     "mensaje": "Necesito información",
 *     "fecha_registro": "2025-11-15 10:30:00"
 *   }
 * }
 * 
 * RESPUESTA NO ENCONTRADO (404):
 * {
 *   "success": false,
 *   "message": "Contacto no encontrado"
 * }
 */
app.get('/api/contacto/:id', (req, res) => {
  // SQL: Buscar contacto por ID
  const sql = `SELECT * FROM contactos WHERE id = ?`;
  
  // db.get() obtiene solo un registro
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener contacto:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error al obtener contacto' 
      });
    }
    
    // Verificar si se encontró el contacto
    if (!row) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contacto no encontrado' 
      });
    }
    
    console.log(`✅ Contacto encontrado - ID: ${req.params.id}`);
    res.json({ 
      success: true, 
      contacto: row  // Objeto con los datos del contacto
    });
  });
});

// ============================================
// MANEJO DE ERRORES
// ============================================
/**
 * Manejo de rutas no encontradas para la API
 */
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint de API no encontrado'
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
/**
 * Inicia el servidor Express en el puerto especificado
 * 
 * Una vez iniciado, el servidor estará disponible en:
 * http://localhost:3000
 * 
 * Endpoints disponibles:
 * - POST   /api/contacto      - Guardar nuevo contacto
 * - GET    /api/contactos     - Obtener todos los contactos
 * - GET    /api/contacto/:id  - Obtener contacto por ID
 */
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🚀 SERVIDOR INICIADO EXITOSAMENTE   ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log('');
  console.log('📡 Endpoints disponibles:');
  console.log(`   POST   http://localhost:${PORT}/api/contacto`);
  console.log(`   GET    http://localhost:${PORT}/api/contactos`);
  console.log(`   GET    http://localhost:${PORT}/api/contacto/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/projects`);
  console.log('');
  console.log('📄 Páginas disponibles:');
  console.log(`   http://localhost:${PORT}/index.html`);
  console.log(`   http://localhost:${PORT}/admin.html`);
  console.log('');
  console.log('⏹️  Presiona Ctrl+C para detener el servidor');
  console.log('');
});

// ============================================
// CIERRE LIMPIO DEL SERVIDOR
// ============================================
/**
 * Maneja el cierre del servidor (Ctrl+C)
 * 
 * Asegura que:
 * 1. La conexión a la base de datos se cierre correctamente
 * 2. No queden procesos colgados
 * 3. Los datos se guarden antes de cerrar
 * 
 * SIGINT: Señal de interrupción (Ctrl+C en terminal)
 */
process.on('SIGINT', () => {
  console.log('');
  console.log('⏹️  Cerrando servidor...');
  
  db.close((err) => {
    if (err) {
      console.error('❌ Error al cerrar base de datos:', err);
    } else {
      console.log('✅ Base de datos cerrada correctamente');
    }
    console.log('👋 Servidor detenido');
    process.exit(0);
  });
});

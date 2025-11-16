/**
 * ============================================
 * NETLIFY FUNCTION: GUARDAR CONTACTO
 * ============================================
 * 
 * Esta función serverless guarda contactos en un archivo JSON
 * ya que Netlify Functions no soporta SQLite persistente
 */

const fs = require('fs');
const path = require('path');

// Ruta al archivo de datos
const DATA_FILE = path.join('/tmp', 'contactos.json');

// Leer contactos existentes
function leerContactos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al leer contactos:', error);
  }
  return [];
}

// Guardar contactos
function guardarContactos(contactos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2));
    return true;
  } catch (error) {
    console.error('Error al guardar contactos:', error);
    return false;
  }
}

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Método no permitido' 
      })
    };
  }

  try {
    // Parsear datos del body
    const { name, email, numero, message } = JSON.parse(event.body);

    // Validar campos requeridos
    if (!name || !email || !numero || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Todos los campos son requeridos' 
        })
      };
    }

    // Leer contactos existentes
    const contactos = leerContactos();

    // Crear nuevo contacto
    const nuevoContacto = {
      id: contactos.length + 1,
      nombre: name,
      email: email,
      numero: numero,
      mensaje: message,
      fecha_registro: new Date().toISOString()
    };

    // Agregar a la lista
    contactos.push(nuevoContacto);

    // Guardar
    if (guardarContactos(contactos)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Contacto guardado exitosamente',
          id: nuevoContacto.id
        })
      };
    } else {
      throw new Error('Error al guardar el contacto');
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Error al procesar la solicitud: ' + error.message
      })
    };
  }
};

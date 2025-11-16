/**
 * ============================================
 * NETLIFY FUNCTION: OBTENER CONTACTOS
 * ============================================
 * 
 * Esta función serverless obtiene todos los contactos
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

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Solo permitir GET
  if (event.httpMethod !== 'GET') {
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
    // Leer contactos
    const contactos = leerContactos();

    // Ordenar por fecha descendente (más reciente primero)
    contactos.sort((a, b) => {
      return new Date(b.fecha_registro) - new Date(a.fecha_registro);
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        contactos: contactos
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Error al obtener contactos: ' + error.message
      })
    };
  }
};

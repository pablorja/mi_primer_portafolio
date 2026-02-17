const http = require('http');

/**
 * Script de prueba básico para la API del Portafolio
 */

async function testEndpoint(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Iniciando pruebas de API...');

  try {
    // 1. Prueba GET /api/projects
    const projects = await testEndpoint('/api/projects');
    if (projects.status === 200 && projects.data.success) {
      console.log('✅ GET /api/projects: Pasó');
    } else {
      console.error('❌ GET /api/projects: Falló', projects);
    }

    // 2. Prueba POST /api/contacto
    const contacto = await testEndpoint('/api/contacto', 'POST', {
      name: 'Usuario de Prueba',
      email: 'prueba@example.com',
      numero: '123456789',
      message: 'Este es un mensaje de prueba'
    });
    if (contacto.status === 200 && contacto.data.success) {
      console.log('✅ POST /api/contacto: Pasó');
    } else {
      console.error('❌ POST /api/contacto: Falló', contacto);
    }

    // 3. Prueba GET /api/contactos
    const contactos = await testEndpoint('/api/contactos');
    if (contactos.status === 200 && contactos.data.success && Array.isArray(contactos.data.contactos)) {
      console.log('✅ GET /api/contactos: Pasó');
    } else {
      console.error('❌ GET /api/contactos: Falló', contactos);
    }

    // 4. Prueba 404
    const notFound = await testEndpoint('/api/no-existe');
    if (notFound.status === 404 && !notFound.data.success) {
      console.log('✅ Prueba 404 API: Pasó');
    } else {
      console.error('❌ Prueba 404 API: Falló', notFound);
    }

  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
    console.log('\n💡 Sugerencia: Asegúrate de que el servidor esté corriendo.');
    console.log('   Puedes iniciarlo en otra terminal con: npm start');
  }
}

runTests();

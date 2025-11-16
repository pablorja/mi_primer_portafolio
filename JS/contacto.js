/**
 * ============================================
 * SCRIPT DE MANEJO DEL FORMULARIO DE CONTACTO
 * ============================================
 * 
 * Este script:
 * 1. Captura el evento de envío del formulario
 * 2. Previene el comportamiento por defecto (recarga de página)
 * 3. Obtiene los datos del formulario
 * 4. Envía los datos al servidor mediante fetch API
 * 5. Muestra mensaje de éxito o error
 * 6. Limpia el formulario si fue exitoso
 * 
 * TECNOLOGÍAS:
 * - Vanilla JavaScript (sin librerías)
 * - Fetch API (peticiones HTTP asíncronas)
 * - Async/Await (manejo de promesas)
 * - DOM API (manipulación del HTML)
 */

// ============================================
// ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
// ============================================
/**
 * DOMContentLoaded se dispara cuando el HTML está completamente
 * cargado y parseado, sin esperar a que se carguen imágenes o estilos
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // OBTENER REFERENCIA AL FORMULARIO
  // ============================================
  /**
   * Busca el formulario en el DOM usando la clase '.formulario'
   * Esta clase está definida en index.html
   */
  const formulario = document.querySelector('.formulario');
  
  // Verificar que el formulario existe en la página
  if (formulario) {
    
    // ============================================
    // EVENTO: ENVÍO DEL FORMULARIO
    // ============================================
    /**
     * Escucha el evento 'submit' del formulario
     * Se dispara cuando el usuario hace clic en "Enviar"
     * o presiona Enter en un campo del formulario
     */
    formulario.addEventListener('submit', async (e) => {
      
      // ============================================
      // PREVENIR COMPORTAMIENTO POR DEFECTO
      // ============================================
      /**
       * preventDefault() evita que el formulario se envíe
       * de la forma tradicional (recargando la página)
       * 
       * Esto nos permite manejar el envío con JavaScript
       * y hacer una petición AJAX sin recargar la página
       */
      e.preventDefault();
      
      // ============================================
      // RECOPILAR DATOS DEL FORMULARIO
      // ============================================
      /**
       * Obtiene los valores de cada campo del formulario
       * usando getElementById() para acceder a cada input
       * 
       * Los IDs corresponden a los definidos en index.html:
       * - name: Nombre del cliente
       * - email: Correo electrónico
       * - numero: Número de teléfono
       * - message: Mensaje del cliente
       */
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        numero: document.getElementById('numero').value,
        message: document.getElementById('message').value
      };
      
      // ============================================
      // ENVIAR DATOS AL SERVIDOR
      // ============================================
      /**
       * try-catch: Maneja errores que puedan ocurrir
       * durante la petición HTTP
       */
      try {
        
        /**
         * FETCH API: Realiza una petición HTTP al servidor
         * 
         * URL: /api/contacto (relativa, funciona en localhost y producción)
         * MÉTODO: POST (para crear un nuevo recurso)
         * 
         * HEADERS:
         * - Content-Type: Indica que enviamos datos en formato JSON
         * 
         * BODY:
         * - JSON.stringify(): Convierte el objeto JavaScript a JSON
         * - El servidor recibirá estos datos en req.body
         */
        const response = await fetch('/api/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        /**
         * PROCESAR RESPUESTA DEL SERVIDOR
         * 
         * response.json(): Convierte la respuesta JSON a objeto JavaScript
         * await: Espera a que la conversión termine
         */
        const data = await response.json();
        
        // ============================================
        // MANEJAR RESPUESTA
        // ============================================
        /**
         * Verificar si la operación fue exitosa
         * El servidor responde con { success: true/false }
         */
        if (data.success) {
          // ✅ ÉXITO: Mostrar mensaje de confirmación
          alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente.');
          
          /**
           * LIMPIAR FORMULARIO
           * reset(): Borra todos los campos del formulario
           * y los devuelve a sus valores por defecto
           */
          formulario.reset();
        } else {
          // ❌ ERROR DEL SERVIDOR: Mostrar mensaje de error
          alert('Error: ' + data.message);
        }
        
      } catch (error) {
        // ============================================
        // MANEJAR ERRORES DE RED O SERVIDOR
        // ============================================
        /**
         * Este bloque se ejecuta si:
         * - No hay conexión a internet
         * - El servidor no está corriendo
         * - Hay un error en la petición
         * - El servidor no responde
         */
        console.error('❌ Error al enviar formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    });
  }
});

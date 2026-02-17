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
      // OBTENER REFERENCIA AL BOTÓN Y CONTENEDOR DE ALERTAS
      const submitBtn = formulario.querySelector('input[type="submit"]');
      const alertContainer = document.getElementById('contacto-alert');
      const originalBtnText = submitBtn.value;

      try {
        // MOSTRAR ESTADO DE CARGA
        submitBtn.disabled = true;
        submitBtn.value = 'Enviando...';
        alertContainer.innerHTML = '';
        
        /**
         * FETCH API: Realiza una petición HTTP al servidor
         */
        const response = await fetch('/api/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        // ============================================
        // MANEJAR RESPUESTA
        // ============================================
        if (data.success) {
          // ✅ ÉXITO: Mostrar mensaje de confirmación usando Bootstrap
          alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              ¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
          
          formulario.reset();
        } else {
          // ❌ ERROR DEL SERVIDOR
          alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Error: ${data.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
        }
        
      } catch (error) {
        // ============================================
        // MANEJAR ERRORES DE RED O SERVIDOR
        // ============================================
        console.error('❌ Error al enviar formulario:', error);
        alertContainer.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="bi bi-wifi-off me-2"></i>
            Hubo un error al enviar el formulario. Por favor, verifica tu conexión e intenta nuevamente.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      } finally {
        // RESTAURAR ESTADO DEL BOTÓN
        submitBtn.disabled = false;
        submitBtn.value = originalBtnText;
      }
    });
  }
});

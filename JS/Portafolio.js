// Cargar y mostrar proyectos desde JSON o API
async function loadProjects(containerSelector = '.portfolio-container', limit = null) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Contenedor '${containerSelector}' no encontrado`);
    return;
  }

  try {
    // Mostrar spinner de carga
    container.innerHTML = `
      <div class="col-12 text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando proyectos...</span>
        </div>
      </div>
    `;

    // Intentar cargar desde API primero, luego desde JSON
    const apiBase = window.PROJECTS_API_BASE || 'http://localhost:3001';
    let projects = [];

    try {
      const response = await fetch(`${apiBase}/api/projects`, { 
        timeout: 5000 
      });
      if (response.ok) {
        const data = await response.json();
        projects = data.ok ? data.data : [];
        console.log('Proyectos cargados desde API:', projects.length);
      }
    } catch (e) {
      console.log('API no disponible, cargando desde JSON local...');
    }

    // Si no hay proyectos desde API, cargar desde JSON local
    if (projects.length === 0) {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('No se pudo cargar projects.json');
      projects = await response.json();
      console.log('Proyectos cargados desde JSON:', projects.length);
    }

    // Limitar proyectos si es necesario (para preview en inicio)
    if (limit && limit > 0) {
      projects = projects.slice(0, limit);
    }

    if (projects.length === 0) {
      throw new Error('No hay proyectos disponibles');
    }

    renderProjects(projects, container);
  } catch (error) {
    console.error('Error al cargar proyectos:', error);
    container.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          <i class="bi bi-exclamation-triangle me-2"></i>
          Error al cargar los proyectos. Por favor, intenta más tarde.
        </div>
      </div>
    `;
  }
}

function renderProjects(projects, container) {
  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">No hay proyectos disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  // Mapear proyectos a HTML responsivo
  const projectsHTML = projects.map(project => `
    <div class="col-12 col-sm-6 col-lg-4 mb-4">
      <div class="card h-100 portfolio-card">
        <div class="position-relative overflow-hidden" style="height: 200px;">
          <img src="${project.image || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(project.title)}" 
               class="card-img-top w-100 h-100" 
               alt="${project.title}"
               loading="lazy"
               style="object-fit: cover;">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text flex-grow-1">${project.description || 'Proyecto profesional'}</p>
          
          ${project.category ? `
            <small class="text-muted mb-2 d-inline-block">
              <i class="bi bi-tag me-1"></i>${project.category}
            </small>
          ` : ''}
          
          ${project.technologies && project.technologies.length > 0 ? `
            <div class="mb-3">
              ${project.technologies.map(tech => `
                <span class="badge bg-secondary me-1 mb-1">${tech}</span>
              `).join('')}
            </div>
          ` : ''}
          
          <div class="mt-auto d-grid gap-2">
            ${project.link && project.link !== '#' ? `
              <a href="${project.link}" class="btn btn-primary btn-sm">
                <i class="bi bi-eye me-2"></i>Ver Proyecto
              </a>
            ` : ''}
            ${project.github ? `
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm">
                <i class="bi bi-github me-2"></i>GitHub
              </a>
            ` : ''}
            ${project.demo ? `
              <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-sm">
                <i class="bi bi-box-arrow-up-right me-2"></i>Ver Demo
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = projectsHTML;

  // Aplicar animaciones suaves a las nuevas cards
  const cards = container.querySelectorAll('.portfolio-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Usar requestAnimationFrame para mejor rendimiento
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 80);
    });
  });

  // Agregar efecto hover a las imágenes
  container.querySelectorAll('.portfolio-card img').forEach(img => {
    img.style.transition = 'transform 0.3s ease';
    img.parentElement.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
    });
    img.parentElement.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

// Cargar proyectos cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
  });
} else {
  loadProjects();
}


// Resalta el enlace activo según la sección visible
const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"], .navbar .nav-link[href$=".html"], .navbar .navbar-brand[href^="#"], .navbar .navbar-brand[href$=".html"]');
const sections = Array.from(document.querySelectorAll('section[id], main[id]'));

function setActiveLink() {
  const scrollPos = window.scrollY + 100;
  let currentId = null;
  for (const section of sections) {
    if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
      currentId = section.id;
      break;
    }
  }
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (currentId && href && href.includes(`#${currentId}`)) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Botón volver arriba
const backToTopBtn = document.createElement('button');
backToTopBtn.setAttribute('aria-label', 'Volver arriba');
backToTopBtn.className = 'btn btn-primary position-fixed';
backToTopBtn.style.right = '16px';
backToTopBtn.style.bottom = '16px';
backToTopBtn.style.display = 'none';
backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 400 ? 'inline-flex' : 'none';
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animaciones al aparecer usando IntersectionObserver
const animatedSelector = '.card, .titulo1, .titulo2, .servicio, .hero1 .contenido-hero1, section h2, section h4';
document.querySelectorAll(animatedSelector).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'opacity .6s ease, transform .6s ease';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(animatedSelector).forEach(el => io.observe(el));

// Lazy-load para imágenes sin loading="lazy"
document.querySelectorAll('img:not([loading])').forEach(img => {
  img.setAttribute('loading', 'lazy');
});

// Cerrar menú móvil al hacer click en un enlace
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('.navbar .nav-link')) {
    const navbarCollapse = document.querySelector('.navbar .collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  }
});


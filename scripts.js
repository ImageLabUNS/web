// scripts.js

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Smooth Scrolling para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación al hacer scroll (fade-in de secciones)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Simulación de envío del formulario de contacto
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
});

// Botón "Conoce sobre otros proyectos" → togglable
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('show-more-projects');
    const extraProjects = document.querySelectorAll('.extra-project');

    if (toggleBtn && extraProjects.length > 0) {
        toggleBtn.addEventListener('click', function() {
            // Alternar visibilidad de los proyectos extras
            extraProjects.forEach(project => {
                project.classList.toggle('hidden');
            });

            // Cambiar texto e icono del botón
            if (toggleBtn.dataset.state === 'hidden' || !toggleBtn.dataset.state) {
                toggleBtn.innerHTML = 'Ocultar proyectos <i class="fas fa-chevron-up ml-2"></i>';
                toggleBtn.dataset.state = 'visible';
            } else {
                toggleBtn.innerHTML = 'Conoce sobre otros proyectos <i class="fas fa-chevron-down ml-2"></i>';
                toggleBtn.dataset.state = 'hidden';
            }
        });
    }
});

// Botón "Conocé al resto del equipo"
document.addEventListener('DOMContentLoaded', function() {
  const toggleTeamBtn = document.getElementById('show-more-team');
  const extraTeam = document.getElementById('extra-team');

  if (toggleTeamBtn && extraTeam) {
    toggleTeamBtn.addEventListener('click', function() {
      extraTeam.classList.toggle('hidden');

      if (toggleTeamBtn.dataset.state === 'hidden' || !toggleTeamBtn.dataset.state) {
        toggleTeamBtn.innerHTML = 'Ocultar equipo <i class="fas fa-chevron-up ml-2"></i>';
        toggleTeamBtn.dataset.state = 'visible';
      } else {
        toggleTeamBtn.innerHTML = 'Conocé al resto del equipo <i class="fas fa-chevron-down ml-2"></i>';
        toggleTeamBtn.dataset.state = 'hidden';
      }
    });
  }
});
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


// ===== Papers Section: Tarjetas visuales + paginación + búsqueda =====
fetch('papers.json')
  .then(res => res.json())
  .then(papers => {
    const grid = document.getElementById('papers-grid');
    const search = document.getElementById('paper-search');
    const pagination = document.getElementById('papers-pagination');
    const perPage = 5;
    let currentPage = 1;
    let filtered = papers;

    function renderPage(page) {
      grid.innerHTML = '';
      const start = (page - 1) * perPage;
      const slice = filtered.slice(start, start + perPage);

      slice.forEach(p => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-lg overflow-hidden card-hover';
        card.innerHTML = `
          <img src="${p.imagen}" alt="${p.titulo}" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-lg font-bold text-primary mb-2">${p.titulo}</h3>
            <p class="text-sm text-gray-500 mb-2">${p.autores}</p>
            <p class="text-gray-600 text-sm mb-4">${p.resumen}</p>
            <a href="${p.url}" target="_blank" class="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition">
              <i class="fas fa-download mr-2"></i>Descargar PDF
            </a>
          </div>
        `;
        grid.appendChild(card);
      });

      renderPagination();
    }

    function renderPagination() {
      const total = Math.ceil(filtered.length / perPage);
      pagination.innerHTML = '';

      for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.className = `px-4 py-2 rounded-lg mx-1 ${i === currentPage ? 'bg-primary text-white' : 'bg-white text-primary border'}`;
        btn.textContent = i;
        btn.onclick = () => {
          currentPage = i;
          renderPage(i);
        };
        pagination.appendChild(btn);
      }
    }

    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      filtered = papers.filter(p =>
        p.titulo.toLowerCase().includes(q) ||
        p.autores.toLowerCase().includes(q)
      );
      currentPage = 1;
      renderPage(1);
    });

    renderPage(1);
  });
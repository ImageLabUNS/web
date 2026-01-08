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


// ====== Cargar papers.csv (con autores tipo lista Python) ======
fetch('papers.csv')

  .then(r => r.text())
  .then(text => {
    console.log('CSV cargado', papers.length, 'papers')
    const lines = text.trim().split('\n').slice(1);
    const papers = lines.map(l => {
      const [archivo, doi, titulo, autores, url_drive] = l.match(/(".*?"|[^,]+)/g)
                                               .map(s => s.replace(/^"|"$/g, '').trim());

      // Convertimos la "lista de Python" a array real
      const autoresArray = JSON.parse(autores.replace(/'/g, '"'));
      const autoresStr   = autoresArray.join(', ');

      return {
        titulo: titulo || 'Sin título',
        autores: autoresStr,          // texto para mostrar
        autoresArray,                  // array para buscar
        url: url_drive
      };
    });

    // ===== Renderizado =====
    const list = document.getElementById('paper-list');
    const search = document.getElementById('paper-search');
    const loadMore = document.getElementById('load-more-papers');
    let current = 0;
    const step = 15;

    function render(filter = '') {
      list.innerHTML = '';
      current = 0;
      const filtered = papers.filter(p =>
        p.titulo.toLowerCase().includes(filter) ||
        p.autoresArray.some(a => a.toLowerCase().includes(filter))
      );

      function slice() {
        filtered.slice(current, current + step).forEach(p => {
          const li = document.createElement('li');
          li.className = 'bg-white p-4 rounded-xl shadow flex justify-between items-center';
          li.innerHTML = `
            <div>
              <div class="font-semibold text-primary">${p.titulo}</div>
              <div class="text-sm text-gray-500">${p.autores}</div>
            </div>
            <a href="${p.url}" target="_blank" rel="noopener" class="bg-secondary text-white px-3 py-1 rounded text-sm">⬇ PDF</a>
          `;
          list.appendChild(li);
        });
        current += step;
        loadMore.style.display = current >= filtered.length ? 'none' : 'inline-block';
      }

      slice();
      loadMore.onclick = () => slice();
      search.oninput = () => render(search.value.toLowerCase());
    }

    render();
  });
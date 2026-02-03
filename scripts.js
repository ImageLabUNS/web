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
// Simulación de envío del formulario de contacto
document.querySelector('form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  // 1. Validar Captcha
  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse.length > 0) {
    alert("Por favor, completa el captcha para continuar.");
    return;
  }

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  // Estado de carga
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
  submitBtn.disabled = true;

  // 2. Preparar datos
  const formData = new FormData(form);

  // Agregar correos extra en copia (CC)
  // REEMPLAZAR con los correos reales
  formData.append('_cc', 'franciscoriaconis@duck.com,cad@uns.edu.ar');
  formData.append('_template', 'table'); // Formato de tabla limpio
  formData.append('_captcha', 'false'); // Ya lo validamos nosotros

  // 3. Enviar a FormSubmit con la cuenta principal
  // REEMPLAZAR 'destination1@example.com' con el correo principal
  fetch("https://formsubmit.co/ajax/imaglabsuns@gmail.com", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success === "false") {
        throw new Error(data.message);
      }
      // Exito
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      form.reset();
      grecaptcha.reset(); // Resetear captcha
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente o escribinos directamente a nuestro correo.');
    })
    .finally(() => {
      // Restaurar botón
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    });
});

// Botón "Conoce sobre otros proyectos" → togglable
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('show-more-projects');
  const extraProjects = document.querySelectorAll('.extra-project');

  if (toggleBtn && extraProjects.length > 0) {
    toggleBtn.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
  const toggleTeamBtn = document.getElementById('show-more-team');
  const extraTeam = document.getElementById('extra-team');

  if (toggleTeamBtn && extraTeam) {
    toggleTeamBtn.addEventListener('click', function () {
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
    const perPage = 3;
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
      if (total <= 1) return;

      const createBtn = (content, page, active = false, disabled = false) => {
        const btn = document.createElement('button');
        btn.className = `px-3 py-2 sm:px-4 sm:py-2 rounded-lg mx-1 transition-all ${active ? 'bg-primary text-white shadow-md' : 'bg-white text-primary border border-gray-200 hover:bg-gray-50'
          } ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`;
        btn.innerHTML = content;
        if (!disabled) {
          btn.onclick = () => {
            currentPage = page;
            renderPage(page);
            // Scroll suave hacia arriba de la sección al cambiar de página
            document.getElementById('papers').scrollIntoView({ behavior: 'smooth', block: 'start' });
          };
        }
        return btn;
      };

      // Botón Anterior
      pagination.appendChild(createBtn('<i class="fas fa-chevron-left"></i>', currentPage - 1, false, currentPage === 1));

      // Lógica de páginas mostradas
      let pages = [];
      const delta = 1; // Páginas a mostrar alrededor de la actual

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1); // Siempre mostrar la primera

        if (currentPage > delta + 3) {
          pages.push('...');
        }

        const start = Math.max(2, currentPage - delta);
        const end = Math.min(total - 1, currentPage + delta);

        // Ajustar para mostrar siempre un bloque de 3 si es posible
        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }

        if (currentPage < total - (delta + 2)) {
          pages.push('...');
        }

        if (!pages.includes(total)) pages.push(total); // Siempre mostrar la última
      }

      pages.forEach(p => {
        if (p === '...') {
          const span = document.createElement('span');
          span.className = 'px-2 py-2 text-gray-400 font-bold';
          span.textContent = '...';
          pagination.appendChild(span);
        } else {
          pagination.appendChild(createBtn(p, p, p === currentPage));
        }
      });

      // Botón Siguiente
      pagination.appendChild(createBtn('<i class="fas fa-chevron-right"></i>', currentPage + 1, false, currentPage === total));
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
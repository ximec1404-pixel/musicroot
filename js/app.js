// MusicRoot - Elementos dinamicos con JavaScript.
// Incluye menu desplegable, slider, mensajes personalizados, filtros, modal, modo oscuro y validacion de formulario.

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const submenuContainer = document.querySelector('.has-submenu');
  const submenuButton = document.querySelector('.submenu-btn');
  const submenu = document.querySelector('.submenu');

  function openSubmenu() {
    if (!submenu || !submenuButton) return;
    submenu.classList.add('open');
    submenuButton.setAttribute('aria-expanded', 'true');
  }

  function closeSubmenu() {
    if (!submenu || !submenuButton) return;
    submenu.classList.remove('open');
    submenuButton.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (submenuContainer && submenuButton && submenu) {
    submenuContainer.addEventListener('mouseover', openSubmenu);
    submenuContainer.addEventListener('mouseout', function (event) {
      if (!submenuContainer.contains(event.relatedTarget)) {
        closeSubmenu();
      }
    });

    submenuButton.addEventListener('click', function (event) {
      event.stopPropagation();
      const isOpen = submenu.classList.toggle('open');
      submenuButton.setAttribute('aria-expanded', String(isOpen));
    });

    submenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeSubmenu);
    });
  }

  document.addEventListener('click', function (event) {
    if (submenuContainer && !submenuContainer.contains(event.target)) {
      closeSubmenu();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeSubmenu();
      closeModal();
    }
  });

  const welcomeMessage = document.getElementById('welcome-message');
  const languageButtons = document.querySelectorAll('.lang-btn');

  function getTimeGreeting(language) {
    const currentHour = new Date().getHours();
    let period = 'dia';

    if (currentHour >= 12 && currentHour < 18) {
      period = 'tarde';
    } else if (currentHour >= 18 || currentHour < 5) {
      period = 'noche';
    }

    const messages = {
      es: {
        dia: 'Buenos dias, bienvenida a MusicRoot. Explora los generos musicales y sus origenes.',
        tarde: 'Buenas tardes, bienvenida a MusicRoot. Disfruta el recorrido musical interactivo.',
        noche: 'Buenas noches, bienvenida a MusicRoot. Conoce datos y artistas representativos.'
      },
      en: {
        dia: 'Good morning, welcome to MusicRoot. Explore music genres and their origins.',
        tarde: 'Good afternoon, welcome to MusicRoot. Enjoy this interactive music journey.',
        noche: 'Good evening, welcome to MusicRoot. Discover facts and representative artists.'
      }
    };

    return messages[language][period];
  }

  function updateWelcome(language) {
    if (welcomeMessage) {
      welcomeMessage.textContent = getTimeGreeting(language);
    }
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      updateWelcome(button.dataset.lang || 'es');
    });
  });

  updateWelcome('es');

  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('musicroot-theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      localStorage.setItem('musicroot-theme', isDark ? 'dark' : 'light');
    });
  }

  const slides = [
    {
      src: 'imagenes/jazz1.jfif',
      alt: 'Músico interpretando jazz en un escenario',
      caption: 'Jazz: improvisación y expresión musical.'
    },
    {
      src: 'imagenes/popescenario.jfif',
      alt: 'Escenario iluminado de música pop',
      caption: 'Pop: melodías populares y cercanas al público.'
    },
    {
      src: 'imagenes/bluesmic.jfif',
      alt: 'Micrófono usado para interpretar blues',
      caption: 'Blues: emociones profundas y raíz de otros géneros.'
    },
    {
      src: 'imagenes/hiphopradio.jfif',
      alt: 'Radio relacionada con la cultura hip hop',
      caption: 'Hip hop: movimiento cultural urbano y social.'
    },
    {
      src: 'imagenes/Rock1.jfif',
      alt: 'Presentación relacionada con rock and roll',
      caption: 'Rock and roll: energía, ritmo y cambio cultural.'
    },
    {
      src: 'imagenes/r&b1.jfif',
      alt: 'Presentación relacionada con rhythm and blues',
      caption: 'R&B: voces expresivas y mezcla de influencias musicales.'
    }
  ];

  const sliderImage = document.getElementById('slider-image');
  const sliderCaption = document.getElementById('slider-caption');
  const prevButton = document.querySelector('.slider-control.prev');
  const nextButton = document.querySelector('.slider-control.next');
  let currentSlide = 0;
  let sliderInterval;

  function showSlide(index) {
    if (!sliderImage || !sliderCaption) return;
    currentSlide = (index + slides.length) % slides.length;
    const slide = slides[currentSlide];
    sliderImage.src = slide.src;
    sliderImage.alt = slide.alt;
    sliderCaption.textContent = slide.caption;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function restartSlider() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 4000);
  }

  if (sliderImage) {
    sliderInterval = setInterval(nextSlide, 4000);
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      previousSlide();
      restartSlider();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      nextSlide();
      restartSlider();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const genreCards = document.querySelectorAll('.genre-card');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach(function (item) {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      genreCards.forEach(function (card) {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.hidden = !shouldShow;
      });
    });
  });

  const modal = document.getElementById('info-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const closeModalButton = document.querySelector('.modal-close');

  function openModal(title, text) {
    if (!modal || !modalTitle || !modalText || !closeModalButton) return;
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.hidden = false;
    closeModalButton.focus();
  }

  function closeModal() {
    if (modal) {
      modal.hidden = true;
    }
  }

  window.closeModal = closeModal;

  document.querySelectorAll('.fact-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      openModal('Dato curioso', button.dataset.fact || 'Información no disponible.');
    });
  });

  document.querySelectorAll('.artist-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      openModal('Artista representativo', button.dataset.artist || 'Información no disponible.');
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const favorite = document.getElementById('favorite').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      formMessage.className = 'form-message';

      if (!name || !email || !favorite) {
        formMessage.textContent = 'Por favor completa todos los campos del formulario.';
        formMessage.classList.add('error');
        return;
      }

      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Por favor escribe un correo electrónico válido.';
        formMessage.classList.add('error');
        return;
      }

      formMessage.textContent = 'Gracias, ' + name + '. Tu género favorito registrado fue: ' + favorite + '.';
      formMessage.classList.add('success');
      contactForm.reset();
    });
  }
});

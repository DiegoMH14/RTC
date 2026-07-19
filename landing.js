/* ==========================================================================
   RTC Landing — landing.js
   Vanilla JS, sin frameworks ni dependencias externas (mismo enfoque
   que el resto del sistema RTC: admin/, tecnico/, rtc-lic/).

   Índice:
     1. Configuración
     2. Menú móvil
     3. Animaciones al hacer scroll (reveal)
     4. Mockup de orden en tiempo real (hero)
     5. Formulario de solicitud de demo (envío por EmailJS)
     6. Navbar con blur al hacer scroll
     7. Tilt 3D en tarjetas de Funciones
     8. Contadores animados del hero
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Configuración
  ------------------------------------------------------------------------ */
  const CONFIG = {
    orderStateIntervalMs: 2600,
    clockIntervalMs: 1000,
    // Credenciales de EmailJS (https://dashboard.emailjs.com).
    // 1. Crea un Service (ej: Gmail) -> copia el "Service ID".
    // 2. Crea un Template con variables {{nombre}} {{empresa}} {{ciudad}} {{correo}} {{mensaje}} -> copia el "Template ID".
    // 3. En Account > API Keys copia tu "Public Key".
    emailjs: {
      serviceId: 'TU_SERVICE_ID',
      templateId: 'TU_TEMPLATE_ID',
      publicKey: 'TU_PUBLIC_KEY',
    },
  };

  /* ------------------------------------------------------------------------
     2. Menú móvil
  ------------------------------------------------------------------------ */
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ------------------------------------------------------------------------
     3b. Splash de entrada -> sincroniza con la entrada del hero
  ------------------------------------------------------------------------ */
  function initIntroSplash() {
    const splash = document.getElementById('introSplash');
    // si por algo no existe el splash, el hero debe verse igual
    if (!splash) {
      document.body.classList.add('intro-done');
      return;
    }
    window.setTimeout(() => {
      document.body.classList.add('intro-done');
    }, 1650);
  }

  /* ------------------------------------------------------------------------
     3. Animaciones al hacer scroll (reveal)
  ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     4. Mockup de orden en tiempo real (elemento central del hero)
  ------------------------------------------------------------------------ */
  const ORDER_STATES = [
    { label: 'PENDIENTE', color: '#f59e0b', bg: 'rgba(245,158,11,.12)', progress: 1 },
    { label: 'ASIGNADA', color: '#3b82f6', bg: 'rgba(59,130,246,.12)', progress: 2 },
    { label: 'EN CAMINO', color: '#3b82f6', bg: 'rgba(59,130,246,.12)', progress: 3 },
    { label: 'COMPLETADA', color: '#22c55e', bg: 'rgba(34,197,94,.12)', progress: 4 },
  ];

  function initOrderMock() {
    const statusEl = document.getElementById('mockStatus');
    const timeEl = document.getElementById('mockTime');
    const progressBars = document.querySelectorAll('.mock-progress i');
    if (!statusEl || !timeEl) return;

    let stateIndex = 0;
    let secondsAgo = 0;

    function render() {
      const state = ORDER_STATES[stateIndex];
      statusEl.textContent = state.label;
      statusEl.style.color = state.color;
      statusEl.style.background = state.bg;
      progressBars.forEach((bar, i) => {
        bar.style.background = i < state.progress ? state.color : 'var(--border)';
      });
    }

    function tickClock() {
      secondsAgo += 1;
      timeEl.textContent =
        secondsAgo < 60 ? `hace ${secondsAgo}s` : `hace ${Math.floor(secondsAgo / 60)} min`;
    }

    render();
    setInterval(() => {
      stateIndex = (stateIndex + 1) % ORDER_STATES.length;
      if (stateIndex === 0) secondsAgo = 0;
      render();
    }, CONFIG.orderStateIntervalMs);
    setInterval(tickClock, CONFIG.clockIntervalMs);
  }

  /* ------------------------------------------------------------------------
     5. Formulario de solicitud de demo (envío por EmailJS)
  ------------------------------------------------------------------------ */
  function getFormData() {
    return {
      nombre: document.getElementById('fNombre').value.trim(),
      empresa: document.getElementById('fEmpresa').value.trim(),
      ciudad: document.getElementById('fCiudad').value.trim(),
      correo: document.getElementById('fCorreo').value.trim(),
      mensaje: document.getElementById('fMensaje').value.trim(),
    };
  }

  function isEmailJsReady() {
    const c = CONFIG.emailjs;
    return (
      typeof window.emailjs !== 'undefined' &&
      c.serviceId && !c.serviceId.startsWith('TU_') &&
      c.templateId && !c.templateId.startsWith('TU_') &&
      c.publicKey && !c.publicKey.startsWith('TU_')
    );
  }

  function initEmailJs() {
    if (isEmailJsReady()) {
      window.emailjs.init(CONFIG.emailjs.publicKey);
    }
  }

  function initDemoForm() {
    const form = document.getElementById('demoForm');
    const successPanel = document.getElementById('formSuccess');
    const successMsg = document.getElementById('formSuccessMsg');
    const errorBox = document.getElementById('formError');
    const sendAnotherBtn = document.getElementById('formSendAnother');
    const submitBtn = form ? form.querySelector('.form-submit') : null;
    if (!form || !successPanel) return;

    function setSubmitLoading(isLoading) {
      if (!submitBtn) return;
      submitBtn.disabled = isLoading;
      submitBtn.innerHTML = isLoading
        ? '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...'
        : '<i class="fa-solid fa-envelope"></i> Enviar solicitud';
    }

    function showError(message) {
      if (!errorBox) return;
      errorBox.textContent = message;
      errorBox.classList.add('show');
    }

    function clearError() {
      if (!errorBox) return;
      errorBox.textContent = '';
      errorBox.classList.remove('show');
    }

    function showSuccess(message) {
      form.style.display = 'none';
      if (successMsg && message) successMsg.textContent = message;
      successPanel.classList.add('show');
    }

    function resetToForm() {
      form.reset();
      form.style.display = '';
      successPanel.classList.remove('show');
      clearError();
      setSubmitLoading(false);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearError();

      if (!isEmailJsReady()) {
        console.error('EmailJS no está configurado (revisa CONFIG.emailjs en landing.js).');
        showError('El envío no está disponible en este momento. Escríbenos directamente a contacto@rtc.com.co.');
        return;
      }

      const data = getFormData();
      setSubmitLoading(true);

      window.emailjs
        .send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, {
          nombre: data.nombre,
          empresa: data.empresa,
          ciudad: data.ciudad,
          correo: data.correo,
          mensaje: data.mensaje || 'No especificado',
        })
        .then(() => {
          setSubmitLoading(false);
          showSuccess('Recibimos tu solicitud. En cuanto la revisemos, te contactamos para agendar tu demo.');
        })
        .catch((err) => {
          console.error('EmailJS no pudo enviar el correo:', err);
          setSubmitLoading(false);
          showError('No pudimos enviar tu solicitud. Intenta de nuevo en un momento.');
        });
    });

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', resetToForm);
    }
  }

  /* ------------------------------------------------------------------------
     6. Navbar: fondo/blur solo cuando hay scroll (empieza transparente sobre el hero)
  ------------------------------------------------------------------------ */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const updateNav = () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ------------------------------------------------------------------------
     7. Tarjetas de Funciones: tilt 3D siguiendo el mouse
  ------------------------------------------------------------------------ */
  function initTiltCards() {
    const cards = document.querySelectorAll('.feat-card');
    if (!cards.length || window.matchMedia('(pointer: coarse)').matches) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
        const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
        card.style.transition = 'transform .06s linear';
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Contadores animados de las cifras del mockup del hero
  ------------------------------------------------------------------------ */
  function initCounters() {
    const counters = document.querySelectorAll('.mock-chip .n[data-count]');
    if (!counters.length) return;

    counters.forEach((el) => {
      const raw = el.textContent.trim();
      const suffix = raw.replace(/[0-9]/g, '');
      const target = parseInt(raw, 10);
      if (Number.isNaN(target)) return;

      el.textContent = '0' + suffix;
      const duration = 1100;
      let start = null;

      const step = (timestamp) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    });
  }

  /* ------------------------------------------------------------------------
     Inicialización
  ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    initIntroSplash();
    initMobileNav();
    initNavScroll();
    initScrollReveal();
    initOrderMock();
    initTiltCards();
    initEmailJs();
    initDemoForm();

    // los contadores del hero arrancan justo cuando termina de entrar el mockup
    window.setTimeout(initCounters, 2100);
  });
})();

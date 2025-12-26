/**
* Medinet Scripts - Funcionalidad principal para el sitio web de Medinet
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log('Medinet Scripts cargados correctamente');
  
  // Inicialización de componentes
  initHeaderSticky();
  initMegaMenu();
  initBackToTop();
  initModals();
  initCarousel();
  initTestimonials();
  initFAQ();
  initScrollAnimations();
 });
 
 /**
 * Inicializa el comportamiento sticky del header
 */
 function initHeaderSticky() {
  const header = document.getElementById('header');
  if (!header) return;
  
  try {
    const options = JSON.parse(header.getAttribute('data-hs-header-options').replace(/&quot;/g, '"'));
    const fixMoment = options.fixMoment || 0;
    const fixEffect = options.fixEffect || 'slide';
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > fixMoment) {
        header.classList.add('navbar-fixed-top');
        
        if (fixEffect === 'slide' && scrollTop > lastScrollTop) {
          // Scrolling down
          header.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.classList.remove('navbar-fixed-top');
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
  } catch (error) {
    console.error('Error al inicializar el header sticky:', error);
  }
 }
 
 /**
 * Inicializa los mega menús y submenús
 */
 function initMegaMenu() {
  // Seleccionar todos los elementos con clase hs-mega-menu-invoker
  const megaMenuInvokers = document.querySelectorAll('.hs-mega-menu-invoker, .hs-sub-menu-invoker');
  
  megaMenuInvokers.forEach(function(invoker) {
    // Obtener el ID del menú asociado
    const menuId = invoker.getAttribute('id');
    const menu = document.querySelector(`[aria-labelledby="${menuId}"]`);
    
    if (!menu) return;
    
    // Evento para mostrar el menú en hover (desktop)
    if (window.innerWidth >= 992) {
      invoker.addEventListener('mouseenter', function() {
        showMenu(menu, invoker);
      });
      
      const menuContainer = invoker.closest('li');
      menuContainer.addEventListener('mouseleave', function() {
        hideMenu(menu, invoker);
      });
    }
    
    // Evento para mostrar el menú en click (mobile y desktop)
    invoker.addEventListener('click', function(e) {
      if (window.innerWidth < 992 || invoker.getAttribute('data-hs-mega-menu-trigger') === 'click') {
        e.preventDefault();
        
        if (menu.classList.contains('fadeIn')) {
          hideMenu(menu, invoker);
        } else {
          // Ocultar otros menús abiertos
          document.querySelectorAll('.hs-mega-menu .fadeIn, .hs-sub-menu .fadeIn').forEach(function(openMenu) {
            if (openMenu !== menu) {
              const openMenuInvoker = document.querySelector(`[aria-controls="${openMenu.getAttribute('id')}"]`);
              hideMenu(openMenu, openMenuInvoker);
            }
          });
          
          showMenu(menu, invoker);
        }
      }
    });
  });
  
  // Cerrar menús al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.hs-mega-menu') && !e.target.closest('.hs-sub-menu')) {
      document.querySelectorAll('.hs-mega-menu .fadeIn, .hs-sub-menu .fadeIn').forEach(function(menu) {
        const invoker = document.querySelector(`[aria-controls="${menu.getAttribute('id')}"]`);
        hideMenu(menu, invoker);
      });
    }
  });
  
  // Función para mostrar el menú
  function showMenu(menu, invoker) {
    menu.classList.remove('fadeOut');
    menu.classList.add('fadeIn');
    menu.style.display = 'block';
    invoker.setAttribute('aria-expanded', 'true');
  }
  
  // Función para ocultar el menú
  function hideMenu(menu, invoker) {
    menu.classList.remove('fadeIn');
    menu.classList.add('fadeOut');
    
    // Ocultar después de la animación
    setTimeout(function() {
      if (menu.classList.contains('fadeOut')) {
        menu.style.display = 'none';
      }
    }, 300);
    
    invoker.setAttribute('aria-expanded', 'false');
  }
 }
 
 /**
 * Inicializa el botón Back to Top
 */
 function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  // Mostrar/ocultar el botón según el scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Funcionalidad para volver arriba al hacer clic
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
 }
 
 /**
 * Inicializa los modales de video e imagen
 */
 function initModals() {
  // ===== VIDEO MODAL =====
  const videoModal = document.getElementById("video-modal");
  const videoModalButton = document.getElementById("video-modal-button");
  const closeVideoModal = document.getElementById("close-video-modal");
  const videoIframe = document.getElementById("video-iframe");
 
  // Verificar que los elementos existan antes de agregar event listeners
  if (videoModalButton && videoModal && closeVideoModal && videoIframe) {
    console.log("Modal de video inicializado correctamente");
    
    // Abrir modal de video
    videoModalButton.addEventListener("click", function() {
      console.log("Botón de video clickeado");
      // Usar un ID de video válido de YouTube
      videoIframe.src = "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&rel=0";
      videoModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevenir scroll
    });
 
    // Cerrar modal de video
    closeVideoModal.addEventListener("click", function() {
      videoModal.classList.remove("active");
      videoIframe.src = ""; // Detener el video
      document.body.style.overflow = ""; // Restaurar scroll
    });
 
    // Cerrar modal al hacer clic fuera
    videoModal.addEventListener("click", function(e) {
      if (e.target === videoModal) {
        videoModal.classList.remove("active");
        videoIframe.src = "";
        document.body.style.overflow = "";
      }
    });
  } else {
    console.warn("Algunos elementos del modal de video no se encontraron:", {
      videoModal: !!videoModal,
      videoModalButton: !!videoModalButton,
      closeVideoModal: !!closeVideoModal,
      videoIframe: !!videoIframe
    });
  }
 
  // ===== IMAGE MODAL =====
  const imageModal = document.getElementById("image-modal");
  const closeImageModal = document.getElementById("close-image-modal");
  const imageModalImg = document.getElementById("image-modal-img");
  const imageModalTitle = document.getElementById("image-modal-title-text");
  const imageModalTriggers = document.querySelectorAll(".image-modal-trigger");
 
  // Verificar que los elementos existan antes de agregar event listeners
  if (imageModal && closeImageModal && imageModalImg && imageModalTriggers.length > 0) {
    console.log("Modal de imagen inicializado correctamente");
    
    // Abrir modal de imagen
    imageModalTriggers.forEach(trigger => {
      trigger.addEventListener("click", function() {
        const imageUrl = this.getAttribute("data-image");
        const imageTitle = this.getAttribute("data-title");
        
        if (imageUrl && imageModalImg) {
          imageModalImg.src = imageUrl;
          if (imageTitle && imageModalTitle) {
            imageModalTitle.textContent = imageTitle;
          }
          imageModal.classList.add("active");
          document.body.style.overflow = "hidden"; // Prevenir scroll
        }
      });
    });
 
    // Cerrar modal de imagen
    if (closeImageModal) {
      closeImageModal.addEventListener("click", function() {
        imageModal.classList.remove("active");
        document.body.style.overflow = ""; // Restaurar scroll
      });
    }
 
    // Cerrar modal al hacer clic fuera
    imageModal.addEventListener("click", function(e) {
      if (e.target === imageModal) {
        imageModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  } else {
    console.warn("Algunos elementos del modal de imagen no se encontraron:", {
      imageModal: !!imageModal,
      closeImageModal: !!closeImageModal,
      imageModalImg: !!imageModalImg,
      imageModalTriggers: imageModalTriggers.length
    });
  }
 
  // Cerrar modales con la tecla ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      // Cerrar modal de video
      if (videoModal && videoModal.classList.contains("active")) {
        videoModal.classList.remove("active");
        if (videoIframe) videoIframe.src = "";
        document.body.style.overflow = "";
      }
      
      // Cerrar modal de imagen
      if (imageModal && imageModal.classList.contains("active")) {
        imageModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
 }
 
   // Función para inicializar el carrusel
   function initCarousel() {
    const carousel = document.querySelector(".carousel")
    if (!carousel) return

    const slides = carousel.querySelectorAll(".carousel-slide")
    const prevButton = carousel.querySelector(".carousel-prev")
    const nextButton = carousel.querySelector(".carousel-next")
    let currentIndex = 0

    function updateCarousel() {
      slides.forEach((slide) => slide.classList.remove("active"))
      slides[currentIndex].classList.add("active")
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length
      updateCarousel()
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length
      updateCarousel()
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide)
    }

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide)
    }

    // Opcional: Autoplay
    // setInterval(nextSlide, 5000);

    updateCarousel() // Inicializar el carrusel
  }

  function cleanText(text) {
    if (!text) return ""
    if (typeof text !== "string") {
      text = String(text)
    }
    // Check if g is defined, if not, define it locally
    const g = ""
    // Check if text is defined, if not, define it locally

    if (text === null || text === undefined) {
      return ""
    }

    if (typeof text !== "string") {
      text = String(text)
    }

    text = text.replace(/<[^>]*>/g, "")
    text = text.replace(/&nbsp;/g, " ")
    text = text.replace(/&amp;/g, "&")
    text = text.replace(/&lt;/g, "&lt;")
    text = text.replace(/&gt;/g, ">")
    text = text.replace(/[\n\r]+/g, "")
    text = text.replace(/\s+/g, " ")
    text = text.trim()
    if (text.includes("display:none")) {
      text = text.replace(/display:none/g, "")
    }
    return text.replace(/\s*$$[^)]*$$/g, "")
  }

 
 /**
 * Inicializa los testimonios
 */
 function initTestimonials() {
  const testimonials = [
    {
      id: 1,
      image: "https://21935835.fs1.hubspotusercontent-na1.net/hubfs/21935835/Recurso%2014LO%20ARCAYA.png",
      alt: "Testimonio Clínica Loarcaya",
      clientName: "Clínica Loarcaya",
      personName: "Manuel Prieto",
      position: "Gerente comercial",
      avatarUrl: "https://21935835.fs1.hubspotusercontent-na1.net/hubfs/21935835/manuel%20prieto%20160x160.png",
      quote: "La implementación de la Historia Clínica Electrónica de Medinet ha transformado completamente nuestra operación. La eficiencia en la atención a pacientes ha mejorado significativamente y el personal médico puede acceder a la información de manera rápida y segura.",
    },
    {
      id: 2,
      image: "https://21935835.fs1.hubspotusercontent-na1.net/hubfs/21935835/fachada.jpg",
      alt: "Testimonio Renal Infantil Mater",
      clientName: "Renal infantil mater",
      personName: "Joaquin Mardones",
      position: "Jefe de proyectos",
      avatarUrl: "https://21935835.fs1.hubspotusercontent-na1.net/hubfs/21935835/joaquin%20mardones%20160x160.png",
      quote: "Desde que implementamos Medinet, hemos logrado centralizar toda la información clínica de nuestros pacientes. El seguimiento de tratamientos es mucho más preciso y la comunicación entre especialistas ha mejorado notablemente. Definitivamente ha sido una inversión que ha valido la pena.",
    },
  ];
 
  const testimonialContainer = document.getElementById("testimonial-container");
  const testimonialImage = document.getElementById("testimonial-image");
  const testimonialQuote = document.getElementById("testimonial-quote");
  const testimonialClientName = document.getElementById("testimonial-client-name");
  const testimonialPersonInfo = document.getElementById("testimonial-person-info");
  const testimonialAvatar = document.getElementById("testimonial-avatar");
  const testimonialPrev = document.getElementById("testimonial-prev");
  const testimonialNext = document.getElementById("testimonial-next");
  const testimonialIndicators = document.getElementById("testimonial-indicators");
  
  if (!testimonialContainer) return;
  
  let currentTestimonial = 0;
  let testimonialIsAnimating = false;
 
  function updateTestimonial() {
    const current = testimonials[currentTestimonial];
    
    if (testimonialImage) testimonialImage.src = current.image;
    if (testimonialImage) testimonialImage.alt = current.alt;
    if (testimonialQuote) testimonialQuote.textContent = current.quote;
    if (testimonialClientName) testimonialClientName.textContent = current.clientName;
    if (testimonialPersonInfo) testimonialPersonInfo.innerHTML = `<span class="font-medium">${current.personName}</span> - ${current.position}`;
    if (testimonialAvatar) testimonialAvatar.src = current.avatarUrl;
    if (testimonialAvatar) testimonialAvatar.alt = `Avatar de ${current.personName}`;
 
    // Update indicators
    if (testimonialIndicators) {
      const indicators = testimonialIndicators.querySelectorAll("button");
      indicators.forEach((indicator, index) => {
        if (index === currentTestimonial) {
          indicator.className = "transition-all duration-300 h-3 w-10 bg-medinet-darkBlue rounded-full";
        } else {
          indicator.className = "transition-all duration-300 h-3 w-3 bg-gray-300 hover:bg-medinet-lightBlue/50 rounded-full hover:scale-110";
        }
      });
    }
  }
 
  function goToTestimonial(index) {
    if (testimonialIsAnimating || index === currentTestimonial) return;
    testimonialIsAnimating = true;
    
    testimonialContainer.classList.add("animating");
    
    setTimeout(() => {
      currentTestimonial = index;
      updateTestimonial();
      
      setTimeout(() => {
        testimonialContainer.classList.remove("animating");
        testimonialIsAnimating = false;
      }, 250);
    }, 250);
  }
 
  function nextTestimonial() {
    if (testimonialIsAnimating) return;
    const nextIndex = (currentTestimonial + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  }
 
  function prevTestimonial() {
    if (testimonialIsAnimating) return;
    const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    goToTestimonial(prevIndex);
  }
 
  // Initialize testimonial indicators
  if (testimonialIndicators) {
    testimonials.forEach((_, index) => {
      const indicator = document.createElement("button");
      indicator.className = index === 0 
        ? "transition-all duration-300 h-3 w-10 bg-medinet-darkBlue rounded-full" 
        : "transition-all duration-300 h-3 w-3 bg-gray-300 hover:bg-medinet-lightBlue/50 rounded-full hover:scale-110";
      indicator.setAttribute("data-slide", index);
      indicator.setAttribute("aria-label", `Ir al testimonio ${index + 1}`);
      indicator.addEventListener("click", () => goToTestimonial(index));
      testimonialIndicators.appendChild(indicator);
    });
  }
 
  if (testimonialPrev) testimonialPrev.addEventListener("click", prevTestimonial);
  if (testimonialNext) testimonialNext.addEventListener("click", nextTestimonial);
 
  // Auto-advance testimonials
  let testimonialInterval = setInterval(nextTestimonial, 8000);
 
  // Pause auto-advance on interaction
  [testimonialPrev, testimonialNext].forEach(el => {
    if (el) {
      el.addEventListener("click", () => {
        clearInterval(testimonialInterval);
        // Restart after 30 seconds of inactivity
        setTimeout(() => {
          testimonialInterval = setInterval(nextTestimonial, 8000);
        }, 30000);
      });
    }
  });
 }
 
 /**
 * Inicializa el FAQ Accordion
 */
 function initFAQ() {
  const faqItems = document.querySelectorAll(".medinet-faq-item");
  const faqButtons = document.querySelectorAll(".medinet-faq-button");
  
  if (!faqItems.length) return;
 
  faqButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const content = faqItems[index].querySelector(".medinet-faq-content");
      const isOpen = content.classList.contains("active");
      const chevronDown = button.querySelector(".chevron-down");
      const chevronUp = button.querySelector(".chevron-up");
 
      // Close all FAQs
      faqItems.forEach(item => {
        item.classList.remove("active");
        item.querySelector(".medinet-faq-content").classList.remove("active");
        
        const itemButton = item.querySelector(".medinet-faq-button");
        const itemChevronDown = itemButton.querySelector(".chevron-down");
        const itemChevronUp = itemButton.querySelector(".chevron-up");
        
        if (itemChevronDown) itemChevronDown.classList.remove("hidden");
        if (itemChevronUp) itemChevronUp.classList.add("hidden");
      });
 
      // If it wasn't open, open it
      if (!isOpen) {
        faqItems[index].classList.add("active");
        content.classList.add("active");
        if (chevronDown) chevronDown.classList.add("hidden");
        if (chevronUp) chevronUp.classList.remove("hidden");
      }
    });
  });
 }
 
 /**
 * Inicializa las animaciones de scroll
 */
 function initScrollAnimations() {
  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;
 
    // Animate elements with medinet-fade-in class
    document.querySelectorAll(".medinet-fade-in").forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
 
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
 
    // Animate elements with medinet-fade-in-left class
    document.querySelectorAll(".medinet-fade-in-left").forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
 
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";
      }
    });
 
    // Animate elements with medinet-fade-in-right class
    document.querySelectorAll(".medinet-fade-in-right").forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
 
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";
      }
    });
 
    // Animate elements with medinet-slide-in-left class
    document.querySelectorAll(".medinet-slide-in-left").forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
 
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";
      }
    });
 
    // Animate elements with medinet-slide-in-bottom class
    document.querySelectorAll(".medinet-slide-in-bottom").forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.getBoundingClientRect().top + windowTopPosition;
      const elementBottomPosition = elementTopPosition + elementHeight;
 
      if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
 
    // Animate comparison table
    const tableContainer = document.querySelector(".medinet-table-container");
    if (tableContainer) {
      const elementTopPosition = tableContainer.getBoundingClientRect().top + windowTopPosition;
      
      if (elementTopPosition <= windowBottomPosition - 100) {
        tableContainer.classList.add("visible");
        
        document.querySelectorAll(".medinet-table-row").forEach((row, index) => {
          setTimeout(() => {
            row.classList.add("visible");
          }, 100 + index * 100);
        });
      }
    }
  }
 
  // Check animations on load and scroll
  checkIfInView();
  window.addEventListener("scroll", checkIfInView);
  window.addEventListener("resize", checkIfInView);
 
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
 }
 
 /**
 * Inicializa Bootstrap Collapse para el menú móvil
 */
 (function() {
  // Verificar si Bootstrap está disponible
  if (typeof bootstrap !== 'undefined') {
    // Inicializar todos los elementos collapse
    const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
    collapseElementList.map(function(collapseEl) {
      return new bootstrap.Collapse(collapseEl, {
        toggle: false
      });
    });
    
    // Manejar el evento de toggle del navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      navbarToggler.addEventListener('click', function() {
        const target = document.querySelector(this.getAttribute('data-bs-target'));
        if (target) {
          const bsCollapse = bootstrap.Collapse.getInstance(target) || new bootstrap.Collapse(target, {
            toggle: false
          });
          
          if (target.classList.contains('show')) {
            bsCollapse.hide();
          } else {
            bsCollapse.show();
          }
        }
      });
    }
  } else {
    console.warn('Bootstrap JavaScript no está cargado. Algunas funcionalidades pueden no estar disponibles.');
    
    // Implementación básica para el toggle del navbar sin Bootstrap
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      navbarToggler.addEventListener('click', function() {
        const targetId = this.getAttribute('data-bs-target') || this.getAttribute('data-target');
        const target = document.querySelector(targetId);
        
        if (target) {
          if (target.classList.contains('show')) {
            target.classList.remove('show');
            this.setAttribute('aria-expanded', 'false');
          } else {
            target.classList.add('show');
            this.setAttribute('aria-expanded', 'true');
          }
        }
      });
    }
  }
 })();
 
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-menu a, #mobile-nav a');
  const header = document.querySelector('.header');
  const accordions = document.querySelectorAll('.accordion-item');

  // Track anything with an ID now that things are wrapped in accordions
  const sections = document.querySelectorAll('#what-we-do, #how-we-work, #about, #contact-accordion, #proposal');

  // Mobile Menu Toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active', isActive);

      // Lock background scrolling on Android/iOS when menu is open
      document.body.classList.toggle('menu-open', isActive);
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileNav) mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Exclusive Accordion Toggling: closes other accordions when one is opened directly
  accordions.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        accordions.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });

  // Smooth Scrolling & Auto-Open Accordion Logic
  document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      let href = this.getAttribute('href');

      // Clean up link hash if it points to a contact anchor 
      if (href === '#contact') href = '#contact-accordion';

      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // If the target is an accordion (<details>), open it up automatically
          if (target.tagName === 'DETAILS') {
            target.open = true; // triggers the 'toggle' handler above, closing siblings
          }

          const headerHeight = header ? header.offsetHeight : 70;
          window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Header Scroll Effect & Active Section Tracker
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      // Header glassmorphism shadow activation
      if (scrollY > 50) {
        header.style.background = 'rgba(3, 3, 3, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
      } else {
        header.style.background = 'rgba(3, 3, 3, 0.8)';
        header.style.boxShadow = 'none';
      }
    }

    // Determine active section in viewport
    let currentSectionId = '';
    const headerHeight = header ? header.offsetHeight : 70;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Synchronize active states across desktop & mobile navs
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');

      // Keep "Contact" highlighting active even though the accordion ID is slightly altered
      if (currentSectionId === 'contact-accordion' && href.includes('#contact')) {
        link.classList.add('active');
      } else if (currentSectionId && href.includes(`#${currentSectionId}`)) {
        link.classList.add('active');
      }
    });
  }, { passive: true });


  /* =============================================================
     DYNAMIC 3D STACK CARDS ENGINE 
     ============================================================= */
  const container = document.querySelector('.stack-cards-container');
  if (container) {
    const cards = Array.from(container.querySelectorAll('.eagle-card'));
    let currentActiveIndex = 0;

    function updateCardStack() {
      cards.forEach((card, index) => {
        // Clear existing state layouts
        card.classList.remove('active', 'stack-back', 'stack-deep');

        // Calculate dynamic array position relative to the currently active card index
        if (index === currentActiveIndex) {
          card.classList.add('active');
        } else if (index === (currentActiveIndex + 1) % cards.length) {
          card.classList.add('stack-back');
        } else if (index === (currentActiveIndex + 2) % cards.length) {
          card.classList.add('stack-deep');
        }
      });
    }

    // Bind individual click listeners to shuffle the card order down the stack deck
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        // Cycle to the next sequential element layer index array position
        currentActiveIndex = (currentActiveIndex + 1) % cards.length;
        updateCardStack();
      });
    });

    // Initialize display arrays positions maps on document generation load lifecycle
    updateCardStack();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-menu a, #mobile-nav a');
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');

  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active', isActive);
    
    // Lock background scrolling on Android/iOS when menu is open
    document.body.classList.toggle('menu-open', isActive);
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Smooth Scrolling for Anchor Links (Adjust for Fixed Header)
  document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // If it's a hash link on the same page
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight || 70;
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

    // Header glassmorphism shadow activation
    if (scrollY > 50) {
      header.style.background = 'rgba(3, 3, 3, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.background = 'rgba(3, 3, 3, 0.8)';
      header.style.boxShadow = 'none';
    }

    // Determine active section in viewport
    let currentSectionId = '';
    const headerHeight = header.offsetHeight || 70;

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
      if (currentSectionId && href.includes(`#${currentSectionId}`)) {
        link.classList.add('active');
      }
    });
  }, { passive: true }); // passive listener for high-performance touch scrolling on Android
  // Eagle card click animation
    document.querySelectorAll('.eagle-card').forEach(function(card) {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});


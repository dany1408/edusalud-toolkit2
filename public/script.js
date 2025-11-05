// ===================================
// Menu Mobile Toggle
// ===================================
(function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle active class
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
})();

// ===================================
// FAQ Accordion
// ===================================
(function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    const otherAnswer = q.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                }
            });
            
            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
})();

// ===================================
// Google Analytics 4 Tracking
// ===================================
function trackClick(label) {
    // Check if gtag is available (GA4 loaded)
    if (typeof gtag === 'function') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': label,
            'value': 1
        });
        
        console.log('GA4 Event tracked:', label);
    } else {
        console.warn('GA4 (gtag) not loaded. Event not tracked:', label);
    }
}

// ===================================
// Track CTA Clicks
// ===================================
(function initCTATracking() {
    // Hero CTA
    const heroCTA = document.getElementById('hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            trackClick('Hero CTA - Portal Privado');
        });
    }
    
    // Bottom CTA
    const bottomCTA = document.getElementById('bottom-cta');
    if (bottomCTA) {
        bottomCTA.addEventListener('click', function() {
            trackClick('Bottom CTA - Portal Privado');
        });
    }
    
    // Nav CTA
    const navCTA = document.getElementById('nav-cta');
    if (navCTA) {
        navCTA.addEventListener('click', function() {
            trackClick('Nav CTA - Portal Privado');
        });
    }
    
    // Track all portal links
    const portalLinks = document.querySelectorAll('a[href="https://recursos.sudominio.hn"]');
    portalLinks.forEach((link, index) => {
        // Skip if already tracked by ID
        if (!link.id) {
            link.addEventListener('click', function() {
                trackClick(`Portal Link ${index + 1}`);
            });
        }
    });
})();

// ===================================
// Smooth Scroll (opcional para enlaces internos)
// ===================================
(function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
})();

// ===================================
// Accessibility: Skip to main content
// ===================================
(function initSkipLink() {
    // Add skip link if not present
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
})();

// ===================================
// Console Info
// ===================================
console.log('%c🏥 EduSalud Portal', 'color: #0066cc; font-size: 18px; font-weight: bold;');
console.log('✓ Menú móvil inicializado');
console.log('✓ FAQs accordion inicializado');
console.log('✓ Tracking GA4 configurado');
console.log('✓ Accesibilidad mejorada');


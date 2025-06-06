// Enhanced responsive navigation and interactions
document.addEventListener('DOMContentLoaded', function () {
    // Remove loading class
    document.body.classList.remove('loading');

    // Mobile navigation toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            this.setAttribute('aria-expanded',
                mobileNav.classList.contains('active') ? 'true' : 'false'
            );
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations with improved performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Enhanced typing effect for hero title
    const title = document.querySelector('.hero-text h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }

        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }

    // Optimized parallax effect for floating shapes
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shapes');

        shapes.forEach((shape, index) => {
            const rate = scrolled * -0.3 * (index + 1);
            shape.style.transform = `translateY(${rate}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced interactive hover effects with better performance
    const interactiveCards = document.querySelectorAll('.metric-card, .project-card, .experience-card, .skill-category');

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.background = 'rgba(255, 255, 255, 0.08)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
            }
        }
    });

    // Preload critical images for better performance
    const criticalImages = [
        // Add any critical image URLs here
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add loading states for better UX
    const lazyLoadElements = document.querySelectorAll('.metric-card, .project-card, .experience-card');

    lazyLoadElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.floating-shapes').forEach(shape => {
            shape.style.animation = 'none';
        });
    }

    // Performance monitoring for large screens
    if (window.innerWidth > 1920) {
        // Reduce animation complexity on very large screens
        document.documentElement.style.setProperty('--animation-scale', '0.8');
    }

    // Touch device optimizations
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Add touch-specific styles
        document.body.classList.add('touch-device');

        // Improve touch targets
        const touchTargets = document.querySelectorAll('.btn, .nav-links a, .social-link');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });
    }

    // Enhanced error handling
    window.addEventListener('error', function (e) {
        console.warn('Non-critical error:', e.error);
    });

    // Add intersection observer for performance metrics
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-viewport');
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        performanceObserver.observe(section);
    });

    // Service worker registration for better caching (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment below if you have a service worker
            // navigator.serviceWorker.register('/sw.js');
        });
    }

    // Analytics tracking (placeholder for actual implementation)
    function trackEvent(category, action, label) {
        // Replace with your analytics implementation
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // Track important interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('engagement', 'button_click', btn.textContent.trim());
        });
    });

    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('social', 'social_click', link.getAttribute('title'));
        });
    });

    // Contact form tracking
    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            const type = link.href.startsWith('mailto:') ? 'email' :
                link.href.startsWith('tel:') ? 'phone' : 'whatsapp';
            trackEvent('contact', 'contact_click', type);
        });
    });
});

// Enhanced scroll performance with throttling
let scrollTimer = null;
window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        // Add any scroll-based functionality here
    }, 150);
});

// Resize handler for responsive updates
window.addEventListener('resize', () => {
    // Handle orientation changes and resize events
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav && window.innerWidth > 768) {
        mobileNav.classList.remove('active');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Enhanced loading performance
document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
});

// Critical CSS loaded indicator
const criticalCSS = document.querySelector('style');
if (criticalCSS) {
    document.body.classList.add('css-loaded');
}

// Progressive enhancement for older browsers
if (!CSS.supports('backdrop-filter', 'blur(20px)')) {
    document.body.classList.add('no-backdrop-filter');
}

if (!CSS.supports('display', 'grid')) {
    document.body.classList.add('no-grid');
}

// Memory management for long-running sessions
const cleanup = () => {
    // Remove event listeners if needed
    window.removeEventListener('scroll', updateParallax);
};

window.addEventListener('beforeunload', cleanup);

// Enhanced PWA support
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show install button if needed
});

// Theme preference detection
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

// The site is already dark-themed, so we just acknowledge the preference
if (prefersDarkScheme.matches) {
    document.body.classList.add('user-prefers-dark');
}

// High contrast mode support
const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
if (prefersHighContrast.matches) {
    document.body.classList.add('high-contrast');
}

// Print styles optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Dynamic typing effect for hero title
const title = document.querySelector('.hero-text h1');
const text = title.textContent;
title.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shapes');

    shapes.forEach((shape, index) => {
        const rate = scrolled * -0.3 * (index + 1);
        shape.style.transform = `translateY(${rate}px)`;
    });
});

// Add interactive hover effects
document.querySelectorAll('.metric-card, .project-card, .experience-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.background = 'rgba(255, 255, 255, 0.08)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

// Enhanced SEO tracking (Google Analytics placeholder)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
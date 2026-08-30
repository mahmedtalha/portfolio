// Preloader functionality
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 500);
        }, 600);
    }
});

// Typewriter Effect for Hero Roles
class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;
        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typewriter');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        new TypeWriter(txtElement, words, 2200);
    }
});

// Navigation Sticky & Scroll Progress
const navbar = document.getElementById('navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (hamburger && closeMenu && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlTag.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentTheme = htmlTag.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlTag.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => runCounter(counter));
            
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Counter Animation Logic
function runCounter(counter) {
    if (counter.dataset.animated === 'true') return;
    counter.dataset.animated = 'true';

    const target = +counter.getAttribute('data-target');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !target) {
        counter.innerText = target;
        return;
    }

    let current = 0;
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    const inc = target / steps;

    const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
        } else {
            counter.innerText = Math.floor(current);
        }
    }, stepTime);
}

// Contact Form Interactive Handling
const contactForm = document.getElementById('portfolio-contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            formStatus.style.color = 'var(--primary-color)';
            formStatus.innerHTML = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = origText;
                formStatus.innerHTML = '';
            }, 5000);
        }, 1200);
    });
}

const portfolioData = window.portfolioData;

function hydratePortfolioData() {
    if (!portfolioData) {
        console.error('Shared portfolio data failed to load.');
        return;
    }

    document.querySelectorAll('[data-stat]').forEach(card => {
        const stat = portfolioData.statistics[card.dataset.stat];
        if (!stat) return;
        const counter = card.querySelector('.counter');
        const suffix = card.querySelector('.plus');
        const label = card.querySelector('p');
        const context = card.querySelector('.stat-sub');
        if (counter) {
            counter.dataset.target = String(stat.value);
            counter.textContent = String(stat.value);
        }
        if (suffix) suffix.textContent = stat.suffix;
        if (label) label.textContent = stat.label;
        if (context) context.textContent = stat.context;
    });

    document.querySelectorAll('[data-skill-group]').forEach(container => {
        const skills = portfolioData.skills[container.dataset.skillGroup];
        if (!Array.isArray(skills)) return;
        container.replaceChildren(...skills.map(skill => {
            const tag = document.createElement('span');
            tag.textContent = skill;
            return tag;
        }));
    });

    const projectsById = new Map(portfolioData.projects.map(project => [project.id, project]));
    document.querySelectorAll('[data-project-id]').forEach(card => {
        const project = projectsById.get(card.dataset.projectId);
        if (!project) return;
        const title = card.querySelector('h3');
        const techStack = card.querySelector('.project-tech .tech-stack');
        if (title) title.textContent = project.name;
        if (techStack) {
            techStack.replaceChildren(...project.technologies.map(technology => {
                const tag = document.createElement('span');
                tag.textContent = technology;
                return tag;
            }));
        }
        card.dataset.category = project.categories.join(' ');
    });

    const experienceById = new Map(portfolioData.experience.map(item => [item.id, item]));
    document.querySelectorAll('[data-experience-id]').forEach(item => {
        const experience = experienceById.get(item.dataset.experienceId);
        if (!experience) return;
        const title = item.querySelector('.timeline-header h3');
        const organization = item.querySelector('.timeline-header h4');
        const dates = item.querySelector('.timeline-date');
        const bulletList = item.querySelector('.timeline-content > ul');
        if (title) title.textContent = experience.role;
        if (organization) organization.textContent = experience.organization;
        if (dates) dates.textContent = experience.dates;
        if (bulletList && Array.isArray(experience.bullets)) {
            bulletList.replaceChildren(...experience.bullets.map(bullet => {
                const listItem = document.createElement('li');
                listItem.textContent = bullet;
                return listItem;
            }));
        }
    });

    document.querySelectorAll('[data-experience-group]').forEach(group => {
        const ids = group.dataset.experienceGroup.split(',');
        group.querySelectorAll('.experience-role').forEach((role, index) => {
            const experience = experienceById.get(ids[index]);
            if (!experience) return;
            const title = role.querySelector('h5');
            const summary = role.querySelector('p');
            if (title) title.textContent = `${experience.organization} — ${experience.role}`;
            if (summary) summary.textContent = experience.summary;
        });
    });

    const certificationsById = new Map(portfolioData.certifications.map(item => [item.id, item]));
    document.querySelectorAll('[data-certification-id]').forEach(card => {
        const certification = certificationsById.get(card.dataset.certificationId);
        if (!certification) return;
        const title = card.querySelector('h4');
        const issuer = card.querySelector('.cert-issuer');
        const detail = card.querySelector('.cert-detail');
        if (title) title.textContent = certification.name;
        if (issuer) issuer.textContent = certification.issuer;
        if (detail) detail.textContent = certification.detail;
    });
}

hydratePortfolioData();

// Force page to start from top on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Preloader functionality
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => preloader.remove(), 100);
        }, 50);
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
    const setMobileMenu = (isOpen) => {
        mobileMenu.classList.toggle('active', isOpen);
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        mobileMenu.inert = !isOpen;
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) closeMenu.focus();
    };

    hamburger.addEventListener('click', () => {
        setMobileMenu(true);
    });

    closeMenu.addEventListener('click', () => {
        setMobileMenu(false);
        hamburger.focus();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setMobileMenu(false);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            setMobileMenu(false);
            hamburger.focus();
        }
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

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
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

// Accessible project filtering
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card[data-category]');
const projectsTierHeadings = document.querySelectorAll('.projects-tier-heading');

projectFilters.forEach(button => {
    button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter;

        projectFilters.forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle('active', isActive);
            filterButton.setAttribute('aria-pressed', String(isActive));
        });

        projectCards.forEach(card => {
            const categories = card.dataset.category.split(' ');
            card.hidden = selectedFilter !== 'all' && !categories.includes(selectedFilter);
        });

        projectsTierHeadings.forEach(heading => {
            heading.hidden = selectedFilter !== 'all';
        });
    });
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

    const duration = 850; // 0.3 seconds longer for a more readable count-up
    const startTime = performance.now();
    const numberHeading = counter.closest('h3');

    counter.innerText = '0';
    numberHeading?.classList.add('is-counting');

    function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Snappy ease-out curve
        const currentValue = Math.floor(easeProgress * target);

        counter.innerText = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target.toLocaleString();
            numberHeading?.classList.remove('is-counting');
            numberHeading?.classList.add('count-complete');
        }
    }

    requestAnimationFrame(updateCounter);
}

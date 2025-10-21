const scrollButtons = document.querySelectorAll('[data-scroll-to]');
const aromaCards = document.querySelectorAll('.aroma-card');
const accordionItems = document.querySelectorAll('.accordion-item');
const navbar = document.getElementById('navbar');
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

scrollButtons.forEach(button => {
    button.addEventListener('click', event => {
        const selector = event.currentTarget.getAttribute('data-scroll-to');
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.classList.add('navbar--compact');
        } else {
            navbar.classList.remove('navbar--compact');
        }
    });
}, { threshold: 0.1 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

aromaCards.forEach(card => {
    card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        aromaCards.forEach(item => item.classList.remove('active'));
        if (!isActive) {
            card.classList.add('active');
        }
    });
    card.addEventListener('keypress', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
    card.setAttribute('tabindex', '0');
});

accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', () => toggleAccordion(item, panel, trigger));
    trigger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleAccordion(item, panel, trigger);
        }
    });
});

function toggleAccordion(item, panel, trigger) {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    accordionItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        const otherPanel = otherItem.querySelector('.accordion-panel');
        otherItem.classList.remove('active');
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherPanel.style.maxHeight = null;
    });

    if (!expanded) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }
}

// subtle parallax on hero stats and cards
const parallaxElements = document.querySelectorAll('.card, .aroma-card, .timeline-card, .product-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches && parallaxElements.length) {
    document.addEventListener('mousemove', event => {
        const { innerWidth, innerHeight } = window;
        const xPos = (event.clientX / innerWidth - 0.5) * 10;
        const yPos = (event.clientY / innerHeight - 0.5) * 10;

        parallaxElements.forEach(el => {
            el.style.setProperty('--tilt-x', `${yPos}`);
            el.style.setProperty('--tilt-y', `${-xPos}`);
        });
    });

    // apply the tilt transform in CSS via perspective
    parallaxElements.forEach(el => {
        el.style.transition = 'transform 0.3s ease';
        el.addEventListener('mouseenter', () => {
            el.style.transform = `perspective(800px) rotateX(calc(var(--tilt-x, 0) * 1deg)) rotateY(calc(var(--tilt-y, 0) * 1deg)) translateY(-6px)`;
        });
        el.addEventListener('mousemove', () => {
            el.style.transform = `perspective(800px) rotateX(calc(var(--tilt-x, 0) * 1deg)) rotateY(calc(var(--tilt-y, 0) * 1deg)) translateY(-6px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
}

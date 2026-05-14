document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initSectionReveal();
    initCounterAnimation();
    initNavbar();
    initHeroSlider();
    initSmoothScroll();
    initMegaMenu();
    initContactForm();
    initEscapeHandler();
    initProgressBar();
    initParallax();
    initRippleEffect();
    initCursorGlow();
    initCardTilt();
});

/* ── Mobile Menu ── */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const backdrop = document.getElementById('navBackdrop');

    if (!menuToggle || !navLinks) return;

    function openMenu() {
        navLinks.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuToggle.setAttribute('aria-expanded', 'true');
        const svg = menuToggle.querySelector('svg');
        svg.innerHTML = `
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        `;
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        const svg = menuToggle.querySelector('svg');
        svg.innerHTML = `
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        `;
    }

    menuToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ── Scroll Reveal Animations ── */
function initScrollAnimations() {
    const selectors = '.fade-up, .fade-left, .fade-right, .scale-in, .zoom-in';
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

/* ── Section Entrance Reveal ── */
function initSectionReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '-40px', threshold: 0.1 });

    sections.forEach(el => observer.observe(el));
}

/* ── Counter Animation ── */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target;
        }
    };

    updateCounter();
}

/* ── Navbar Shrink on Scroll ── */
function initNavbar() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        nav.classList.toggle('scrolled', currentScroll > 100);
    }, { passive: true });
}

/* ── Hero Slider ── */
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    const progressContainer = slider.querySelector('.slider-progress');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000;

    const goToSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        if (progressContainer) {
            progressContainer.classList.remove('animate');
            void progressContainer.offsetWidth;
            progressContainer.classList.add('animate');
        }
        currentSlide = index;
    };

    const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { goToSlide(index); resetAutoSlide(); });
    });

    const startAutoSlide = () => { autoSlideInterval = setInterval(nextSlide, slideDuration); };
    const resetAutoSlide = () => { clearInterval(autoSlideInterval); startAutoSlide(); };

    goToSlide(0);
    startAutoSlide();

    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoSlide();
        }
    }
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = window.innerWidth <= 1023 ? 60 : 72;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

/* ── Mega Menu ── */
function initMegaMenu() {
    const hasMega = document.querySelector('.has-mega');
    if (!hasMega) return;

    hasMega.querySelector('.mega-link').addEventListener('click', function(e) {
        if (window.innerWidth <= 1023) {
            e.preventDefault();
            hasMega.classList.toggle('active');
        }
    });

    document.addEventListener('click', function(e) {
        if (!hasMega.contains(e.target) && window.innerWidth <= 1023) {
            hasMega.classList.remove('active');
        }
    });
}

/* ── Contact Form ── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Enviado';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.pointerEvents = '';
            btn.style.opacity = '';
            form.reset();
        }, 2500);
    });
}

/* ── Escape Key Handler ── */
function initEscapeHandler() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) {
                menuToggle.click();
            }
            const hasMega = document.querySelector('.has-mega');
            if (hasMega && hasMega.classList.contains('active')) {
                hasMega.classList.remove('active');
            }
        }
    });
}

/* ── Reading Progress Bar ── */
function initProgressBar() {
    const bar = document.getElementById('progressBarTop');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
}

/* ── Hero Parallax ── */
function initParallax() {
    const hero = document.getElementById('heroSlider');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        if (offset <= window.innerHeight) {
            const slides = hero.querySelectorAll('.slide-bg');
            slides.forEach(slide => {
                slide.style.backgroundPositionY = (offset * 0.3) + 'px';
            });
        }
    }, { passive: true });
}

/* ── Button Click Ripple ── */
function initRippleEffect() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const existing = this.querySelector('.ripple');
            if (existing) existing.remove();

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ── Cursor Glow ── */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let rafId = null;

    glow.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) {
            rafId = requestAnimationFrame(updateGlow);
        }
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        glow.style.opacity = '1';
    });

    function updateGlow() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        rafId = null;
        if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
            rafId = requestAnimationFrame(updateGlow);
        }
    }
}

/* ── Card 3D Tilt on Hover ── */
function initCardTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

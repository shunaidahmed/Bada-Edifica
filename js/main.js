// Bada Edifica - Main JavaScript
// Interactive animations and functionality

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initNavbar();
    initHeroSlider();
    initSmoothScroll();
    initMegaMenu();
});

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const svg = menuToggle.querySelector('svg');
        if (navLinks.classList.contains('active')) {
            svg.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            `;
        } else {
            svg.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            `;
        }
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const svg = menuToggle.querySelector('svg');
            svg.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            `;
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    if (!fadeElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (!counters.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = (el) => {
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
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(el => observer.observe(el));
}

// Navbar Effect
function initNavbar() {
    const nav = document.getElementById('nav');
    
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Hero Slider
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    const progressBar = slider.querySelector('.progress-bar');
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
        
        // Reset and animate progress bar
        progressContainer.classList.remove('animate');
        void progressContainer.offsetWidth; // Trigger reflow
        progressContainer.classList.add('animate');
        
        currentSlide = index;
    };
    
    const nextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    };
    
    const prevSlide = () => {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    };
    
    // Arrow navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Auto slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    };
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };
    
    // Initialize first slide
    goToSlide(0);
    startAutoSlide();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = 72;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mega Menu Mobile Toggle
function initMegaMenu() {
    const hasMega = document.querySelector('.has-mega');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!hasMega) return;
    
    // On mobile, toggle mega menu on click
    hasMega.querySelector('.mega-link').addEventListener('click', function(e) {
        if (window.innerWidth <= 1023) {
            e.preventDefault();
            hasMega.classList.toggle('active');
        }
    });
    
    // Close mega menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hasMega.contains(e.target) && window.innerWidth <= 1023) {
            hasMega.classList.remove('active');
        }
    });
}
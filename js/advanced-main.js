/**
 * BADA EDIFICA - Advanced Interactions
 * Modern, smooth animations and interactions
 */

// =========================================
// Utility: Smooth Scroll
// =========================================
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========================================
// Hero Slider with Advanced Transitions
// =========================================
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dots button');
        this.prevBtn = document.querySelector('.nav-arrows .prev');
        this.nextBtn = document.querySelector('.nav-arrows .next');
        this.current = 0;
        this.interval = null;
        this.slideData = [
            { title: 'Bada Edifica', subtitle: 'Professional Building Solutions' },
            { title: 'Construction Experts', subtitle: 'Quality You Can Trust' },
            { title: 'Electrical & Plumbing', subtitle: 'Certified Installations' },
            { title: 'Renovations', subtitle: 'Transform Your Space' },
            { title: 'Fire Safety Systems', subtitle: 'Detection & Protection' }
        ];
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.startAutoPlay();

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.goToSlide(this.current === 0 ? this.slides.length - 1 : this.current - 1);
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.goToSlide((this.current + 1) % this.slides.length);
            });
        }

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => this.stopAutoPlay());
            hero.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        if (index === this.current) return;

        this.slides[this.current].classList.remove('active');
        if (this.dots[this.current]) {
            this.dots[this.current].classList.remove('active');
        }

        this.current = index;

        this.slides[this.current].classList.add('active');
        if (this.dots[this.current]) {
            this.dots[this.current].classList.add('active');
        }

        // Update text content
        const titleEl = document.getElementById('slide-title');
        const subtitleEl = document.getElementById('slide-subtitle');
        if (titleEl) {
            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateY(20px)';
            setTimeout(() => {
                titleEl.textContent = this.slideData[index].title;
                titleEl.style.transition = 'all 0.5s ease';
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
            }, 300);
        }
        if (subtitleEl) {
            subtitleEl.style.opacity = '0';
            setTimeout(() => {
                subtitleEl.textContent = this.slideData[index].subtitle;
                subtitleEl.style.transition = 'all 0.5s ease 0.1s';
                subtitleEl.style.opacity = '0.75';
            }, 300);
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => {
            this.goToSlide((this.current + 1) % this.slides.length);
        }, 6000);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// =========================================
// Mobile Menu with Smooth Animation
// =========================================
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.menu-btn');
        this.navWrapper = document.querySelector('.nav-wrapper');
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.navWrapper) return;

        this.menuBtn.addEventListener('click', () => {
            this.navWrapper.classList.toggle('open');
            this.menuBtn.classList.toggle('active');
        });

        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.navWrapper.classList.remove('open');
                this.menuBtn.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.navWrapper.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.navWrapper.classList.remove('open');
                this.menuBtn.classList.remove('active');
            }
        });
    }
}

// =========================================
// Navbar Scroll Effect with Throttle
// =========================================
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateNavbar();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    updateNavbar() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// =========================================
// Form Handling with Animation
// =========================================
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showSuccess();
            });
        }
    }

    showSuccess() {
        const formContent = document.querySelector('.contact-form-content');
        const successMsg = document.querySelector('.form-success');

        if (formContent) {
            formContent.style.opacity = '0';
            formContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                formContent.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.style.opacity = '0';
                    successMsg.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        successMsg.style.transition = 'all 0.5s ease';
                        successMsg.style.opacity = '1';
                        successMsg.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 300);
        }
    }
}

// =========================================
// Intersection Observer for Scroll Animations
// =========================================
class ScrollAnimator {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-box, .value-card, .service-item, .project-card, .why-item, .mission-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });

        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// =========================================
// Reset Form Function
// =========================================
window.resetForm = function() {
    const formContent = document.querySelector('.contact-form-content');
    const successMsg = document.querySelector('.form-success');
    const form = document.getElementById('contact-form');

    if (successMsg) {
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateY(20px)';
        setTimeout(() => {
            successMsg.style.display = 'none';
            if (formContent) {
                formContent.style.display = 'block';
                setTimeout(() => {
                    formContent.style.opacity = '1';
                    formContent.style.transform = 'translateY(0)';
                }, 50);
            }
        }, 300);
    }
    if (form) form.reset();
};

// =========================================
// Initialize All on DOM Ready
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    smoothScroll();
    new HeroSlider();
    new MobileMenu();
    new NavbarScroll();
    new FormHandler();
    new ScrollAnimator();
});

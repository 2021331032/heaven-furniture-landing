/* ============================================
   HEAVEN FURNITURE MART - JAVASCRIPT
   Frontend Interactivity & UX Enhancements
   ============================================ */

// ============================================
// 1. UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to element
 */
const smoothScroll = (element) => {
    element.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Debounce function for performance
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function for scroll events
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// ============================================
// 2. NAVIGATION - ACTIVE STATE & SCROLL
// ============================================

class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollPosition = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
        this.setupSmoothNavigation();
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Navbar backdrop effect
        if (currentScroll > 50) {
            this.navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }

        this.lastScrollPosition = currentScroll;
    }

    setupSmoothNavigation() {
        this.navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        smoothScroll(target);
                    }
                }
            });
        });
    }
}

// ============================================
// 3. BUTTON ACTIONS - CTA HANDLERS
// ============================================

class CTAManager {
    constructor() {
        this.buttons = document.querySelectorAll('[data-action]');
        this.whatsappNumber = '8801960481983';
        this.businessEmail = 'heavenfurnituremart@gmail.com';
        this.init();
    }

    init() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', (e) => this.handleButtonClick(e));
        });
    }

    handleButtonClick(e) {
        const action = e.target.getAttribute('data-action');

        if (action === 'whatsapp') {
            this.openWhatsApp();
        } else if (action === 'email') {
            this.openEmail();
        }
    }

    openWhatsApp() {
        const message = encodeURIComponent(
            "Hi Heaven Furniture Mart, I'd like to know more about your bespoke furniture services and would love a free consultation."
        );
        window.open(
            `https://wa.me/${this.whatsappNumber}?text=${message}`,
            '_blank'
        );
    }

    openEmail() {
        const subject = encodeURIComponent('Bespoke Furniture Inquiry - Heaven Furniture Mart');
        const body = encodeURIComponent(
            'Hello,\n\nI am interested in learning more about your bespoke furniture services. Could you please provide more information about your design consultation process?\n\nLooking forward to hearing from you.\n\nBest regards'
        );
        window.location.href = `mailto:${this.businessEmail}?subject=${subject}&body=${body}`;
    }
}

// ============================================
// 4. SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ============================================

class ScrollAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll(
            '.trust-card, .collection-card, .bespoke-spotlight, .proof-quote, .stat'
        );
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.elements.forEach((element) => observer.observe(element));
    }

    animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// ============================================
// 5. LAZY LOADING - IMAGES
// ============================================

class LazyLoadManager {
    constructor() {
        this.images = document.querySelectorAll('img[src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.addEventListener('load', () => {
                            img.style.transition = 'opacity 0.3s ease-in';
                            img.style.opacity = '1';
                        });
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach((img) => imageObserver.observe(img));
        }
    }
}

// ============================================
// 6. COLLECTION CARDS - HOVER EFFECTS
// ============================================

class CollectionCardManager {
    constructor() {
        this.cards = document.querySelectorAll('.collection-card');
        this.init();
    }

    init() {
        this.cards.forEach((card) => {
            card.addEventListener('mouseenter', () => this.onCardHover(card));
        });
    }

    onCardHover(card) {
        const image = card.querySelector('.collection-image img');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    }
}

// ============================================
// 7. COUNTER ANIMATION - STATISTICS
// ============================================

class CounterAnimationManager {
    constructor() {
        this.stats = document.querySelectorAll('.stat h3');
        this.hasAnimated = false;
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const statsSection = document.querySelector('.proof-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.stats.forEach((stat) => {
            const text = stat.textContent;
            const finalValue = parseInt(text) || text;

            if (typeof finalValue === 'number') {
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 30);
                const interval = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue;
                        clearInterval(interval);
                    } else {
                        stat.textContent = currentValue;
                    }
                }, 30);
            }
        });
    }
}

// ============================================
// 8. MOBILE MENU - RESPONSIVE NAV
// ============================================

class MobileMenuManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinksContainer = document.querySelector('.navbar-links');
        this.init();
    }

    init() {
        // Add mobile menu toggle if needed
        if (window.innerWidth < 768) {
            this.setupMobileMenu();
        }

        window.addEventListener('resize', debounce(() => this.handleResize(), 250));
    }

    setupMobileMenu() {
        // Mobile menu implementation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                // Close menu after click on mobile
                if (window.innerWidth < 768) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    closeMobileMenu() {
        // Implementation for closing mobile menu
    }

    handleResize() {
        // Handle responsive behavior
    }
}

// ============================================
// 9. ACCESSIBILITY - KEYBOARD NAVIGATION
// ============================================

class AccessibilityManager {
    constructor() {
        this.buttons = document.querySelectorAll('button, a[href], [role="button"]');
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        this.improveButtonAccessibility();
    }

    handleKeyboardNavigation(e) {
        // Escape key closes modals/popovers if needed
        if (e.key === 'Escape') {
            // Handle escape key
        }

        // Tab navigation is handled by browser
    }

    improveButtonAccessibility() {
        this.buttons.forEach((button) => {
            if (!button.getAttribute('aria-label') && button.textContent.trim()) {
                // Ensure buttons have accessible names
                if (!button.getAttribute('role')) {
                    button.setAttribute('role', 'button');
                }
            }
        });
    }
}

// ============================================
// 10. PERFORMANCE - RESOURCE HINTS
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.monitorPerformance();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            // Add loading="lazy" for native lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    monitorPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime =
                    perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    }
}

// ============================================
// 11. ANALYTICS - EVENT TRACKING
// ============================================

class AnalyticsManager {
    constructor() {
        this.trackingEnabled = true;
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackCTAClicks();
        this.trackScrollDepth();
    }

    trackPageView() {
        if (this.trackingEnabled && window.gtag) {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_path: window.location.pathname,
            });
        }
    }

    trackCTAClicks() {
        const buttons = document.querySelectorAll('[data-action]');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                if (this.trackingEnabled && window.gtag) {
                    gtag('event', 'cta_click', {
                        button_action: action,
                        button_text: e.target.textContent,
                    });
                }
            });
        });
    }

    trackScrollDepth() {
        let maxScrollDepth = 0;
        const trackScroll = throttle(() => {
            const scrollDepth =
                (window.scrollY /
                    (document.documentElement.scrollHeight - window.innerHeight)) *
                100;
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (
                    this.trackingEnabled &&
                    window.gtag &&
                    maxScrollDepth % 25 === 0
                ) {
                    gtag('event', 'scroll_depth', {
                        scroll_percentage: Math.round(scrollDepth),
                    });
                }
            }
        }, 250);

        window.addEventListener('scroll', trackScroll);
    }
}

// ============================================
// 12. INITIALIZATION - APP BOOT
// ============================================

class ApplicationBootstrap {
    static init() {
        // Initialize all managers
        new NavigationManager();
        new CTAManager();
        new ScrollAnimationManager();
        new LazyLoadManager();
        new CollectionCardManager();
        new CounterAnimationManager();
        new MobileMenuManager();
        new AccessibilityManager();
        new PerformanceOptimizer();
        new AnalyticsManager();

        console.log('✨ Heaven Furniture Mart - Landing Page Initialized');
    }
}

// ============================================
// 13. DOM READY - APPLICATION START
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ApplicationBootstrap.init();
    });
} else {
    ApplicationBootstrap.init();
}

// ============================================
// 14. SERVICE WORKER - PWA SUPPORT (Optional)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be registered here
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ============================================
// 15. EXPORT FOR MODULE SYSTEMS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationManager,
        CTAManager,
        ScrollAnimationManager,
        LazyLoadManager,
        CollectionCardManager,
        CounterAnimationManager,
        MobileMenuManager,
        AccessibilityManager,
        PerformanceOptimizer,
        AnalyticsManager,
        ApplicationBootstrap,
    };
}
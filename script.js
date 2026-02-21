// ===================================
// Smooth Scroll & Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.97)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .expertise-item, .contact-card'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(el);
    });

    // ===================================
    // Skill Progress Bar Animation
    // ===================================
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => { entry.target.style.width = targetWidth; }, 150);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isDecimal = finalValue.includes('.');
                const hasPlus = finalValue.includes('+');
                const numValue = parseFloat(finalValue);

                if (!isNaN(numValue)) {
                    const duration = 2000;
                    const steps = 60;
                    const increment = numValue / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numValue) {
                            target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            target.textContent = isDecimal
                                ? current.toFixed(2)
                                : Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, duration / steps);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ===================================
    // Project Card 3D Tilt Effect
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // ===================================
    // Cursor Trail Effect (Desktop only)
    // ===================================
    if (window.innerWidth > 768) {
        const coords = { x: 0, y: 0 };

        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 8px; height: 8px;
                border-radius: 50%;
                background: linear-gradient(135deg, #8B5CF6, #3B82F6);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                left: 0; top: 0;
            `;
            document.body.appendChild(circle);
        }

        const cursorCircles = document.querySelectorAll('.cursor-circle');

        window.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            cursorCircles.forEach((circle, index) => {
                circle.style.left = x - 4 + 'px';
                circle.style.top = y - 4 + 'px';
                circle.style.opacity = String((20 - index) / 40);
                circle.style.transform = `scale(${(20 - index) / 20})`;

                const next = cursorCircles[index + 1] || cursorCircles[0];
                x += (next.offsetLeft - x) * 0.3;
                y += (next.offsetTop - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        }

        animateCircles();
    }

    // ===================================
    // Parallax Effect for Hero Orbs
    // ===================================
    const heroOrbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        heroOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===================================
    // Page Load Fade In
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 50);
    });

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #8B5CF6;');
    console.log('%cInterested in the code? Check out: https://github.com/NavinSivakumar07', 'font-size: 14px; color: #3B82F6;');
    console.log('%cLet\'s build something amazing together! 🚀', 'font-size: 14px; color: #EC4899;');
});

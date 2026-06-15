document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolleds');
        } else {
            navbar.classList.add('scrolled');
            // Actually, keep it scrolled for a moment if we want, or just remove it:
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations (fade-up)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Slider functionality for Beyond the Code
    const slider = document.getElementById('beyondSlider');
    const prevBtn = document.querySelector('.slider-side-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-side-btn.next-btn');

    if (slider && prevBtn && nextBtn) {
        const scrollAmount = () => slider.clientWidth / 2;

        prevBtn.addEventListener('click', () => {
            if (slider.scrollLeft <= 10) {
                slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener('click', () => {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            }
        });

        // Hover to scroll continuous logic
        let scrollInterval;
        const startScrolling = (direction) => {
            clearInterval(scrollInterval);
            // Disable snapping and smooth behavior for pixel-perfect hover scrolling
            slider.style.scrollSnapType = 'none';
            slider.style.scrollBehavior = 'auto';
            
            scrollInterval = setInterval(() => {
                if (direction === 'left') {
                    if (slider.scrollLeft <= 0) {
                        slider.scrollLeft = slider.scrollWidth;
                    } else {
                        slider.scrollLeft -= 3; // Slightly faster for responsiveness
                    }
                } else {
                    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
                        slider.scrollLeft = 0;
                    } else {
                        slider.scrollLeft += 3;
                    }
                }
            }, 10);
        };

        const stopScrolling = () => {
            clearInterval(scrollInterval);
            // Re-enable snapping and smooth behavior
            slider.style.scrollSnapType = 'x mandatory';
            slider.style.scrollBehavior = 'smooth';
        };

        prevBtn.addEventListener('mouseenter', () => startScrolling('left'));
        prevBtn.addEventListener('mouseleave', stopScrolling);
        nextBtn.addEventListener('mouseenter', () => startScrolling('right'));
        nextBtn.addEventListener('mouseleave', stopScrolling);
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

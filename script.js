document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
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

        // Infinite-loop auto-scroll + auto-reveal text for "Beyond the Code" slider
(function () {
  const track = document.getElementById('beyondSlider');
  if (!track) return;

  const tiles = Array.from(track.querySelectorAll('.beyond-tile'));
  if (tiles.length === 0) return;

  // Clone the first tile and append it — this is what makes the loop seamless.
  // We scroll forward onto the clone, then silently snap back to the real
  // first tile with no animation, so it looks like it never stopped moving.
  const firstClone = tiles[0].cloneNode(true);
  firstClone.classList.add('beyond-tile-clone');
  track.appendChild(firstClone);

  const intervalMs = 1800;   // shorter timer between auto-advances
  const textDelayMs = 700;   // how long to wait before showing the text on a tile
  let autoScrollTimer;
  let textTimer;
  let isJumping = false;

  function getTileWidth() {
    return tiles[0].getBoundingClientRect().width;
  }

  function showTextFor(tile) {
    tiles.forEach(t => t.classList.remove('show-text'));
    clearTimeout(textTimer);
    textTimer = setTimeout(() => tile.classList.add('show-text'), textDelayMs);
  }

  function scrollToNext() {
    if (isJumping) return;
    track.scrollBy({ left: getTileWidth(), behavior: 'smooth' });
  }

  // Detect when scrolling has settled, and handle the loop-back + text reveal
  let scrollEndTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      const tileWidth = getTileWidth();
      const idx = Math.round(track.scrollLeft / tileWidth);

      if (idx >= tiles.length) {
        // Landed on the clone — jump back to the real first tile, instantly
        isJumping = true;
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = 0;
        requestAnimationFrame(() => {
          track.style.scrollBehavior = 'smooth';
          isJumping = false;
        });
        showTextFor(tiles[0]);
      } else {
        showTextFor(tiles[idx] || tiles[0]);
      }
    }, 150);
  }, { passive: true });

  function startAutoScroll() {
    clearInterval(autoScrollTimer);
    autoScrollTimer = setInterval(scrollToNext, intervalMs);
  }

  startAutoScroll();
  showTextFor(tiles[0]); // show text on the first tile immediately on load
})();

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

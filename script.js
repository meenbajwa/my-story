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

       // Infinite auto-scrolling "Beyond the Code" slider with auto text reveal
(function () {
  const track = document.getElementById('beyondSlider');
  if (!track) return;

  const tiles = Array.from(track.querySelectorAll('.beyond-tile'));
  if (tiles.length === 0) return;

  // Clone the first tile onto the end — lets us scroll straight past the
  // "last" tile onto a copy of the "first" tile, then silently snap back
  // with no animation. This is what removes the visible last-to-first jump.
  const firstClone = tiles[0].cloneNode(true);
  firstClone.classList.add('beyond-tile-clone');
  track.appendChild(firstClone);

  const intervalMs = 1800;
  let autoScrollTimer;
  let isJumping = false;

  function getTileWidth() {
    return tiles[0].getBoundingClientRect().width;
  }

  // Force the "hover" look onto the current tile, and remove it from others,
  // regardless of actual mouse position — text is always shown, cycling.
  function setActiveTile(tile) {
    tiles.forEach(t => t.classList.remove('force-hover'));
    tile.classList.add('force-hover');
  }

  function scrollToNext() {
    if (isJumping) return;
    track.scrollBy({ left: getTileWidth(), behavior: 'smooth' });
  }

  let scrollEndTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      const tileWidth = getTileWidth();
      const idx = Math.round(track.scrollLeft / tileWidth);

      if (idx >= tiles.length) {
        // Landed on the clone: snap back to the real first tile, instantly,
        // so it looks like the loop never stopped.
        isJumping = true;
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = 0;
        requestAnimationFrame(() => {
          track.style.scrollBehavior = 'smooth';
          isJumping = false;
        });
        setActiveTile(tiles[0]);
      } else {
        setActiveTile(tiles[idx] || tiles[0]);
      }
    }, 150);
  }, { passive: true });

  // Always running — no pause on hover, no pause on click, nothing stops it.
  autoScrollTimer = setInterval(scrollToNext, intervalMs);

  setActiveTile(tiles[0]);
})();

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

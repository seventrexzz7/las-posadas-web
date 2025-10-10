document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('book-form');

    const navbar = document.querySelector('.navbar');
    const tSection = document.querySelector('#logos');

    const items = document.querySelectorAll('.carousel-item');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 2;
    const spacing = 210;
    let startX = 0;
    let isDragging = false;

    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            updateDots();
        });
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
    }


    form.addEventListener('submit', function(e){
        e.preventDefault();

        const inDate = document.getElementById('in-date').value;
        const outDate = document.getElementById('out-date').value;
        const rooms = parseInt(document.getElementById('rooms').value);
        const adults = parseInt(document.getElementById('adults').value);
        const children = parseInt(document.getElementById('children').value);

        const url = `components/booking/booking.html?inDate=${inDate}&outDate=${outDate}&rooms=${rooms}&adults=${adults}&children=${children}`;
        console.log(url);
        window.location.href = url;
    })

    window.addEventListener('scroll', () => {
        const sTop = tSection.offsetTop;
        const sHeight = tSection.offsetHeight;
        const scrollPos = window.scrollY + navbar.offsetHeight;

        if(scrollPos >= sTop && sHeight < sTop + sHeight){
            navbar.classList.add('scrolled');
        }else{
            navbar.classList.remove('scrolled');
        }
    })

    function updateCarousel() {
        items.forEach((item, index) => {
            const offset = (index - currentIndex + items.length) % items.length;
            item.style.opacity = 0;
            item.style.zIndex = 0;
            item.style.transform = 'translateX(0) scale(0.5)';

            if (offset === 0) {
            item.style.transform = `translateX(${-spacing*2}px) scale(0.6)`;
            item.style.opacity = 0.4;
            item.style.zIndex = 1;
            } else if (offset === 1) {
            item.style.transform = `translateX(${-spacing}px) scale(0.8)`;
            item.style.opacity = 0.8;
            item.style.zIndex = 3;
            } else if (offset === 2) {
            item.style.transform = `translateX(0) scale(1)`;
            item.style.opacity = 1;
            item.style.zIndex = 5;
            } else if (offset === 3) {
            item.style.transform = `translateX(${spacing}px) scale(0.8)`;
            item.style.opacity = 0.8;
            item.style.zIndex = 3;
            } else if (offset === 4) {
            item.style.transform = `translateX(${spacing*2}px) scale(0.6)`;
            item.style.opacity = 0.4;
            item.style.zIndex = 1;
            }
        });
        updateDots();
    }

    updateCarousel();
    updateDots();

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    // ---- Drag / Swipe ----
    track.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX;
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const diff = e.clientX - startX;
        handleSwipe(diff);
    });

    track.addEventListener('mouseleave', e => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const diff = e.clientX - startX;
        handleSwipe(diff);
    });

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchmove', e => e.preventDefault());

    track.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        handleSwipe(diff);
    });

    function handleSwipe(diff) {
        const threshold = 80;
        if (diff < -threshold) nextSlide();
        else if (diff > threshold) prevSlide();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

});
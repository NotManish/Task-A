const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

let isDragging = false;
let startY;
let scrollTop;


carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.pageY - carousel.offsetTop;
    scrollTop = carousel.scrollTop;
    carousel.style.userSelect = 'none';
});



carousel.addEventListener('mouseleave', () => {
    isDragging = false;
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.userSelect = '';
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const y = e.pageY - carousel.offsetTop;
    const walk = y - startY;
    carousel.scrollTop = scrollTop - walk;
});



function updateSizes() {
    const carouselRect = carousel.getBoundingClientRect();
    const centerY = carouselRect.top + carouselRect.height / 2;

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);

        if (distance < itemRect.height / 2) {
            item.classList.add('large');
        } else {
            item.classList.remove('large');
        }
    });
}

carousel.addEventListener('scroll', updateSizes);
carousel.addEventListener('mousemove', updateSizes);
updateSizes(); 

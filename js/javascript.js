const images = [
    "../image/banner1.jpg",
    "../image/banner2.jpg",
    "../image/banner3.jpg",
    "../image/banner4.jpg"
];

let currentIndex = 0;

const slide = document.getElementById("slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


function showSlide(index) {
    slide.style.backgroundImage = `url("${images[index]}")`;
}



showSlide(currentIndex);



nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);
});



prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    showSlide(currentIndex);
});









function bulidSlider(name, options) {
    if (typeof Swiper === 'undefined') return;
    const container = document.querySelector('.' + name + '-swiper');
    if (!container) return;

    const wrapper = container.querySelector('.swiper-wrapper');
    const minSlides = options.minSlides || 0;
    delete options.minSlides;

    const originals = Array.prototype.slice.call(wrapper.children);
    let i = 0;

    while (wrapper.children.length < minSlides && originals.length) {
        wrapper.appendChild(originals[i % originals.length].cloneNode(true));
        i++;
    }

    const nav = document.querySelector('.slider-nav[data-slider="' + name + '"]');

    new Swiper('.' + name + '-swiper', Object.assign({
        loop: true,
        spaceBetween: 22,
        grabCursor: true,
        navigation: nav ? {
            nextEl: nav.querySelector('[data-dir="next"]'),
            prevEl: nav.querySelector('[data-dir="prev"]')
        } : false
    }, options));

}

// for catagories
bulidSlider('catagories', {
    minSlides: 10,
    slidesPerView: 1.2,
    breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
    }
});
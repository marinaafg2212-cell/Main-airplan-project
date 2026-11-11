// ==================================
// SKYLINE TESTIMONIAL SLIDER
// ==================================

const testimonialSlider = document.getElementById("testimonialSlider");

const testimonialPrev = document.getElementById("testimonialPrev");

const testimonialNext = document.getElementById("testimonialNext");

const testimonialProgress = document.getElementById("testimonialProgress");

const testimonialCount = document.getElementById("testimonialCount");

const testimonialCards = document.querySelectorAll(".testimonial-card");


// Get card width

function getCardStep() {

    const card = testimonialCards[0];

    if (!card) return 0;

    const gap = parseFloat(
        getComputedStyle(testimonialSlider).gap
    ) || 0;

    return card.getBoundingClientRect().width + gap;
}


// Update slider information

function updateTestimonialSlider() {

    if (!testimonialSlider || testimonialCards.length === 0) return;

    const step = getCardStep();

    const maxScroll =
        testimonialSlider.scrollWidth -
        testimonialSlider.clientWidth;

    const currentScroll = testimonialSlider.scrollLeft;

    const currentIndex = Math.min(
        testimonialCards.length,
        Math.max(1, Math.round(currentScroll / step) + 1)
    );

    const progress =
        maxScroll <= 0
        ? 100
        : ((currentScroll / maxScroll) * 100);

    testimonialProgress.style.width = progress + "%";

    testimonialCount.textContent =
        String(currentIndex).padStart(2, "0") +
        " / " +
        String(testimonialCards.length).padStart(2, "0");

    testimonialPrev.disabled = currentScroll <= 2;

    testimonialNext.disabled =
        currentScroll >= maxScroll - 2;

}


// Next Button

testimonialNext.addEventListener("click", () => {

    testimonialSlider.scrollBy({
        left: getCardStep(),
        behavior: "smooth"
    });

});


// Previous Button

testimonialPrev.addEventListener("click", () => {

    testimonialSlider.scrollBy({
        left: -getCardStep(),
        behavior: "smooth"
    });

});


// Update while scrolling

testimonialSlider.addEventListener(
    "scroll",
    updateTestimonialSlider
);


// Update after resizing

window.addEventListener(
    "resize",
    updateTestimonialSlider
);


// Initial update

updateTestimonialSlider();
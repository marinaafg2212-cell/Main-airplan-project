// ================================
// HERO SLIDER
// ================================

(function () {

    const AUTOPLAY_MS = 5500;

    function initSlider(root) {

        const slides = Array.from(
            root.querySelectorAll(".slide")
        );

        const prevBtn = root.querySelector(
            "[data-slide-prev]"
        );

        const nextBtn = root.querySelector(
            "[data-slide-next]"
        );

        if (!slides.length) return;

        let current = 0;
        let timer = null;
        let touchStartX = null;


        // Show slide
        function goTo(index) {

            current =
                (index + slides.length) %
                slides.length;

            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "is-active",
                    i === current
                );

            });
        }


        // Next
        function next() {
            goTo(current + 1);
        }


        // Previous
        function previous() {
            goTo(current - 1);
        }


        // Start autoplay
        function startAutoplay() {

            stopAutoplay();

            timer = setInterval(
                next,
                AUTOPLAY_MS
            );
        }


        // Stop autoplay
        function stopAutoplay() {

            if (timer) {
                clearInterval(timer);
            }

            timer = null;
        }


        // Buttons
        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                function () {

                    previous();
                    startAutoplay();

                }
            );

        }


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                function () {

                    next();
                    startAutoplay();

                }
            );

        }


        // Touch start
        root.addEventListener(
            "touchstart",
            function (e) {

                touchStartX =
                    e.touches[0].clientX;

                stopAutoplay();

            },
            { passive: true }
        );


        // Touch end
        root.addEventListener(
            "touchend",
            function (e) {

                if (touchStartX === null) {
                    return;
                }

                const touchEndX =
                    e.changedTouches[0].clientX;

                const deltaX =
                    touchEndX - touchStartX;


                if (Math.abs(deltaX) > 40) {

                    if (deltaX < 0) {
                        next();
                    } else {
                        previous();
                    }

                }

                touchStartX = null;

                startAutoplay();

            }
        );


        // Keyboard accessibility
        root.setAttribute(
            "tabindex",
            "0"
        );


        root.addEventListener(
            "keydown",
            function (e) {

                if (e.key === "ArrowRight") {
                    next();
                    startAutoplay();
                }

                if (e.key === "ArrowLeft") {
                    previous();
                    startAutoplay();
                }

            }
        );


        // Start slider
        goTo(0);
        startAutoplay();

    }


    // Initialize after HTML loads
    document.addEventListener(
        "DOMContentLoaded",
        function () {

            document
                .querySelectorAll(".home--swiper")
                .forEach(initSlider);

        }
    );

})();
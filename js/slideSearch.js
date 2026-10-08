// =========================================================
// DESTINATIONS SYSTEM
// =========================================================

(function () {

    const ITEMS_PER_PAGE = 8;

    let currentPage = 1;

    let filteredDestinations = [];


    // ---------------------------------------------------------
    // ELEMENTS
    // ---------------------------------------------------------

    const grid =
        document.getElementById("destinations-grid");

    const searchInput =
        document.getElementById("flight-search");

    const pagination =
        document.getElementById("destination-pagination");

    const emptyMessage =
        document.getElementById("destination-empty");


    // اگر Grid وجود نداشت، JS متوقف شود
    if (!grid) return;



    // =========================================================
    // DESTINATIONS
    // =========================================================

    const destinations = [

        {
            name:"korea"
            image: "https://picsum.photos/seed/band-e-amir/800/600"
        },


      
    ];



    // =========================================================
    // CREATE CARD
    // =========================================================

    function createCard(destination) {

        return `

            <article class="destination-card">


                <div class="destination-image">

                    <img
                        src="${destination.image}"
                        alt="${destination.name}"
                        loading="lazy"
                    >


                    <span class="province-badge">

                        <i class="fa-solid fa-globe"></i>

                        ${destination.country}

                    </span>


                    <button
                        class="favorite-btn"
                        type="button"
                        aria-label="Add to favorites"
                    >

                        <i class="fa-regular fa-heart"></i>

                    </button>

                </div>



                <div class="destination-content">


                    <span class="destination-type">

                        <i class="fa-solid fa-tag"></i>

                        ${destination.type}

                    </span>


                    <h3>
                        ${destination.name}
                    </h3>


                    <p>
                        ${destination.description}
                    </p>


                    <div class="destination-rating">

                        <span>

                            <i class="fa-solid fa-star"></i>

                            ${destination.rating}

                        </span>


                        <span>

                            (${destination.reviews} reviews)

                        </span>

                    </div>


                    <div class="destination-footer">

                        <button
                            class="explore-btn"
                            type="button"
                        >

                            Explore

                        </button>

                    </div>


                </div>

            </article>

        `;
    }



    // =========================================================
    // RENDER CARDS
    // =========================================================

    function renderCards() {

        const start =
            (currentPage - 1) * ITEMS_PER_PAGE;

        const end =
            start + ITEMS_PER_PAGE;

        const pageItems =
            filteredDestinations.slice(start, end);


        grid.innerHTML =
            pageItems.map(createCard).join("");


        if (emptyMessage) {

            emptyMessage.hidden =
                filteredDestinations.length !== 0;

        }


        renderPagination();

        initializeCardEvents();

    }



    // =========================================================
    // PAGINATION
    // =========================================================

    function renderPagination() {

        const totalPages =
            Math.ceil(
                filteredDestinations.length /
                ITEMS_PER_PAGE
            );


        pagination.innerHTML = "";


        if (totalPages <= 1) {

            return;

        }



        // PREVIOUS

        const previousButton =
            document.createElement("button");


        previousButton.className =
            "pagination-btn";


        previousButton.innerHTML = `
            <i class="fa-solid fa-chevron-left"></i>
        `;


        previousButton.disabled =
            currentPage === 1;


        previousButton.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    renderCards();

                    scrollToDestinations();

                }

            }
        );


        pagination.appendChild(
            previousButton
        );



        // PAGE NUMBERS

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement("button");


            button.className =
                "pagination-btn";


            button.textContent =
                page;


            if (page === currentPage) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    renderCards();

                    scrollToDestinations();

                }
            );


            pagination.appendChild(
                button
            );

        }



        // NEXT

        const nextButton =
            document.createElement("button");


        nextButton.className =
            "pagination-btn";


        nextButton.innerHTML = `
            <i class="fa-solid fa-chevron-right"></i>
        `;


        nextButton.disabled =
            currentPage === totalPages;


        nextButton.addEventListener(
            "click",
            function () {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderCards();

                    scrollToDestinations();

                }

            }
        );


        pagination.appendChild(
            nextButton
        );

    }



    // =========================================================
    // SCROLL
    // =========================================================

    function scrollToDestinations() {

        const section =
            document.getElementById(
                "destinations-grid"
            );


        if (!section) return;


        section.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }



    // =========================================================
    // SEARCH
    // =========================================================

    function filterDestinations() {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();


        filteredDestinations =
            destinations.filter(
                function (destination) {


                    const country =
                        destination.country
                            .toLowerCase();


                    const province =
                        destination.province
                            .toLowerCase();


                    const name =
                        destination.name
                            .toLowerCase();


                    const type =
                        destination.type
                            .toLowerCase();


                    const description =
                        destination.description
                            .toLowerCase();


                    return (

                        country.includes(
                            searchValue
                        )

                        ||

                        province.includes(
                            searchValue
                        )

                        ||

                        name.includes(
                            searchValue
                        )

                        ||

                        type.includes(
                            searchValue
                        )

                        ||

                        description.includes(
                            searchValue
                        )

                    );

                }
            );


        currentPage = 1;

        renderCards();

    }



    // =========================================================
    // FAVORITE BUTTON
    // =========================================================

    function initializeCardEvents() {

        const favoriteButtons =
            document.querySelectorAll(
                ".favorite-btn"
            );


        favoriteButtons.forEach(
            function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        const icon =
                            this.querySelector("i");


                        icon.classList.toggle(
                            "fa-regular"
                        );


                        icon.classList.toggle(
                            "fa-solid"
                        );


                        this.classList.toggle(
                            "is-favorite"
                        );

                    }
                );

            }
        );

    }



    // =========================================================
    // SEARCH BUTTON
    // =========================================================

    const searchButton =
        document.getElementById(
            "search-btn"
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                filterDestinations();

                const destinationSection =
                    document.getElementById(
                        "destinations-grid"
                    );


                if (destinationSection) {

                    destinationSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    // =========================================================
    // LIVE SEARCH
    // =========================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterDestinations
        );

    }



    // =========================================================
    // INITIAL LOAD
    // =========================================================

    filteredDestinations =
        [...destinations];


    renderCards();


})();
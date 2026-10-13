document.addEventListener("DOMContentLoaded", function () {
  

    const fromSelect = document.getElementById("from-country");
    const toSelect = document.getElementById("to-country");
    const swapButton = document.getElementById("swap-btn");
    const departDate = document.getElementById("depart-date");
    const returnDate = document.getElementById("return-date");
    const cabinClass = document.getElementById("cabin-class");
    const passengerType = document.getElementById("passenger-type");
    const searchForm = document.getElementById("flight-search-form");
    const searchButton = document.getElementById("search-flight-btn");
    const formMessage = document.getElementById("form-message");
    const flightList = document.getElementById("flight-list");
    const resultsSummary = document.getElementById("results-summary");
    const resultsCount = document.getElementById("results-count");
    const airlineFilters = document.getElementById("airline-filters");
    const clearFiltersButton = document.getElementById("clear-filters");
    const sortSelect = document.getElementById("sort-flights");
    const pagination = document.getElementById("pagination");



    const countries = [
        { name: "Afghanistan", code: "AF" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Belgium", code: "BE" },
        { name: "Canada", code: "CA" },
        { name: "China", code: "CN" },
        { name: "Denmark", code: "DK" },
        { name: "Egypt", code: "EG" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Italy", code: "IT" },
        { name: "Japan", code: "JP" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kuwait", code: "KW" },
        { name: "Malaysia", code: "MY" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Qatar", code: "QA" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Singapore", code: "SG" },
        { name: "South Korea", code: "KR" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Thailand", code: "TH" },
        { name: "Turkey", code: "TR" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "Uzbekistan", code: "UZ" }
    ];

    const airlines = [
        "Skyline Airways",
        "Emirates",
        "Qatar Airways",
        "Turkish Airlines",
        "FlyDubai",
        "Air India",
        "Lufthansa",
        "Etihad Airways"
    ];

    let allFlights = [];
    let hasSearched = false;


    function populateCountries(selectElement) {
        countries.forEach(function (country) {
            const option = document.createElement("option");
            option.value = country.name;
            option.textContent = country.name;
            selectElement.appendChild(option);
        });
    }

    populateCountries(fromSelect);
    populateCountries(toSelect);

    fromSelect.value = "Afghanistan";
    toSelect.value = "United Arab Emirates";


    function getLocalDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const today = getLocalDateString(new Date());

    departDate.min = today;
    returnDate.min = today;

    departDate.addEventListener("change", function () {
        returnDate.min = departDate.value || today;

        if (
            returnDate.value &&
            departDate.value &&
            returnDate.value < departDate.value
        ) {
            returnDate.value = departDate.value;
        }
    });



    function updateTripType() {
        const selectedTrip = document.querySelector(
            'input[name="tripType"]:checked'
        );

        const isRoundTrip =
            selectedTrip && selectedTrip.value === "roundtrip";

        returnDate.disabled = !isRoundTrip;
        returnDate.required = Boolean(isRoundTrip);

        if (!isRoundTrip) {
            returnDate.value = "";
        }
    }

    document.querySelectorAll('input[name="tripType"]').forEach(function (radio) {
        radio.addEventListener("change", updateTripType);
    });

    updateTripType();

 

    swapButton.addEventListener("click", function () {
        const oldFrom = fromSelect.value;

        fromSelect.value = toSelect.value;
        toSelect.value = oldFrom;
    });



    function getCountryCode(countryName) {
        const country = countries.find(function (item) {
            return item.name === countryName;
        });

        return country ? country.code : "---";
    }

    function formatTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60) % 24;
        const minutes = totalMinutes % 60;

        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0")
        );
    }

    function getDurationText(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes}m`;
    }

    function getTimePeriod(time) {
        const hour = Number(time.split(":")[0]);

        if (hour >= 5 && hour < 12) {
            return "morning";
        }

        if (hour >= 12 && hour < 18) {
            return "afternoon";
        }

        return "evening";
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const replacements = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return replacements[character];
        });
    }



    function generateFlights(from, to, selectedClass, selectedPassenger) {
        const basePrices = [
            230, 310, 275, 360, 195, 420, 340, 290
        ];

        const departureTimes = [
            390, 485, 625, 750, 890, 1020, 1125, 1290
        ];

        const durations = [
            150, 185, 210, 165, 240, 195, 225, 175
        ];

        const classMultiplier = {
            "Economy": 1,
            "Business": 2.4,
            "First Class": 4
        };

        const multiplier = classMultiplier[selectedClass] || 1;

        return airlines.map(function (airline, index) {
            const departureMinutes = departureTimes[index];
            const duration = durations[index];

            const arrivalMinutes =
                (departureMinutes + duration) % (24 * 60);

            const basePrice = basePrices[index];

            return {
                id: `flight-${index + 1}`,
                airline: airline,
                from: from,
                to: to,
                departure: formatTime(departureMinutes),
                arrival: formatTime(arrivalMinutes),
                duration: duration,
                price: Math.round(basePrice * multiplier),
                cabin: selectedClass,
                passenger: selectedPassenger,
                period: getTimePeriod(formatTime(departureMinutes)),
                stops: index % 3 === 0 ? 1 : 0
            };
        });
    }



    function createAirlineFilters() {
        airlineFilters.innerHTML = "";

        const uniqueAirlines = [
            ...new Set(allFlights.map(function (flight) {
                return flight.airline;
            }))
        ];

        uniqueAirlines.forEach(function (airline, index) {
            const label = document.createElement("label");
            label.className = "airline-option";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "airline-filter";
            checkbox.value = airline;
            checkbox.id = `airline-${index}`;

            const text = document.createElement("span");
            text.textContent = airline;

            label.appendChild(checkbox);
            label.appendChild(text);
            airlineFilters.appendChild(label);

            checkbox.addEventListener("change", applyFilters);
        });
    }


    function renderFlights(flights) {
        flightList.innerHTML = "";

        if (flights.length === 0) {
            flightList.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-plane-slash"></i>
                    <h3>No flights found</h3>
                    <p>Try changing your departure time or airline filters.</p>
                </div>
            `;

            resultsCount.textContent = "No matching demo flights.";
            return;
        }

        flights.forEach(function (flight) {
            const card = document.createElement("article");
            card.className = "flight-card";

            const fromCode = getCountryCode(flight.from);
            const toCode = getCountryCode(flight.to);

            const stopText = flight.stops === 0
                ? "Non-stop"
                : "1 stop";

            card.innerHTML = `
                <div class="flight-top">
                    <div class="airline-name">
                        <div class="airline-symbol">
                            <i class="fa-solid fa-plane"></i>
                        </div>
                        <div>
                            <div>${escapeHTML(flight.airline)}</div>
                            <small style="color:#8291a0;font-size:10px;">
                                ${escapeHTML(flight.cabin)}
                            </small>
                        </div>
                    </div>

                    <span class="flight-badge">${stopText}</span>
                </div>

                <div class="flight-route">
                    <div>
                        <div class="route-time">${flight.departure}</div>
                        <span class="route-city">
                            ${escapeHTML(fromCode)} · ${escapeHTML(flight.from)}
                        </span>
                    </div>

                    <div class="route-middle">
                        <span>${getDurationText(flight.duration)}</span>
                        <div class="route-line">
                            <i class="fa-solid fa-plane"></i>
                        </div>
                        <span>${stopText}</span>
                    </div>

                    <div class="route-end">
                        <div class="route-time">${flight.arrival}</div>
                        <span class="route-city">
                            ${escapeHTML(toCode)} · ${escapeHTML(flight.to)}
                        </span>
                    </div>
                </div>

                <div class="flight-bottom">
                    <div class="flight-details">
                        <span>
                            <i class="fa-regular fa-clock"></i>
                            ${getDurationText(flight.duration)}
                        </span>

                        <span>
                            <i class="fa-solid fa-user"></i>
                            ${escapeHTML(flight.passenger)}
                        </span>

                        <span>
                            <i class="fa-solid fa-suitcase"></i>
                            ${escapeHTML(flight.cabin)}
                        </span>
                    </div>

                    <div class="price-block">
                        <div class="price">
                            $${flight.price.toLocaleString("en-US")}
                        </div>
                        <span class="price-note">Demo price per passenger</span>
                        <button type="button"
                            class="select-flight"
                            data-flight-id="${flight.id}">
                            Book Flight
                        </button>
                    </div>
                </div>
            `;

            flightList.appendChild(card);
        });

        resultsCount.textContent =
            `${flights.length} demo flight option(s) shown.`;
    }

  

    function applyFilters() {
        if (!hasSearched) {
            return;
        }

        const selectedTimes = Array.from(
            document.querySelectorAll(".time-filter:checked")
        ).map(function (checkbox) {
            return checkbox.value;
        });

        const selectedAirlines = Array.from(
            document.querySelectorAll(".airline-filter:checked")
        ).map(function (checkbox) {
            return checkbox.value;
        });

        let filteredFlights = allFlights.filter(function (flight) {
            const timeMatches =
                selectedTimes.length === 0 ||
                selectedTimes.includes(flight.period);

            const airlineMatches =
                selectedAirlines.length === 0 ||
                selectedAirlines.includes(flight.airline);

            return timeMatches && airlineMatches;
        });

        const sortValue = sortSelect.value;

        if (sortValue === "price-low") {
            filteredFlights.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (sortValue === "price-high") {
            filteredFlights.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (sortValue === "duration") {
            filteredFlights.sort(function (a, b) {
                return a.duration - b.duration;
            });
        }

        renderFlights(filteredFlights);
    }

    document.querySelectorAll(".time-filter").forEach(function (checkbox) {
        checkbox.addEventListener("change", applyFilters);
    });

    sortSelect.addEventListener("change", applyFilters);

    clearFiltersButton.addEventListener("click", function () {
        document.querySelectorAll(".time-filter, .airline-filter")
            .forEach(function (checkbox) {
                checkbox.checked = false;
            });

        sortSelect.value = "recommended";
        applyFilters();
    });



    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        formMessage.textContent = "";

        const from = fromSelect.value;
        const to = toSelect.value;
        const departure = departDate.value;
        const returnValue = returnDate.value;
        const selectedTrip = document.querySelector(
            'input[name="tripType"]:checked'
        );

        const isRoundTrip =
            selectedTrip && selectedTrip.value === "roundtrip";

        if (!from || !to) {
            formMessage.textContent =
                "Please select your origin and destination.";
            return;
        }

        if (from === to) {
            formMessage.textContent =
                "Origin and destination must be different.";
            return;
        }

        if (!departure) {
            formMessage.textContent =
                "Please choose your departure date.";
            return;
        }

        if (departure < today) {
            formMessage.textContent =
                "Departure date cannot be in the past.";
            return;
        }

        if (isRoundTrip && !returnValue) {
            formMessage.textContent =
                "Please choose your return date.";
            return;
        }

        if (isRoundTrip && returnValue < departure) {
            formMessage.textContent =
                "Return date cannot be before departure.";
            return;
        }

        allFlights = generateFlights(
            from,
            to,
            cabinClass.value,
            passengerType.value
        );

        hasSearched = true;

        document.querySelectorAll(".time-filter").forEach(function (checkbox) {
            checkbox.checked = false;
        });

        sortSelect.value = "recommended";

        createAirlineFilters();

        const tripText = isRoundTrip ? "Round trip" : "One way";

        resultsSummary.textContent =
            `${from} → ${to} · ${departure}` +
            (isRoundTrip ? ` · Return ${returnValue}` : "") +
            ` · ${tripText} · ${passengerType.value} · ${cabinClass.value}`;

        applyFilters();

        document.getElementById("results-section").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });


    flightList.addEventListener("click", function (event) {
        const button = event.target.closest(".select-flight");

        if (!button) {
            return;
        }

        const flight = allFlights.find(function (item) {
            return item.id === button.dataset.flightId;
        });

        if (!flight) {
            return;
        }

    //    remove

        if (confirmed) {
            button.textContent = "Selected";
            button.disabled = true;
            button.style.opacity = "0.7";
        }
    });
});
let currentPage = 1;
const flightsPerPage = 3;

function renderFlights(flights) {
    flightList.innerHTML = "";
    pagination.innerHTML = "";

    if (flights.length === 0) {
        flightList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-plane-slash"></i>
                <h3>No flights found</h3>
                <p>Try changing your departure time or airline filters.</p>
            </div>
        `;

        resultsCount.textContent = "No matching demo flights.";
        return;
    }

    const totalPages = Math.ceil(flights.length / flightsPerPage);

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * flightsPerPage;
    const pageFlights = flights.slice(
        startIndex,
        startIndex + flightsPerPage
    );

    pageFlights.forEach(function (flight) {
        const card = document.createElement("article");
        card.className = "flight-card";

        const fromCode = getCountryCode(flight.from);
        const toCode = getCountryCode(flight.to);

        const stopText = flight.stops === 0 ? "Non-stop" : "1 stop";

        card.innerHTML = `
            <div class="flight-top">
                <div class="airline-name">
                    <div class="airline-symbol">
                        <i class="fa-solid fa-plane"></i>
                    </div>
                    <div>
                        <div>${escapeHTML(flight.airline)}</div>
                        <small style="color:#8291a0;font-size:10px;">
                            ${escapeHTML(flight.cabin)}
                        </small>
                    </div>
                </div>
                <span class="flight-badge">${stopText}</span>
            </div>

            <div class="flight-route">
                <div>
                    <div class="route-time">${flight.departure}</div>
                    <span class="route-city">
                        ${escapeHTML(fromCode)} · ${escapeHTML(flight.from)}
                    </span>
                </div>

                <div class="route-middle">
                    <span>${getDurationText(flight.duration)}</span>
                    <div class="route-line">
                        <i class="fa-solid fa-plane"></i>
                    </div>
                    <span>${stopText}</span>
                </div>

                <div class="route-end">
                    <div class="route-time">${flight.arrival}</div>
                    <span class="route-city">
                        ${escapeHTML(toCode)} · ${escapeHTML(flight.to)}
                    </span>
                </div>
            </div>

            <div class="flight-bottom">
                <div class="flight-details">
                    <span><i class="fa-regular fa-clock"></i>
                        ${getDurationText(flight.duration)}</span>
                    <span><i class="fa-solid fa-user"></i>
                        ${escapeHTML(flight.passenger)}</span>
                    <span><i class="fa-solid fa-suitcase"></i>
                        ${escapeHTML(flight.cabin)}</span>
                </div>

                <div class="price-block">
                    <div class="price">
                        $${flight.price.toLocaleString("en-US")}
                    </div>
                    <span class="price-note">Demo price per passenger</span>
                    <button type="button" class="select-flight"
                        data-flight-id="${flight.id}">
                        Select Flight
                    </button>
                </div>
            </div>
        `;

        flightList.appendChild(card);
    });

    resultsCount.textContent =
        `Showing ${startIndex + 1}–${Math.min(
            startIndex + flightsPerPage,
            flights.length
        )} of ${flights.length} demo flights`;

    if (totalPages <= 1) {
        return;
    }

    function addPageButton(label, page, disabled, active) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.disabled = disabled;

        if (active) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        button.addEventListener("click", function () {
            currentPage = page;
            applyFilters();

            document.getElementById("results-section").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        pagination.appendChild(button);
    }

    addPageButton("‹", currentPage - 1, currentPage === 1, false);

    for (let page = 1; page <= totalPages; page++) {
        addPageButton(
            String(page),
            page,
            false,
            page === currentPage
        );
    }

    addPageButton(
        "›",
        currentPage + 1,
        currentPage === totalPages,
        false
    );
}
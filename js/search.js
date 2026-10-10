
const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",

    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",

    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",

    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",

    "Ecuador",
    "Egypt",
    "El Salvador",
    "Estonia",
    "Eswatini",
    "Ethiopia",

    "Fiji",
    "Finland",
    "France",

    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",

    "Haiti",
    "Honduras",
    "Hungary",

    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",

    "Jamaica",
    "Japan",
    "Jordan",

    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",

    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",

    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",

    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",

    "Oman",

    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",

    "Qatar",

    "Romania",
    "Russia",
    "Rwanda",

    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",

    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",

    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",

    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",

    "Yemen",

    "Zambia",
    "Zimbabwe"
];




const airlines = [
    "Emirates",
    "Qatar Airways",
    "Turkish Airlines",
    "Etihad Airways",
    "Flydubai",
    "Air India",
    "Lufthansa",
    "Singapore Airlines",
    "Korean Air",
    "British Airways",
    "Air France",
    "KLM",
    "Qantas",
    "Japan Airlines",
    "ANA",
    "Malaysia Airlines",
    "Thai Airways",
    "Saudia",
    "Oman Air",
    "Aegean Airlines",


];




const airlineCodes = {
    "Emirates": "EK",
    "Qatar Airways": "QR",
    "Turkish Airlines": "TK",
    "Etihad Airways": "EY",
    "Flydubai": "FZ",
    "Air India": "AI",
    "Lufthansa": "LH",
    "Singapore Airlines": "SQ",
    "Korean Air": "KE",
    "British Airways": "BA",
    "Air France": "AF",
    "KLM": "KL",
    "Qantas": "QF",
    "Japan Airlines": "JL",
    "ANA": "NH",
    "Malaysia Airlines": "MH",
    "Thai Airways": "TG",
    "Saudia": "SV",
    "Oman Air": "WY",
    "Aegean Airlines": "A3"
};




const fromCountry = document.getElementById("from-country");
const toCountry = document.getElementById("to-country");

const searchButton =
    document.getElementById("search-flight-btn");

const swapButton =
    document.getElementById("swap-btn");

const tripTypeInputs =
    document.querySelectorAll('input[name="tripType"]');

const returnDate =
    document.getElementById("return-date");

const departDate =
    document.getElementById("depart-date");

const cabinClass =
    document.getElementById("cabin-class");

const resultsContainer =
    document.getElementById("flight-results");

const emptyMessage =
    document.getElementById("empty-message");

const resultsTitle =
    document.getElementById("results-title");

const resultsCount =
    document.getElementById("results-count");

const pagination =
    document.getElementById("pagination");

const clearFilters =
    document.getElementById("clear-filters");

const emptyReset =
    document.getElementById("empty-reset");

const sortFlights =
    document.getElementById("sort-flights");

const minPrice =
    document.getElementById("min-price");

const maxPrice =
    document.getElementById("max-price");

const airlineFilters =
    document.getElementById("airline-filters");




let searched = false;

let currentFlights = [];

let filteredFlights = [];

let currentPage = 1;

const flightsPerPage = 5;




function populateCountries() {

    countries.forEach(country => {

        const optionFrom =
            document.createElement("option");

        optionFrom.value = country;
        optionFrom.textContent = country;

        fromCountry.appendChild(optionFrom);


        const optionTo =
            document.createElement("option");

        optionTo.value = country;
        optionTo.textContent = country;

        toCountry.appendChild(optionTo);

    });
}



function createAirlineFilters() {

    airlines.forEach(airline => {

        const label =
            document.createElement("label");

        label.className = "check-option";

        label.innerHTML = `
            <input
                type="checkbox"
                class="airline-filter"
                value="${airline}"
            >

            <span>${airline}</span>
        `;

        airlineFilters.appendChild(label);

    });
}



tripTypeInputs.forEach(input => {

    input.addEventListener("change", function () {

        if (this.value === "roundtrip") {

            returnDate.disabled = false;

        } else {

            returnDate.disabled = true;
            returnDate.value = "";

        }

    });

});


// swap------------------------------------

swapButton.addEventListener("click", function () {

    const oldFrom = fromCountry.value;

    fromCountry.value = toCountry.value;

    toCountry.value = oldFrom;

});




function getTripType() {

    const selected =
        document.querySelector(
            'input[name="tripType"]:checked'
        );

    return selected
        ? selected.value
        : "oneway";
}




function generateFlights(from, to, selectedClass) {

    const generatedFlights = [];

    if (!from || !to || from === to) {
        return generatedFlights;
    }




    const selectedAirlines = [
        airlines[
        Math.floor(
            Math.random() * airlines.length
        )
        ],

        airlines[
        Math.floor(
            Math.random() * airlines.length
        )
        ],

        airlines[
        Math.floor(
            Math.random() * airlines.length
        )
        ],

        airlines[
        Math.floor(
            Math.random() * airlines.length
        )
        ]
    ];


    //    time-----------------------------------

    const flightTimes = [
        {
            departure: "06:30",
            arrival: "10:45",
            period: "Morning"
        },

        {
            departure: "09:15",
            arrival: "13:30",
            period: "Morning"
        },

        {
            departure: "13:20",
            arrival: "17:40",
            period: "Afternoon"
        },

        {
            departure: "17:50",
            arrival: "22:10",
            period: "Evening"
        },

        {
            departure: "22:30",
            arrival: "04:45",
            period: "Night"
        },

        {
            departure: "20:30",
            arrival: "05:45",
            period: "Night"
        },
        {
            departure: "02:30",
            arrival: "11:45",
            period: "Morning"
        },

        {
            departure: "09:30",
            arrival: "13:40",
            period: "Evening"
        }

    ];


    flightTimes.forEach((time, index) => {

        const airline =
            selectedAirlines[index % selectedAirlines.length];


        const code =
            airlineCodes[airline] || "SK";




        let basePrice = 250 + index * 85;

        if (selectedClass === "Business") {

            basePrice += 450;

        }

        if (selectedClass === "First") {

            basePrice += 1000;

        }




        const durationHours =
            3 + ((from.length + to.length + index) % 9);

        const durationMinutes =
            (durationHours * 60) +
            ((from.length * 7 + to.length * 5 + index * 13) % 60);


        const hours =
            Math.floor(durationMinutes / 60);

        const minutes =
            durationMinutes % 60;


        const duration =
            `${hours}h ${minutes}m`;


        generatedFlights.push({

            id:
                Date.now() +
                index +
                Math.random(),

            from: from,

            to: to,

            airline: airline,

            flightNumber:
                `${code}-${100 + index * 73}`,

            departure:
                time.departure,

            arrival:
                time.arrival,

            period:
                time.period,

            duration:
                duration,

            durationMinutes:
                durationMinutes,

            class:
                selectedClass,

            price:
                basePrice,

            stops:
                index === 0
                    ? "Non-stop"
                    : index === 4
                        ? "1 Stop"
                        : "Non-stop"

        });

    });


    return generatedFlights;
}




function searchFlights() {

    const from =
        fromCountry.value;

    const to =
        toCountry.value;

    const selectedClass =
        cabinClass.value;

    const tripType =
        getTripType();


    /* VALIDATION */

    if (!from || !to) {

        alert(
            "Please select both departure and destination countries."
        );

        return;
    }


    if (from === to) {

        alert(
            "Departure and destination countries cannot be the same."
        );

        return;
    }


    if (!departDate.value) {

        alert(
            "Please select your departure date."
        );

        return;
    }


    if (
        tripType === "roundtrip" &&
        !returnDate.value
    ) {

        alert(
            "Please select your return date."
        );

        return;
    }


    if (
        tripType === "roundtrip" &&
        returnDate.value <= departDate.value
    ) {

        alert(
            "Return date must be after departure date."
        );

        return;
    }


    /*
       SEARCH
    */

    currentFlights =
        generateFlights(
            from,
            to,
            selectedClass
        );


    searched = true;

    currentPage = 1;


    applyFilters();

}




function getSelectedTimeFilters() {

    return [
        ...document.querySelectorAll(
            ".time-filter:checked"
        )
    ].map(input => input.value);

}



function getSelectedAirlines() {

    return [
        ...document.querySelectorAll(
            ".airline-filter:checked"
        )
    ].map(input => input.value);

}




function applyFilters() {

    if (!searched) {
        return;
    }


    const timeFilters =
        getSelectedTimeFilters();


    const selectedAirlines =
        getSelectedAirlines();


    const minimum =
        minPrice.value
            ? Number(minPrice.value)
            : 0;


    const maximum =
        maxPrice.value
            ? Number(maxPrice.value)
            : Infinity;


    filteredFlights =
        currentFlights.filter(flight => {


            /* TIME */

            const timeMatch =
                timeFilters.length === 0 ||
                timeFilters.includes(
                    flight.period
                );


            /* AIRLINE */

            const airlineMatch =
                selectedAirlines.length === 0 ||
                selectedAirlines.includes(
                    flight.airline
                );


            /* PRICE */

            const priceMatch =
                flight.price >= minimum &&
                flight.price <= maximum;


            return (
                timeMatch &&
                airlineMatch &&
                priceMatch
            );

        });


    applySorting();

}




function applySorting() {

    const sortValue =
        sortFlights.value;


    if (sortValue === "price-low") {

        filteredFlights.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sortValue === "price-high") {

        filteredFlights.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sortValue === "duration") {

        filteredFlights.sort(
            (a, b) =>
                a.durationMinutes -
                b.durationMinutes
        );

    }


    renderFlights();

}



function renderFlights() {

    resultsContainer.innerHTML = "";

    pagination.innerHTML = "";


    if (!searched) {

        emptyMessage.style.display = "none";

        resultsTitle.textContent =
            "Search Results";

        resultsCount.textContent =
            "Search for a flight to see available flights.";

        return;

    }


    if (filteredFlights.length === 0) {

        emptyMessage.style.display = "block";

        resultsTitle.textContent =
            `${fromCountry.value} → ${toCountry.value}`;

        resultsCount.textContent =
            "No flights match your current filters.";

        return;

    }


    emptyMessage.style.display = "none";


    resultsTitle.textContent =
        `${fromCountry.value} → ${toCountry.value}`;


    resultsCount.textContent =
        `${filteredFlights.length} flight${filteredFlights.length !== 1
            ? "s"
            : ""
        } found`;


    /* PAGINATION */

    const start =
        (currentPage - 1) *
        flightsPerPage;


    const end =
        start +
        flightsPerPage;


    const pageFlights =
        filteredFlights.slice(
            start,
            end
        );


    pageFlights.forEach(
        flight => {

            resultsContainer.appendChild(
                createFlightCard(flight)
            );

        }
    );


    createPagination();

}




function createFlightCard(flight) {

    const card =
        document.createElement("div");

    card.className =
        "flight-card1";


    const airlineCode =
        airlineCodes[flight.airline]
        || "SK";


    card.innerHTML = `

        <div class="card-top">

            <div class="airline-info1">

                <div class="airline-logo1">
                    ${airlineCode}
                </div>

                <div>

                    <h4>
                        ${flight.airline}
                    </h4>

                    <p>
                        ${flight.flightNumber}
                    </p>

                </div>

            </div>


            <div class="class-badge">
                ${flight.class}
            </div>

        </div>


        <div class="flight-route">


            <div class="flight-time1">

                <h3>
                    ${flight.departure}
                </h3>

                <p>
                    ${flight.from}
                </p>

            </div>


            <div class="flight-line">

                <span>
                    ${flight.stops}
                </span>

                <div class="line"></div>

                <small>
                    ${flight.duration}
                </small>

            </div>


            <div class="flight-time1">

                <h3>
                    ${flight.arrival}
                </h3>

                <p>
                    ${flight.to}
                </p>

            </div>


        </div>


        <div class="card-bottom">


            <div class="flight-meta">

                <span>
                    ${flight.period}
                </span>

                <span>
                    ${flight.class}
                </span>

                <span>
                    ${flight.stops}
                </span>

            </div>


            <div class="flight-price1">

                <span>
                    Starting from
                </span>

                <strong>
                    $${flight.price}
                </strong>

                <button
                    class="select-flight"
                    type="button"
                    onclick="selectFlight('${flight.id}')"
                >
                    Veiw Flight
                </button>

            </div>


        </div>

    `;


    return card;
}




function createPagination() {

    const totalPages =
        Math.ceil(
            filteredFlights.length /
            flightsPerPage
        );


    if (totalPages <= 1) {
        return;
    }


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement("button");

        button.className =
            "page-btn";


        if (i === currentPage) {

            button.classList.add(
                "active"
            );

        }


        button.textContent = i;


        button.addEventListener(
            "click",
            function () {

                currentPage = i;

                renderFlights();

                window.scrollTo({
                    top:
                        document.querySelector(
                            ".results-section"
                        ).offsetTop - 30,

                    behavior: "smooth"
                });

            }
        );


        pagination.appendChild(
            button
        );

    }

}



function selectFlight(id) {

    const flight =
        filteredFlights.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!flight) {
        return;
    }


    // alert(
    //     `Flight selected!\n\n` +
    //     `${flight.airline}\n` +
    //     `${flight.from} → ${flight.to}\n` +
    //     `${flight.departure} - ${flight.arrival}\n` +
    //     `Class: ${flight.class}\n` +
    //     `Price: $${flight.price}`
    // );

}



searchButton.addEventListener(
    "click",
    searchFlights
);




document
    .querySelectorAll(".time-filter")
    .forEach(input => {

        input.addEventListener(
            "change",
            function () {

                if (searched) {

                    currentPage = 1;

                    applyFilters();

                }

            }
        );

    });


document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.classList.contains(
                "airline-filter"
            )
        ) {

            if (searched) {

                currentPage = 1;

                applyFilters();

            }

        }

    }
);




minPrice.addEventListener(
    "input",
    function () {

        if (searched) {

            currentPage = 1;

            applyFilters();

        }

    }
);


maxPrice.addEventListener(
    "input",
    function () {

        if (searched) {

            currentPage = 1;

            applyFilters();

        }

    }
);




sortFlights.addEventListener(
    "change",
    function () {

        if (searched) {

            applyFilters();

        }

    }
);



clearFilters.addEventListener(
    "click",
    function () {


        document
            .querySelectorAll(
                ".time-filter, .airline-filter"
            )
            .forEach(input => {

                input.checked = false;

            });


        minPrice.value = "";

        maxPrice.value = "";


        sortFlights.value =
            "recommended";


        currentPage = 1;


        if (searched) {

            applyFilters();

        }

    }
);



emptyReset.addEventListener(
    "click",
    function () {

        document
            .querySelectorAll(
                ".time-filter, .airline-filter"
            )
            .forEach(input => {

                input.checked = false;

            });


        minPrice.value = "";

        maxPrice.value = "";


        currentPage = 1;


        applyFilters();

    }
);



populateCountries();

createAirlineFilters();



const today =
    new Date();


const yyyy =
    today.getFullYear();


const mm =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");


const dd =
    String(
        today.getDate()
    ).padStart(2, "0");


const todayString =
    `${yyyy}-${mm}-${dd}`;


departDate.min =
    todayString;


returnDate.min =
    todayString;
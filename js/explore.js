


const flights = [

    {
        id: "HZ001",
        airline: "Horizon Air",
        from: "KBL",
        fromCity: "Kabul",
        fromCountry: "Afghanistan",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "10:30 AM",
        arrival: "12:45 PM",
        duration: "2h 15m"
    },

    {
        id: "AF102",
        airline: "Afghan Air",
        from: "KBL",
        fromCity: "Kabul",
        fromCountry: "Afghanistan",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "01:20 PM",
        arrival: "05:10 PM",
        duration: "4h 50m"
    },

    {
        id: "SK205",
        airline: "Sky Express",
        from: "DXB",
        fromCity: "Dubai",
        fromCountry: "United Arab Emirates",
        to: "DEL",
        toCity: "Delhi",
        toCountry: "India",
        departure: "08:15 AM",
        arrival: "12:00 PM",
        duration: "3h 45m"
    },

    {
        id: "GA310",
        airline: "Global Air",
        from: "IST",
        fromCity: "Istanbul",
        fromCountry: "Turkey",
        to: "LHR",
        toCity: "London",
        toCountry: "United Kingdom",
        departure: "09:40 AM",
        arrival: "12:15 PM",
        duration: "4h 35m"
    },

    {
        id: "AA420",
        airline: "Asia Airways",
        from: "DEL",
        fromCity: "Delhi",
        fromCountry: "India",
        to: "DOH",
        toCity: "Doha",
        toCountry: "Qatar",
        departure: "03:30 PM",
        arrival: "05:55 PM",
        duration: "3h 25m"
    },

    {
        id: "RW501",
        airline: "Royal Air",
        from: "DOH",
        fromCity: "Doha",
        fromCountry: "Qatar",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "06:20 PM",
        arrival: "07:30 PM",
        duration: "1h 10m"
    },

    {
        id: "UW602",
        airline: "United Air",
        from: "LHR",
        fromCity: "London",
        fromCountry: "United Kingdom",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "11:00 AM",
        arrival: "09:00 PM",
        duration: "7h 00m"
    },

    {
        id: "RU203",
        airline: "Royal Air",
        from: "ICN",
        fromCity: "Seoul",
        fromCountry: "South Korea",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "11:00 AM",
        arrival: "09:00 PM",
        duration: "7h 00m"
    },

    {
        id: "FW703",
        airline: "Fly World",
        from: "DXB",
        fromCity: "Dubai",
        fromCountry: "United Arab Emirates",
        to: "KBL",
        toCity: "Kabul",
        toCountry: "Afghanistan",
        departure: "08:45 PM",
        arrival: "11:30 PM",
        duration: "2h 45m"
    },

    {
        id: "PK110",
        airline: "Pakistan Airways",
        from: "ISB",
        fromCity: "Islamabad",
        fromCountry: "Pakistan",
        to: "KBL",
        toCity: "Kabul",
        toCountry: "Afghanistan",
        departure: "07:30 AM",
        arrival: "08:45 AM",
        duration: "1h 15m"
    },

    {
        id: "PK221",
        airline: "Pakistan Airways",
        from: "LHE",
        fromCity: "Lahore",
        fromCountry: "Pakistan",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "09:15 AM",
        arrival: "11:30 AM",
        duration: "3h 15m"
    },

    {
        id: "IN305",
        airline: "India Airways",
        from: "DEL",
        fromCity: "Delhi",
        fromCountry: "India",
        to: "ICN",
        toCity: "Seoul",
        toCountry: "South Korea",
        departure: "10:00 AM",
        arrival: "06:20 PM",
        duration: "7h 20m"
    },

    {
        id: "IN412",
        airline: "India Airways",
        from: "BOM",
        fromCity: "Mumbai",
        fromCountry: "India",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "02:10 PM",
        arrival: "04:00 PM",
        duration: "3h 50m"
    },

    {
        id: "TR510",
        airline: "Turkish Sky",
        from: "IST",
        fromCity: "Istanbul",
        fromCountry: "Turkey",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "08:30 AM",
        arrival: "01:50 PM",
        duration: "4h 20m"
    },

    {
        id: "TR611",
        airline: "Turkish Sky",
        from: "IST",
        fromCity: "Istanbul",
        fromCountry: "Turkey",
        to: "BER",
        toCity: "Berlin",
        toCountry: "Germany",
        departure: "12:40 PM",
        arrival: "02:15 PM",
        duration: "2h 35m"
    },

    {
        id: "DE720",
        airline: "German Wings",
        from: "FRA",
        fromCity: "Frankfurt",
        fromCountry: "Germany",
        to: "LHR",
        toCity: "London",
        toCountry: "United Kingdom",
        departure: "07:45 AM",
        arrival: "08:20 AM",
        duration: "1h 35m"
    },

    {
        id: "DE831",
        airline: "German Wings",
        from: "MUC",
        fromCity: "Munich",
        fromCountry: "Germany",
        to: "CDG",
        toCity: "Paris",
        toCountry: "France",
        departure: "10:20 AM",
        arrival: "11:55 AM",
        duration: "1h 35m"
    },

    {
        id: "FR901",
        airline: "France Air",
        from: "CDG",
        fromCity: "Paris",
        fromCountry: "France",
        to: "MAD",
        toCity: "Madrid",
        toCountry: "Spain",
        departure: "09:00 AM",
        arrival: "10:55 AM",
        duration: "1h 55m"
    },

    {
        id: "ES215",
        airline: "Iberia Sky",
        from: "MAD",
        fromCity: "Madrid",
        fromCountry: "Spain",
        to: "LIS",
        toCity: "Lisbon",
        toCountry: "Portugal",
        departure: "02:30 PM",
        arrival: "03:15 PM",
        duration: "1h 45m"
    },

    {
        id: "UK330",
        airline: "British Sky",
        from: "LHR",
        fromCity: "London",
        fromCountry: "United Kingdom",
        to: "JFK",
        toCity: "New York",
        toCountry: "United States",
        departure: "06:00 PM",
        arrival: "09:10 PM",
        duration: "8h 10m"
    },

    {
        id: "US441",
        airline: "American Sky",
        from: "JFK",
        fromCity: "New York",
        fromCountry: "United States",
        to: "LAX",
        toCity: "Los Angeles",
        toCountry: "United States",
        departure: "08:30 AM",
        arrival: "11:45 AM",
        duration: "6h 15m"
    },

    {
        id: "US552",
        airline: "American Sky",
        from: "LAX",
        fromCity: "Los Angeles",
        fromCountry: "United States",
        to: "NRT",
        toCity: "Tokyo",
        toCountry: "Japan",
        departure: "12:20 PM",
        arrival: "04:40 PM",
        duration: "11h 20m"
    },

    {
        id: "JP601",
        airline: "Japan Air",
        from: "NRT",
        fromCity: "Tokyo",
        fromCountry: "Japan",
        to: "ICN",
        toCity: "Seoul",
        toCountry: "South Korea",
        departure: "09:10 AM",
        arrival: "11:45 AM",
        duration: "2h 35m"
    },

    {
        id: "KR712",
        airline: "Korea Air",
        from: "ICN",
        fromCity: "Seoul",
        fromCountry: "South Korea",
        to: "NRT",
        toCity: "Tokyo",
        toCountry: "Japan",
        departure: "03:00 PM",
        arrival: "05:20 PM",
        duration: "2h 20m"
    },

    {
        id: "CN820",
        airline: "China Air",
        from: "PEK",
        fromCity: "Beijing",
        fromCountry: "China",
        to: "ICN",
        toCity: "Seoul",
        toCountry: "South Korea",
        departure: "08:00 AM",
        arrival: "10:25 AM",
        duration: "2h 25m"
    },

    {
        id: "CN931",
        airline: "China Air",
        from: "PVG",
        fromCity: "Shanghai",
        fromCountry: "China",
        to: "SIN",
        toCity: "Singapore",
        toCountry: "Singapore",
        departure: "01:15 PM",
        arrival: "06:50 PM",
        duration: "5h 35m"
    },

    {
        id: "SG140",
        airline: "Singapore Air",
        from: "SIN",
        fromCity: "Singapore",
        fromCountry: "Singapore",
        to: "BKK",
        toCity: "Bangkok",
        toCountry: "Thailand",
        departure: "10:45 AM",
        arrival: "12:15 PM",
        duration: "2h 30m"
    },

    {
        id: "TH251",
        airline: "Thai Airways",
        from: "BKK",
        fromCity: "Bangkok",
        fromCountry: "Thailand",
        to: "KUL",
        toCity: "Kuala Lumpur",
        toCountry: "Malaysia",
        departure: "04:20 PM",
        arrival: "07:25 PM",
        duration: "2h 05m"
    },

    {
        id: "MY362",
        airline: "Malaysia Air",
        from: "KUL",
        fromCity: "Kuala Lumpur",
        fromCountry: "Malaysia",
        to: "MLE",
        toCity: "Male",
        toCountry: "Maldives",
        departure: "09:35 AM",
        arrival: "10:55 AM",
        duration: "4h 20m"
    },

    {
        id: "MV473",
        airline: "Maldives Air",
        from: "MLE",
        fromCity: "Male",
        fromCountry: "Maldives",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "11:25 AM",
        arrival: "02:45 PM",
        duration: "4h 20m"
    },

    {
        id: "QA584",
        airline: "Qatar Airways",
        from: "DOH",
        fromCity: "Doha",
        fromCountry: "Qatar",
        to: "LHR",
        toCity: "London",
        toCountry: "United Kingdom",
        departure: "02:00 AM",
        arrival: "07:00 AM",
        duration: "7h 00m"
    },

    {
        id: "AE695",
        airline: "Emirates Sky",
        from: "DXB",
        fromCity: "Dubai",
        fromCountry: "United Arab Emirates",
        to: "JFK",
        toCity: "New York",
        toCountry: "United States",
        departure: "03:40 AM",
        arrival: "09:30 AM",
        duration: "13h 50m"
    },

    {
        id: "AE706",
        airline: "Emirates Sky",
        from: "DXB",
        fromCity: "Dubai",
        fromCountry: "United Arab Emirates",
        to: "SYD",
        toCity: "Sydney",
        toCountry: "Australia",
        departure: "09:00 PM",
        arrival: "05:30 PM",
        duration: "13h 30m"
    },

    {
        id: "AU817",
        airline: "Australia Air",
        from: "SYD",
        fromCity: "Sydney",
        fromCountry: "Australia",
        to: "AKL",
        toCity: "Auckland",
        toCountry: "New Zealand",
        departure: "07:20 AM",
        arrival: "12:15 PM",
        duration: "3h 55m"
    },

    {
        id: "NZ928",
        airline: "New Zealand Air",
        from: "AKL",
        fromCity: "Auckland",
        fromCountry: "New Zealand",
        to: "NRT",
        toCity: "Tokyo",
        toCountry: "Japan",
        departure: "11:40 AM",
        arrival: "03:50 PM",
        duration: "10h 10m"
    },

    {
        id: "IR139",
        airline: "Iran Air",
        from: "IKA",
        fromCity: "Tehran",
        fromCountry: "Iran",
        to: "KBL",
        toCity: "Kabul",
        toCountry: "Afghanistan",
        departure: "08:10 AM",
        arrival: "10:30 AM",
        duration: "2h 20m"
    },

    {
        id: "IR240",
        airline: "Iran Air",
        from: "IKA",
        fromCity: "Tehran",
        fromCountry: "Iran",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "01:50 PM",
        arrival: "04:25 PM",
        duration: "2h 35m"
    },

    {
        id: "PK351",
        airline: "Pakistan Airways",
        from: "KHI",
        fromCity: "Karachi",
        fromCountry: "Pakistan",
        to: "JED",
        toCity: "Jeddah",
        toCountry: "Saudi Arabia",
        departure: "05:30 PM",
        arrival: "07:45 PM",
        duration: "4h 15m"
    },

    {
        id: "SA462",
        airline: "Saudi Air",
        from: "JED",
        fromCity: "Jeddah",
        fromCountry: "Saudi Arabia",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "09:30 AM",
        arrival: "01:15 PM",
        duration: "4h 45m"
    },

    {
        id: "SA573",
        airline: "Saudi Air",
        from: "RUH",
        fromCity: "Riyadh",
        fromCountry: "Saudi Arabia",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "04:10 PM",
        arrival: "06:25 PM",
        duration: "2h 15m"
    },

    {
        id: "JO684",
        airline: "Jordan Air",
        from: "AMM",
        fromCity: "Amman",
        fromCountry: "Jordan",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "07:55 AM",
        arrival: "01:00 PM",
        duration: "3h 05m"
    },

    {
        id: "EG795",
        airline: "Egypt Air",
        from: "CAI",
        fromCity: "Cairo",
        fromCountry: "Egypt",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "10:15 AM",
        arrival: "01:20 PM",
        duration: "2h 05m"
    },

    {
        id: "MA806",
        airline: "Morocco Air",
        from: "CMN",
        fromCity: "Casablanca",
        fromCountry: "Morocco",
        to: "CDG",
        toCity: "Paris",
        toCountry: "France",
        departure: "08:50 AM",
        arrival: "12:05 PM",
        duration: "3h 15m"
    },

    {
        id: "IT917",
        airline: "Italia Air",
        from: "FCO",
        fromCity: "Rome",
        fromCountry: "Italy",
        to: "CDG",
        toCity: "Paris",
        toCountry: "France",
        departure: "11:30 AM",
        arrival: "01:35 PM",
        duration: "2h 05m"
    },

    {
        id: "CH028",
        airline: "Swiss Air",
        from: "ZRH",
        fromCity: "Zurich",
        fromCountry: "Switzerland",
        to: "FRA",
        toCity: "Frankfurt",
        toCountry: "Germany",
        departure: "06:45 AM",
        arrival: "07:50 AM",
        duration: "1h 05m"
    },

    {
        id: "NL139",
        airline: "Dutch Air",
        from: "AMS",
        fromCity: "Amsterdam",
        fromCountry: "Netherlands",
        to: "LHR",
        toCity: "London",
        toCountry: "United Kingdom",
        departure: "09:25 AM",
        arrival: "09:45 AM",
        duration: "1h 20m"
    },

    {
        id: "PT240",
        airline: "Portugal Air",
        from: "LIS",
        fromCity: "Lisbon",
        fromCountry: "Portugal",
        to: "LHR",
        toCity: "London",
        toCountry: "United Kingdom",
        departure: "02:15 PM",
        arrival: "04:40 PM",
        duration: "2h 25m"
    },

    {
        id: "CA351",
        airline: "Canada Air",
        from: "YYZ",
        fromCity: "Toronto",
        fromCountry: "Canada",
        to: "JFK",
        toCity: "New York",
        toCountry: "United States",
        departure: "08:00 AM",
        arrival: "09:35 AM",
        duration: "1h 35m"
    },

    {
        id: "US462",
        airline: "United Sky",
        from: "ORD",
        fromCity: "Chicago",
        fromCountry: "United States",
        to: "YYZ",
        toCity: "Toronto",
        toCountry: "Canada",
        departure: "03:45 PM",
        arrival: "06:10 PM",
        duration: "1h 25m"
    },

    {
        id: "BR573",
        airline: "Brazil Air",
        from: "GRU",
        fromCity: "São Paulo",
        fromCountry: "Brazil",
        to: "LIS",
        toCity: "Lisbon",
        toCountry: "Portugal",
        departure: "09:10 PM",
        arrival: "08:20 AM",
        duration: "9h 10m"
    },

    {
        id: "MX684",
        airline: "Mexico Air",
        from: "MEX",
        fromCity: "Mexico City",
        fromCountry: "Mexico",
        to: "LAX",
        toCity: "Los Angeles",
        toCountry: "United States",
        departure: "07:30 AM",
        arrival: "09:15 AM",
        duration: "3h 45m"
    },

    {
        id: "RU795",
        airline: "Russia Air",
        from: "SVO",
        fromCity: "Moscow",
        fromCountry: "Russia",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "12:30 PM",
        arrival: "04:15 PM",
        duration: "3h 45m"
    },

    {
        id: "AZ806",
        airline: "Azerbaijan Air",
        from: "GYD",
        fromCity: "Baku",
        fromCountry: "Azerbaijan",
        to: "IST",
        toCity: "Istanbul",
        toCountry: "Turkey",
        departure: "05:20 PM",
        arrival: "07:10 PM",
        duration: "2h 50m"
    },

    {
        id: "UZ917",
        airline: "Uzbek Air",
        from: "TAS",
        fromCity: "Tashkent",
        fromCountry: "Uzbekistan",
        to: "DXB",
        toCity: "Dubai",
        toCountry: "United Arab Emirates",
        departure: "06:30 AM",
        arrival: "09:20 AM",
        duration: "3h 50m"
    }

   

];

const flightList =
    document.getElementById(
        "flightList"
    );


const flightCount =
    document.getElementById(
        "flightCount"
    );




function showFlights(list) {

    flightList.innerHTML = "";


    flightCount.textContent =
        list.length;


    if (list.length === 0) {

        flightList.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#81929d;
            ">
                No flights found.
            </div>
        `;

        return;
    }


    list.forEach(function (flight) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "flight-card";


        card.innerHTML = `

            <div class="card-top">

                <div>

                    <div class="flight-number">
                        ${flight.id}
                    </div>

                    <div class="airline">
                        ${flight.airline}
                    </div>

                </div>

                <span style="
                    color:#1255b8;
                    font-size:11px;
                    font-weight:bold;
                ">
                    Available
                </span>

            </div>


            <div class="route">

                <div class="airport">

                    <strong>
                        ${flight.from}
                    </strong>

                    <span>
                        ${flight.fromCity}
                    </span>

                </div>


                <div class="route-middle">

                    <div class="route-line"></div>

                    <div class="route-plane">
                        ✈
                    </div>

                    <div class="route-line"></div>

                </div>


                <div class="airport destination">

                    <strong>
                        ${flight.to}
                    </strong>

                    <span>
                        ${flight.toCity}
                    </span>

                </div>

            </div>


            <div class="card-bottom">

                <div class="card-detail">

                    <span>Departure</span>

                    <b>
                        ${flight.departure}
                    </b>

                </div>


                <div class="card-detail">

                    <span>Arrival</span>

                    <b>
                        ${flight.arrival}
                    </b>

                </div>


                <div class="card-detail">

                    <span>Duration</span>

                    <b>
                        ${flight.duration}
                    </b>

                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                openFlight(
                    flight
                );

            }
        );


        flightList.appendChild(
            card
        );

    });

}



const modal =
    document.getElementById(
        "flightModal"
    );


function openFlight(flight) {

    document.getElementById(
        "modalFlight"
    ).textContent =
        flight.id;


    document.getElementById(
        "modalAirline"
    ).textContent =
        flight.airline;


    document.getElementById(
        "modalFrom"
    ).textContent =
        flight.from;


    document.getElementById(
        "modalFromCity"
    ).textContent =
        flight.fromCity;


    document.getElementById(
        "modalTo"
    ).textContent =
        flight.to;


    document.getElementById(
        "modalToCity"
    ).textContent =
        flight.toCity;


    document.getElementById(
        "modalDeparture"
    ).textContent =
        flight.departure;


    document.getElementById(
        "modalArrival"
    ).textContent =
        flight.arrival;


    document.getElementById(
        "modalDuration"
    ).textContent =
        flight.duration;


    modal.classList.add(
        "show"
    );


    /* Save selected flight */

    localStorage.setItem(
        "selectedFlight",
        JSON.stringify(flight)
    );

}



document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        function () {

            modal.classList.remove(
                "show"
            );

        }
    );




modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);




document
    .getElementById("flightSearch")
    .addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                flights.filter(
                    function (flight) {

                        return (

                            flight.id
                                .toLowerCase()
                                .includes(value)

                            ||

                            flight.airline
                                .toLowerCase()
                                .includes(value)

                            ||

                            flight.from
                                .toLowerCase()
                                .includes(value)

                            ||

                            flight.to
                                .toLowerCase()
                                .includes(value)

                            ||

                            flight.fromCity
                                .toLowerCase()
                                .includes(value)

                            ||

                            flight.toCity
                                .toLowerCase()
                                .includes(value)

                        );

                    }
                );


            showFlights(
                filtered
            );

        }
    );




showFlights(
    flights
);
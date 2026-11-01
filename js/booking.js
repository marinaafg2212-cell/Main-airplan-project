/* =========================================
   SKYLINE - FLIGHT BOOKING MODAL
========================================= */

const bookingModal = document.getElementById("booking-modal");
const bookingForm = document.getElementById("booking-form");
const bookingClose = document.getElementById("booking-close");
const bookingTitle = document.getElementById("booking-title");
const bookingMessage = document.getElementById("booking-message");

let selectedFlight = null;
let previousFocus = null;

const bookingHeading = bookingModal.querySelector(
    ".booking-form-heading"
);

// Create a flight summary inside the existing booking form.
const flightSummary = document.createElement("div");
flightSummary.id = "selected-flight-summary";
flightSummary.hidden = true;

bookingHeading.appendChild(flightSummary);

// Hide the destination, hotel and car fields for flight bookings.
const bookingSections = [
    document.getElementById("destination-fields"),
    document.getElementById("hotel-fields"),
    document.getElementById("car-fields")
];

function getBookingUser() {
    try {
        const user = JSON.parse(
            sessionStorage.getItem("aw_current_user") || "null"
        );

        if (
            !user ||
            typeof user.email !== "string" ||
            !user.email.trim()
        ) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Could not read user session:", error);
        return null;
    }
}

function openFlightBooking(flight) {
    const user = getBookingUser();

    // Require the user to log in first.
    if (!user) {
        const next = encodeURIComponent("searchFlight.html");
        window.location.href = `loginForm.html?next=${next}`;
        return;
    }

    selectedFlight = flight;
    previousFocus = document.activeElement;

    bookingForm.reset();
    bookingMessage.textContent = "";
    bookingMessage.className = "booking-message";

    // Hide all unrelated booking sections.
    bookingSections.forEach(function (section) {
        if (!section) return;

        section.hidden = true;

        section.querySelectorAll("input, select, textarea").forEach(
            function (field) {
                field.disabled = true;
                field.required = false;
            }
        );
    });

    // Fill in the logged-in user's information.
    const nameField = bookingForm.elements.namedItem("fullName");
    const emailField = bookingForm.elements.namedItem("email");
    const phoneField = bookingForm.elements.namedItem("phone");

    nameField.value =
        user.fullName || user.name || user.username || "";

    emailField.value = user.email || "";
    phoneField.value = user.phone || user.phoneNumber || "";

    nameField.readOnly = Boolean(nameField.value);
    emailField.readOnly = Boolean(emailField.value);

    // Show the selected flight.
    bookingTitle.textContent = "Complete Your Flight Booking";

    flightSummary.hidden = false;

    flightSummary.innerHTML = `
        <div class="selected-flight-info">
            <h3>${escapeHTML(flight.airline)}</h3>

            <p>
                <strong>${escapeHTML(getCountryCode(flight.from))}</strong>
                ${escapeHTML(flight.from)}
                →
                <strong>${escapeHTML(getCountryCode(flight.to))}</strong>
                ${escapeHTML(flight.to)}
            </p>

            <p>
                Departure: ${escapeHTML(departDate.value)}
            </p>

            <p>
                Time: ${escapeHTML(flight.departure)}
                – ${escapeHTML(flight.arrival)}
            </p>

            <p>
                Class: ${escapeHTML(flight.cabin)}
            </p>

            <p>
                Passenger: ${escapeHTML(flight.passenger)}
            </p>

            <h3>
                Price: $${flight.price.toLocaleString("en-US")}
            </h3>

            <p class="booking-notice">
                This is a demo booking request. It does not confirm
                an actual airline reservation.
            </p>
        </div>
    `;

    // Prevent dates in the past.
    const today = getLocalDateString(new Date());

    bookingForm.querySelectorAll('input[type="date"]').forEach(
        function (input) {
            input.min = today;
        }
    );

    bookingModal.hidden = false;
    document.body.style.overflow = "hidden";

    bookingClose.focus();
}

function closeFlightBooking() {
    bookingModal.hidden = true;
    document.body.style.overflow = "";

    selectedFlight = null;

    if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
    }
}

// Close button.
bookingClose.addEventListener("click", closeFlightBooking);

// Close when clicking the dark background.
bookingModal.addEventListener("click", function (event) {
    if (event.target === bookingModal) {
        closeFlightBooking();
    }
});

// Close with Escape.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !bookingModal.hidden) {
        closeFlightBooking();
    }
});

// Submit the flight booking request.
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!selectedFlight) {
        bookingMessage.textContent = "Please select a flight first.";
        bookingMessage.className = "booking-message error";
        return;
    }

    if (!bookingForm.reportValidity()) return;

    const user = getBookingUser();

    if (!user) {
        const next = encodeURIComponent("searchFlight.html");
        window.location.href = `loginForm.html?next=${next}`;
        return;
    }

    const fullName = bookingForm.elements.namedItem("fullName").value.trim();
    const email = bookingForm.elements.namedItem("email").value.trim();
    const phone = bookingForm.elements.namedItem("phone").value.trim();

    if (!fullName || !email || !phone) {
        bookingMessage.textContent =
            "Please provide your name, email and phone number.";

        bookingMessage.className = "booking-message error";
        return;
    }

    const booking = {
        id: "SKY-" + Date.now(),
        type: "flight",
        status: "pending",
        createdAt: new Date().toISOString(),
        userEmail: email.toLowerCase(),

        passenger: {
            fullName: fullName,
            email: email,
            phone: phone
        },

        flight: {
            airline: selectedFlight.airline,
            from: selectedFlight.from,
            to: selectedFlight.to,
            departureDate: departDate.value,
            departureTime: selectedFlight.departure,
            arrivalTime: selectedFlight.arrival,
            cabin: selectedFlight.cabin,
            passengerType: selectedFlight.passenger,
            price: selectedFlight.price
        }
    };

    try {
        const saved = JSON.parse(
            localStorage.getItem("aw_bookings") || "[]"
        );

        if (!Array.isArray(saved)) {
            throw new Error("Invalid booking storage.");
        }

        saved.push(booking);

        localStorage.setItem(
            "aw_bookings",
            JSON.stringify(saved)
        );

        bookingMessage.textContent =
            "Your flight booking request has been saved. " +
            "Reference: " + booking.id +
            ". Your reservation is pending, not confirmed.";

        bookingMessage.className = "booking-message success";

        bookingForm.querySelector(
            'button[type="submit"]'
        ).disabled = true;

    } catch (error) {
        console.error("Could not save flight booking:", error);

        bookingMessage.textContent =
            "Could not save your booking. Please try again.";

        bookingMessage.className = "booking-message error";
    }
});

// Connect the Book Flight buttons to the modal.
flightList.addEventListener("click", function (event) {
    const button = event.target.closest(".select-flight");

    if (!button) return;

    const flight = allFlights.find(function (item) {
        return item.id === button.dataset.flightId;
    });

    if (flight) {
        openFlightBooking(flight);
    }
});
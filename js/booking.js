document.addEventListener("DOMContentLoaded", function () {

    // ==================================
    // 1. GET HTML ELEMENTS
    // ==================================

    const modal = document.getElementById("booking-modal");
    const form = document.getElementById("booking-form");
    const closeButton = document.getElementById("booking-close");

    const message = document.getElementById("booking-message");
    const submitButton = document.getElementById("payment-submit");

    const confirmationModal = document.getElementById("payment-confirmation-modal");
    const confirmationClose = document.getElementById("confirmation-close");

    const paymentMethods = document.querySelectorAll(
        'input[name="paymentMethod"]'
    );

    const cardFields = document.getElementById("card-payment-fields");
    const walletFields = document.getElementById("wallet-payment-fields");

    if (
        !modal ||
        !form ||
        !closeButton ||
        !message ||
        !submitButton
    ) {
        console.error("Payment elements could not be found.");
        return;
    }


    // ==================================
    // 2. GET CURRENT USER
    // ==================================

    function getCurrentUser() {

        try {

            const raw = sessionStorage.getItem("aw_current_user");

            if (!raw) return null;

            const user = JSON.parse(raw);

            if (
                !user ||
                typeof user !== "object" ||
                !user.email ||
                typeof user.email !== "string"
            ) {
                return null;
            }

            return user;

        } catch (error) {

            console.error("User session error:", error);

            return null;
        }
    }


    // ==================================
    // 3. SELECTED FLIGHT INFORMATION
    // ==================================

    const defaultFlight = {
        from: "KBL",
        fromCity: "Kabul",
        to: "DXB",
        toCity: "Dubai",
        duration: "3h 15m",
        airline: "Skyline Airways",
        flightNumber: "SK-102",
        departure: "08:30 AM",
        arrival: "11:45 AM",
        flightClass: "Economy",
        passengers: 1,
        ticketPrice: 230,
        tax: 15,
        serviceFee: 5
    };

    let selectedFlight = { ...defaultFlight };

    try {

        const savedFlight = sessionStorage.getItem("selectedFlight");

        if (savedFlight) {

            const parsedFlight = JSON.parse(savedFlight);

            if (
                parsedFlight &&
                typeof parsedFlight === "object"
            ) {

                selectedFlight = {
                    ...defaultFlight,
                    ...parsedFlight
                };

            }
        }

    } catch (error) {

        console.error("Flight information error:", error);

    }


    // ==================================
    // 4. CALCULATE TOTAL PRICE
    // ==================================

    function calculateTotal() {

        return (
            Number(selectedFlight.ticketPrice) +
            Number(selectedFlight.tax) +
            Number(selectedFlight.serviceFee)
        ) * Number(selectedFlight.passengers);

    }


    // ==================================
    // 5. UPDATE FLIGHT DETAILS
    // ==================================

    function updateFlightDetails() {

        const setText = (id, value) => {

            const element = document.getElementById(id);

            if (element) {
                element.textContent = value;
            }

        };

        setText("payment-from", selectedFlight.from);
        setText("payment-from-city", selectedFlight.fromCity);

        setText("payment-to", selectedFlight.to);
        setText("payment-to-city", selectedFlight.toCity);

        setText("payment-duration", selectedFlight.duration);
        setText("payment-airline", selectedFlight.airline);

        setText("payment-flight-number", selectedFlight.flightNumber);

        setText("payment-departure", selectedFlight.departure);
        setText("payment-arrival", selectedFlight.arrival);

        setText("payment-class", selectedFlight.flightClass);
        setText("payment-passengers", selectedFlight.passengers);

        setText("payment-ticket-price", "$" + selectedFlight.ticketPrice);
        setText("payment-tax", "$" + selectedFlight.tax);

        setText("payment-service-fee", "$" + selectedFlight.serviceFee);

        setText("payment-total", "$" + calculateTotal());
        setText("payment-button-total", "$" + calculateTotal());

    }


    // ==================================
    // 6. SHOW MESSAGE
    // ==================================

    function showMessage(text, type = "") {

        message.textContent = text;

        message.className = "booking-message";

        if (type) {
            message.classList.add(type);
        }

    }


    // ==================================
    // 7. OPEN PAYMENT MODAL
    // ==================================

    let previousFocus = null;

    function openPayment() {

        const user = getCurrentUser();

        if (!user) {

            const next = encodeURIComponent("searchFlight.html");

            window.location.href = `login.html?next=${next}`;

            return;
        }
        

        previousFocus = document.activeElement;

        form.reset();

        showMessage("");

        const nameInput = document.getElementById("booking-name");
        const emailInput = document.getElementById("booking-email");
        const phoneInput = document.getElementById("booking-phone");

        if (nameInput) {

            nameInput.value =
                user.fullName || user.name || user.username || "";

            nameInput.readOnly = Boolean(nameInput.value);

        }

        if (emailInput) {

            emailInput.value = user.email || "";

            emailInput.readOnly = Boolean(emailInput.value);

        }

        if (phoneInput) {

            phoneInput.value = user.phone || user.phoneNumber || "";

        }

        // Reset payment fields  change
// Show card payment by default

const cardMethod = document.querySelector(
    'input[name="paymentMethod"][value="card"]'
);

if (cardMethod) {
    cardMethod.checked = true;
}

if (cardFields) cardFields.hidden = false;

if (walletFields) walletFields.hidden = true;

        // Update flight information

        updateFlightDetails();

        modal.hidden = false;

        document.body.style.overflow = "hidden";

        const firstField = modal.querySelector(
            'input:not([disabled]), select:not([disabled])'
        );

        if (firstField) {
            firstField.focus();
        }

    }


    // ==================================
    // 8. CLOSE PAYMENT MODAL
    // ==================================

    function closePayment() {

        modal.hidden = true;

        document.body.style.overflow = "";

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {

            previousFocus.focus();

        }

    }

    closeButton.addEventListener("click", closePayment);

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closePayment();
        }

    });


    // ==================================
    // 9. CONNECT BOOK FLIGHT BUTTONS
    // ==================================

    document.addEventListener("click", function (event) {

        const button = event.target.closest(".select-flight");

        if (!button) return;

        // Read flight information from button if available

        if (button.dataset.flight) {

            try {

                const flight = JSON.parse(button.dataset.flight);

                if (flight && typeof flight === "object") {

                    selectedFlight = {
                        ...defaultFlight,
                        ...flight
                    };

                }

            } catch (error) {

                console.error("Selected flight error:", error);

            }

        }

        openPayment();

    });


    // ==================================
    // 10. PAYMENT METHOD SELECTION
    // ==================================

    paymentMethods.forEach(function (method) {

        method.addEventListener("change", function () {

            if (cardFields) {
                cardFields.hidden = this.value !== "card";
            }

            if (walletFields) {
                walletFields.hidden = this.value !== "wallet";
            }

            showMessage("");

        });

    });


    // ==================================
    // 11. CARD NUMBER FORMATTING
    // ==================================

    const cardNumber = document.getElementById("card-number");

    if (cardNumber) {

        cardNumber.addEventListener("input", function () {

            let value = this.value
                .replace(/\D/g, "")
                .slice(0, 16);

            this.value = value
                .replace(/(.{4})/g, "$1 ")
                .trim();

            const preview = document.getElementById(
                "card-preview-number"
            );

            if (preview) {

                preview.textContent =
                    this.value || "•••• •••• •••• ••••";

            }

        });

    }


    // ==================================
    // 12. CARDHOLDER NAME PREVIEW
    // ==================================

    const cardName = document.getElementById("card-name");

    if (cardName) {

        cardName.addEventListener("input", function () {

            const preview = document.getElementById(
                "card-preview-name"
            );

            if (preview) {

                preview.textContent =
                    this.value.toUpperCase() || "YOUR NAME";

            }

        });

    }


    // ==================================
    // 13. EXPIRY DATE FORMATTING
    // ==================================

    const expiryInput = document.getElementById("card-expiry");

    if (expiryInput) {

        expiryInput.addEventListener("input", function () {

            let value = this.value
                .replace(/\D/g, "")
                .slice(0, 4);

            if (value.length >= 3) {

                value =
                    value.slice(0, 2) +
                    "/" +
                    value.slice(2);

            }

            this.value = value;

            const preview = document.getElementById(
                "card-preview-expiry"
            );

            if (preview) {

                preview.textContent = value || "MM/YY";

            }

        });

    }


    // ==================================
    // 14. VALIDATE PAYMENT FORM
    // ==================================

    function validateForm() {

        const getValue = id => {

            return (
                document.getElementById(id)?.value.trim() || ""
            );

        };

        const fullName = getValue("booking-name");
        const email = getValue("booking-email");
        const phone = getValue("booking-phone");

        const nationality = getValue("passenger-nationality");
        const passport = getValue("passenger-passport");
        const dob = getValue("passenger-dob");

        const terms = document.getElementById("payment-terms");

        if (!fullName || !email || !phone) {

            return "Please complete your personal information.";

        }

        if (fullName.length > 100) {

            return "Your name must be 100 characters or fewer.";

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            return "Please enter a valid email address.";

        }

        if (!/^[+0-9\s()-]{7,20}$/.test(phone)) {

            return "Please enter a valid phone number.";

        }

        if (!nationality || !passport || !dob) {

            return "Please complete your passenger information.";

        }

        const birthDate = new Date(dob + "T00:00:00");

        if (
            Number.isNaN(birthDate.getTime()) ||
            birthDate >= new Date()
        ) {

            return "Please enter a valid date of birth.";

        }

        const selectedMethod = document.querySelector(
            'input[name="paymentMethod"]:checked'
        );

        // if (!selectedMethod) {

        //     return "Please select a payment method.";

        // }

        if (selectedMethod.value === "card") {

            const number = getValue("card-number").replace(/\s/g, "");

            const name = getValue("card-name");

            const expiry = getValue("card-expiry");

            const cvv = getValue("card-cvv");

            if (!name || !number || !expiry || !cvv) {

                return "Please complete all card details.";

            }

            if (!/^\d{16}$/.test(number)) {

                return "Card number must contain 16 digits.";

            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {

                return "Please enter expiry date in MM/YY format.";

            }

            const [month, year] = expiry.split("/").map(Number);

            const now = new Date();

            const expiryDate = new Date(
                2000 + year,
                month,
                1
            );

            const currentMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

            if (expiryDate <= currentMonth) {

                return "Your card has expired.";

            }

            if (!/^\d{3,4}$/.test(cvv)) {

                return "Please enter a valid CVV.";

            }

        }

        if (
            selectedMethod.value === "wallet" &&
            !getValue("wallet-number")
        ) {

            return "Please enter your wallet information.";

        }

        if (terms && !terms.checked) {

            return "Please accept the terms and conditions.";

        }

        return "";

    }


    // ==================================
    // 15. SHOW CONFIRMATION
    // ==================================

    function showConfirmation(reference, user) {

        const setText = (id, value) => {

            const element = document.getElementById(id);

            if (element) {
                element.textContent = value;
            }

        };

        setText("confirmation-reference", reference);

        setText(
            "confirmation-passenger",
            user.fullName || user.name || user.username || "Passenger"
        );

        setText("confirmation-status", "Pending");

        setText("confirmation-total", "$" + calculateTotal());

        closePayment();

        if (confirmationModal) {

            confirmationModal.hidden = false;

            document.body.style.overflow = "hidden";

        }

    }


    // ==================================
    // 16. SUBMIT PAYMENT
    // ==================================

    // ==================================
// 16. SUBMIT PAYMENT
// ==================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const error = validateForm();

    if (error) {
        showMessage(error, "error");
        return;
    }

    const selectedMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    const reference =
        "SKY-" + Date.now().toString().slice(-8);

    // Get all passenger information

    const passenger = {
        name: document.getElementById("booking-name").value.trim(),
        email: document.getElementById("booking-email").value.trim(),
        phone: document.getElementById("booking-phone").value.trim(),
        nationality: document.getElementById("passenger-nationality").value.trim(),
        passport: document.getElementById("passenger-passport").value.trim(),
        dateOfBirth: document.getElementById("passenger-dob").value,
        gender: document.getElementById("passenger-gender")?.value || ""
    };

    // Create complete booking information

    const booking = {

        reference: reference,

        type: "flight",

        status: "pending",

        createdAt: new Date().toISOString(),

        userEmail: user.email.trim().toLowerCase(),

        flight: {
            ...selectedFlight
        },

        passenger: passenger,

        payment: {
            method: selectedMethod.value,
            ticketPrice: Number(selectedFlight.ticketPrice),
            tax: Number(selectedFlight.tax),
            serviceFee: Number(selectedFlight.serviceFee),
            passengers: Number(selectedFlight.passengers),
            totalAmount: calculateTotal(),
            status: "pending"
        }

    };

    try {

        // Get existing bookings

        const oldBookings = JSON.parse(
            localStorage.getItem("aw_bookings") || "[]"
        );

        if (!Array.isArray(oldBookings)) {
            throw new Error("Invalid booking storage.");
        }

        // Save complete booking

        oldBookings.push(booking);

        localStorage.setItem(
            "aw_bookings",
            JSON.stringify(oldBookings)
        );

        // Show confirmation

        showMessage(
            "Your booking has been saved successfully. Status: Pending.",
            "success"
        );

        showConfirmation(reference, user);

        console.log("Saved Booking:", booking);

    } catch (error) {

        console.error("Booking error:", error);

        showMessage(
            "Unable to save your booking. Please try again.",
            "error"
        );

    }

});

    // ==================================
    // 17. CLOSE CONFIRMATION MODAL
    // ==================================

    function closeConfirmation() {

        if (confirmationModal) {

            confirmationModal.hidden = true;

            document.body.style.overflow = "";

        }

    }

    if (confirmationClose) {

        confirmationClose.addEventListener(
            "click",
            closeConfirmation
        );

    }

    if (confirmationModal) {

        confirmationModal.addEventListener("click", function (event) {

            if (event.target === confirmationModal) {

                closeConfirmation();

            }

        });

    }


    // ==================================
    // 18. ESCAPE KEY
    // ==================================

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") return;

        if (
            confirmationModal &&
            !confirmationModal.hidden
        ) {

            closeConfirmation();

        } else if (!modal.hidden) {

            closePayment();

        }

    });

    localStorage.setItem(
    "aw_bookings",
    JSON.stringify(oldBookings)
);

    // ==================================
    // 19. INITIAL PAYMENT METHOD STATE
    // ==================================

    if (cardFields) cardFields.hidden = true;

    if (walletFields) walletFields.hidden = true;

});
const bookingForm = document.getElementById("bookingForm");
const bookingContainer = document.querySelector(".booking-container");
const confirmation = document.getElementById("confirmation");
const confirmationDetails = document.getElementById("confirmationDetails");

const paymentSection = document.getElementById("paymentSection");
const paymentPassenger = document.getElementById("paymentPassenger");
const paymentBase = document.getElementById("paymentBase");
const paymentTaxes = document.getElementById("paymentTaxes");
const paymentTotal = document.getElementById("paymentTotal");
const paymentSummaryTotal = document.getElementById("paymentSummaryTotal");

const backButton = document.getElementById("backButton");
const secureButton = document.getElementById("secureButton");
const backToBooking = document.getElementById("backToBooking");
const confirmPayment = document.getElementById("confirmPayment");
const paymentAcknowledged = document.getElementById("paymentAcknowledged");
const paymentMessage = document.getElementById("paymentMessage");
const copyWallet = document.getElementById("copyWallet");

const flightPrice = 500;
const taxes = 50;
const total = flightPrice + taxes;

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

let passengerDetails = {};
let selectedPaymentMethod = "";

function scrollToTop() {
window.scrollTo({
top: 0,
behavior: "smooth"
});
}

function showBooking() {
paymentSection.classList.add("hidden");
bookingContainer.classList.remove("hidden");
bookingForm.classList.remove("hidden");
confirmation.classList.add("hidden");

step1.classList.add("active");
step1.classList.remove("completed");
step2.classList.remove("active", "completed");
step3.classList.remove("active", "completed");

secureButton.innerHTML =
    '<i class="fa-solid fa-lock"></i> Secure Booking';
secureButton.disabled = false;

scrollToTop();

}

function showPayment() {
bookingContainer.classList.add("hidden");
confirmation.classList.add("hidden");
paymentSection.classList.remove("hidden");

step1.classList.remove("active");
step1.classList.add("completed");
step2.classList.add("active");
step2.classList.remove("completed");
step3.classList.remove("active", "completed");

scrollToTop();

}

function showConfirmation() {
paymentSection.classList.add("hidden");
bookingContainer.classList.remove("hidden");
bookingForm.classList.add("hidden");
confirmation.classList.remove("hidden");

step1.classList.remove("active");
step1.classList.add("completed");
step2.classList.remove("active");
step2.classList.add("completed");
step3.classList.add("active");

scrollToTop();

}

// Set booking prices
document.getElementById("flightPrice").textContent =
"$${flightPrice.toFixed(2)}";

document.getElementById("taxPrice").textContent =
"$${taxes.toFixed(2)}";

document.getElementById("totalPrice").textContent =
"$${total.toFixed(2)}";

paymentBase.textContent = "$${flightPrice.toFixed(2)}";
paymentTaxes.textContent = "$${taxes.toFixed(2)}";
paymentTotal.textContent = "$${total.toFixed(2)}";
paymentSummaryTotal.textContent = "$${total.toFixed(2)}";

// Highlight selected payment method
const paymentOptions = document.querySelectorAll(
'input[name="payment"]'
);

paymentOptions.forEach(function (option) {
option.addEventListener("change", function () {
document.querySelectorAll(".payment-option").forEach(
function (card) {
card.style.borderColor = "";
}
);

    const selectedCard = option.closest(".payment-option");

    if (selectedCard) {
        selectedCard.style.borderColor = "#2458d9";
    }
});

});

// STEP 1: Validate booking form and open payment page
bookingForm.addEventListener("submit", function (event) {
event.preventDefault();

if (!bookingForm.reportValidity()) {
    return;
}

const fullName = document.getElementById("fullName").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const birthDate = document.getElementById("birthDate").value;
const nationality = document.getElementById("nationality").value.trim();
const passport = document.getElementById("passport").value.trim();

const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
);

if (
    !fullName ||
    !email ||
    !phone ||
    !birthDate ||
    !nationality ||
    !passport ||
    !selectedPayment
) {
    alert("Please complete all required fields.");
    return;
}

if (new Date(birthDate) >= new Date()) {
    alert("Please enter a valid date of birth.");
    return;
}

if (!document.getElementById("terms").checked) {
    alert("Please accept the Terms and Conditions.");
    return;
}

passengerDetails = {
    fullName,
    email,
    phone,
    birthDate,
    nationality,
    passport
};

selectedPaymentMethod = selectedPayment.value;

paymentPassenger.textContent = fullName;

// Update the displayed payment method
const paymentMethodText = document.querySelector(
    ".payment-amount small"
);

if (paymentMethodText) {
    paymentMethodText.textContent =
        `Payment method: ${selectedPaymentMethod}`;
}

paymentAcknowledged.checked = false;
paymentMessage.textContent = "";

showPayment();

});

// Copy demonstration wallet address
copyWallet.addEventListener("click", async function () {
const walletAddress = document.getElementById("walletAddress");

try {
    await navigator.clipboard.writeText(walletAddress.value);
    copyWallet.innerHTML =
        '<i class="fa-solid fa-check"></i> Copied';
} catch (error) {
    walletAddress.select();
    walletAddress.setSelectionRange(0, walletAddress.value.length);

    const copied = document.execCommand("copy");

    copyWallet.textContent = copied ? "Copied" : "Select to copy";
}

});

// STEP 2: Return to booking form
backToBooking.addEventListener("click", function () {
showBooking();
});

// STEP 2: Validate acknowledgement and show confirmation
confirmPayment.addEventListener("click", function () {
if (!paymentAcknowledged.checked) {
paymentMessage.textContent =
"Please acknowledge the demonstration payment notice.";
return;
}

paymentMessage.textContent = "";

confirmationDetails.replaceChildren();

const details = [
    ["Passenger", passengerDetails.fullName],
    ["Email", passengerDetails.email],
    ["Phone", passengerDetails.phone],
    ["Nationality", passengerDetails.nationality],
    ["Passport Number", passengerDetails.passport],
    ["Flight", "AP1089"],
    ["Route", "Kabul → Istanbul"],
    ["Payment Method", selectedPaymentMethod],
    ["Total Amount", `$${total.toFixed(2)}`],
    ["Payment Status", "Demo - Not Verified"]
];

details.forEach(function (item) {
    const row = document.createElement("p");
    const label = document.createElement("strong");

    label.textContent = item[0] + ": ";
    row.append(label, document.createTextNode(item[1]));

    confirmationDetails.appendChild(row);
});

showConfirmation();

});

// STEP 3: Return from confirmation to booking form
backButton.addEventListener("click", function () {
showBooking();
});

// Secure Booking button
secureButton.addEventListener("click", function () {
if (bookingContainer.classList.contains("hidden")) {
showBooking();
}

bookingForm.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

document.getElementById("fullName").focus({
    preventScroll: true
});

});

// Make sure the correct page is visible when the site first opens
bookingContainer.classList.remove("hidden");
bookingForm.classList.remove("hidden");
confirmation.classList.add("hidden");
paymentSection.classList.add("hidden");
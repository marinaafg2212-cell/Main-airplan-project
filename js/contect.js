const contactForm = document.querySelector(".contact-form");

// Select Form Inputs
const fullName = contactForm.querySelector('input[type="text"]');
const email = contactForm.querySelector('input[type="email"]');
const phone = contactForm.querySelector('input[type="tel"]');
const subject = contactForm.querySelector("select");
const bookingReference = contactForm.querySelectorAll('input[type="text"]')[1];
const message = contactForm.querySelector("textarea");


// Function 1: Validate Email
function validateEmail(emailValue) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);
}


// Function 2: Validate Phone
function validatePhone(phoneValue) {

    const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

    return phonePattern.test(phoneValue);
}


// Function 3: Show Error Message
function showError(title, text) {

    Swal.fire({
        icon: "error",
        title: title,
        text: text,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#1769e0"
    });

}


// Function 4: Check Required Fields
function checkRequiredFields() {

    if (
        fullName.value.trim() === "" ||
        email.value.trim() === "" ||
        subject.value === "" ||
        message.value.trim() === ""
    ) {

        showError(
            "Missing Information!",
            "Please fill in all required fields."
        );

        return false;
    }

    return true;
}


// Function 5: Validate Form
function validateForm() {

    if (!checkRequiredFields()) {
        return false;
    }

    if (!validateEmail(email.value.trim())) {

        showError(
            "Invalid Email!",
            "Please enter a valid email address."
        );

        return false;
    }

    if (
        phone.value.trim() !== "" &&
        !validatePhone(phone.value.trim())
    ) {

        showError(
            "Invalid Phone Number!",
            "Please enter a valid phone number."
        );

        return false;
    }

    if (message.value.trim().length < 10) {

        showError(
            "Message Too Short!",
            "Your message must contain at least 10 characters."
        );

        return false;
    }

    return true;
}


// Function 6: Show Success Message
function showSuccessMessage() {

    Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting Skyline. We appreciate your message.",
        confirmButtonText: "Done",
        confirmButtonColor: "#1769e0"
    });

}


// Function 7: Reset Form
function resetForm() {

    contactForm.reset();

}


// Function 8: Send Message
function sendMessage(event) {

    event.preventDefault();

    if (validateForm()) {

        showSuccessMessage();

        resetForm();

    }

}


// Form Submit Event
contactForm.addEventListener("submit", sendMessage);
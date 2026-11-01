

(function () {
    "use strict";

    let alertIsOpen = false;

 

    function getCurrentUser() {
        try {
            const storedUser = localStorage.getItem(
                "furniroCurrentUser"
            );

            if (!storedUser) return null;

            const user = JSON.parse(storedUser);

            if (
                !user ||
                typeof user !== "object" ||
                !user.email
            ) {
                return null;
            }

            return user;
        } catch (error) {
            console.error("Login check error:", error);
            return null;
        }
    }

    function isUserLoggedIn() {
        return getCurrentUser() !== null;
    }

    window.getCurrentUser = getCurrentUser;
    window.isUserLoggedIn = isUserLoggedIn;



    function openLoginModal() {
        const modal = document.getElementById("accountModal");
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");
        const loginTab = document.getElementById("showLogin");

        if (!modal) {
            console.error(
                "Login modal not found. Expected #accountModal"
            );
            return;
        }

        // Open the existing modal
        modal.style.display = "flex";
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        // Show login form
        if (loginForm) {
            loginForm.style.display = "block";
            loginForm.classList.add("active");
        }

        // Hide registration form
        if (registerForm) {
            registerForm.style.display = "none";
            registerForm.classList.remove("active");
        }

        // Activate Login tab
        if (loginTab) {
            loginTab.classList.add("active");
        }

        // Call existing project function if available
        if (typeof window.showLoginForm === "function") {
            window.showLoginForm();
        }
    }

    window.openAccountModal = openLoginModal;
    window.showLoginForm = window.showLoginForm || openLoginModal;

 

    function showLoginRequiredAlert() {
        if (alertIsOpen) return;

        alertIsOpen = true;

        if (typeof window.Swal === "undefined") {
            window.alert(
                "Login Required\n\n" +
                "Please log in or create an account to book a flight."
            );

            alertIsOpen = false;
            openLoginModal();
            return;
        }

        window.Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please log in or create an account to book a flight.",
            confirmButtonText: "OK",
            confirmButtonColor: "#1769d2",
            background: "#ffffff",
            color: "#17243a",
            showCancelButton: false,
            showDenyButton: false,
            allowOutsideClick: false,
            allowEscapeKey: true
        }).then(function (result) {
            alertIsOpen = false;

            if (result.isConfirmed) {
                openLoginModal();
            }
        }).catch(function (error) {
            alertIsOpen = false;
            console.error("SweetAlert error:", error);
        });
    }

    window.showLoginRequiredAlert = showLoginRequiredAlert;


    const protectedSelectors = [
        ".select-flight",
        ".book-flight",
        "#bookFlight",
        "#book-flight",
        "#bookFlightBtn",
        "[data-action='book-flight']",
        "[data-protected='true']",

        "#addToCart",
        "#addToCartBtn",
        "#add-cart",
        ".add-to-cart",
        ".addToCart",
        ".add-cart",
        ".add-to-cart-btn",
        "[data-action='add-to-cart']",

        "#checkoutButton",
        "#proceedToCheckout",
        "#placeOrder",

        ".wishlist-button",
        ".add-to-wishlist",

        ".compare-button",
        ".add-to-compare"
    ].join(",");

    function isInsidePublicUI(element) {
        return Boolean(
            element.closest([
                "#accountModal",
                "#loginForm",
                "#registerForm",
                ".swal2-container",
                ".swal2-popup"
            ].join(","))
        );
    }


    document.addEventListener("click", function (event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        // Do not interfere with login/register forms
        if (isInsidePublicUI(target)) return;

        // Allow normal actions for logged-in users
        if (isUserLoggedIn()) return;

        const protectedButton = target.closest(
            protectedSelectors
        );

        if (!protectedButton) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        showLoginRequiredAlert();
    }, true);

   

    const protectedPages = [
        "checkout.html",
        "orders.html",
        "accountsettings.html"
    ];

    function checkProtectedPage() {
        const currentPage = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        if (
            !protectedPages.includes(currentPage) ||
            isUserLoggedIn()
        ) {
            return;
        }

        document.body.innerHTML = `
            <main style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:24px;
                text-align:center;
                font-family:Arial,sans-serif;
                background:#f8f7f4;
                color:#29251f;
            ">
                <section>
                    <h2>Login Required</h2>
                    <p>
                        Please log in or create an account
                        to access this page.
                    </p>
                    <button id="backButton" style="
                        padding:12px 24px;
                        border:0;
                        border-radius:8px;
                        background:#1769d2;
                        color:white;
                        cursor:pointer;
                    ">Go Back</button>
                </section>
            </main>
        `;

        document.getElementById("backButton")
            .addEventListener("click", function () {
                window.history.back();
            });
    }


    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            checkProtectedPage
        );
    } else {
        checkProtectedPage();
    }

})();
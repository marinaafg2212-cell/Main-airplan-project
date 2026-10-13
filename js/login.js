

const authBox = document.querySelector(".auth-box");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const USER_KEY = "aw_users";
const CURRENT_USER_KEY = "aw_current_user";


// 2. SHOW LOGIN / REGISTER


function showRegisterForm() {
    if (authBox) {
        authBox.classList.add("register-active");
    }
}

function showLoginForm() {
    if (authBox) {
        authBox.classList.remove("register-active");
    }
}

if (registerBtn) {
    registerBtn.addEventListener("click", showRegisterForm);
}

if (loginBtn) {
    loginBtn.addEventListener("click", showLoginForm);
}

if (showRegister) {
    showRegister.addEventListener("click", function (event) {
        event.preventDefault();
        showRegisterForm();
    });
}

if (showLogin) {
    showLogin.addEventListener("click", function (event) {
        event.preventDefault();
        showLoginForm();
    });
}


// 3. GET USERS


function getUsers() {
    try {
        const users = JSON.parse(
            localStorage.getItem(USER_KEY)
        );

        return Array.isArray(users) ? users : [];

    } catch (error) {
        console.error("Could not read users:", error);
        return [];
    }
}


// 4. SAVE USERS


function saveUsers(users) {
    try {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(users)
        );

        return true;

    } catch (error) {
        console.error("Could not save users:", error);
        return false;
    }
}



function getCurrentUser() {
    try {
        return JSON.parse(
            sessionStorage.getItem(CURRENT_USER_KEY)
        ) || null;

    } catch (error) {
        return null;
    }
}


// Check whether a user is logged in

function isLoggedIn() {
    return getCurrentUser() !== null;
}


// Save logged-in user

function setCurrentUser(user) {
    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role ?? 0
    };

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );
}




// 0 = User
// 1 = Editor
// 2 = Manager
// 3 = Admin

function getRoleName(role) {
    const roles = {
        0: "User",
        1: "Editor",
        2: "Manager",
        3: "Admin"
    };

    return roles[role] || "User";
}



function logoutUser() {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem("loginTime");

    window.location.href = "index.html";
}


if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document
            .getElementById("registerName")
            .value.trim();

        const email = document
            .getElementById("registerEmail")
            .value.trim()
            .toLowerCase();

        const password = document
            .getElementById("registerPassword")
            .value;

        const confirmPassword = document
            .getElementById("confirmPassword")
            .value;

        const users = getUsers();


        // Check empty fields

        if (!name || !email || !password || !confirmPassword) {

            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please fill in all fields.",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Check duplicate email

        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {

            Swal.fire({
                icon: "warning",
                title: "Email Already Exists",
                text: "This email is already registered.",
                confirmButtonText: "OK",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Check password length

        if (password.length < 6) {

            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must contain at least 6 characters.",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Check password confirmation

        if (password !== confirmPassword) {

            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "The passwords do not match.",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Create new user

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: 0,
            emailVerified: true,
            createAt: new Date().toISOString()
        };


        // Save new user

        users.push(newUser);

        if (!saveUsers(users)) {

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Could not save your account. Please try again.",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Success message

        Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: `Welcome ${name}! Your account has been created successfully.`,
            confirmButtonText: "Continue",
            confirmButtonColor: "#043170"

        }).then(function () {

            registerForm.reset();
            showLoginForm();

        });

    });
}



if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value.trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value;

        const users = getUsers();


        // Find user

        const user = users.find(function (item) {
            return item.email === email &&
                   item.password === password;
        });


        // Invalid login

        if (!user) {

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid email or password.",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Check email verification

        if (user.emailVerified === false) {

            Swal.fire({
                icon: "warning",
                title: "Email Not Verified",
                text: "Please verify your email before logging in.",
                confirmButtonText: "OK",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Default role for older accounts

        if (user.role === undefined || user.role === null) {

            user.role = 0;

        }


        // Save current user

        try {

            setCurrentUser(user);

            localStorage.setItem(
                "loginTime",
                new Date().toISOString()
            );

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Login Error",
                text: "Could not save your login session.",
                confirmButtonColor: "#043170"
            });

            return;
        }


        // Success message

        Swal.fire({
            icon: "success",
            title: `Welcome, ${user.name}!`,
            text: `Your role: ${getRoleName(user.role)}`,
            timer: 1500,
            showConfirmButton: false

        }).then(function () {

            window.location.href = "index.html";

        });

    });
}




function requireLogin() {

    if (isLoggedIn()) {
        return true;
    }

    Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login first to use this feature.",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#043170"

    }).then(function (result) {

        if (result.isConfirmed) {
            window.location.href = "login.html";
        }

    });

    return false;
}



const passwordToggles = document.querySelectorAll(
    ".password-toggle"
);

passwordToggles.forEach(function (toggle) {

    toggle.addEventListener("click", function () {

        const input = this.parentElement.querySelector("input");

        if (!input) {
            return;
        }

        if (input.type === "password") {

            input.type = "text";

            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");

        }

    });

});



const logoutBtn = document.getElementById("sidebar-logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
}
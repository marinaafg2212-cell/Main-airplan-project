const authBox = document.querySelector(".auth-box");
const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const showRegister = document.querySelector("#showRegister");
const showLogin = document.querySelector("#showLogin");

const USER_KEY = "fl_user";
const CURRENT_USER_KEY = "fl_current_user";

function showRegisterFrom() {
    authBox.classList.add("register-active");
}

function showLoginFrom() {
    authBox.classList.remove("register-active");
}

if (showRegister) {
    showRegister.addEventListener("click", showRegisterFrom);
}

if (registerBtn) {
    registerBtn.addEventListener("click", showRegisterFrom);
}

if (showLogin) {
    showLogin.addEventListener("click", showLoginFrom);
}

if (loginBtn) {
    loginBtn.addEventListener("click", showLoginFrom);
}


// get user
function getUsers() {
    return JSON.parse(
        localStorage.getItem(USER_KEY)
    ) || [];
}


// save users
function saveUser(users) {
    localStorage.setItem(
        USER_KEY,
        JSON.stringify(users)
    );
}


// get current users
function getCurrentUser() {
    return JSON.parse(
        sessionStorage.getItem(
            CURRENT_USER_KEY
        )
    ) || null;
}


// check login
function isLoggendIn() {
    return getCurrentUser() != null;
}


// save current user
function setCurrent(user) {
    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );
}


// logout
function logoutUser() {
    sessionStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href = "index.html";
}


// register
const registerFrom = document.getElementById("registerForm");

if (registerFrom) {

    registerFrom.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("registerName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim().toLowerCase();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const users = getUsers();

            const existingUser = users.find(
                user =>
                    user.email === email
            );

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


            // password

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


            // c_password

            if (password !== confirmPassword) {

                Swal.fire({
                    icon: "error",
                    title: "Passwords Do Not Match",
                    text: "Passwords do not match.",
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#043170"
                });

                return;
            }


            // create getting users

            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password,
                role: 0,
                createAt: new Date().toISOString(),
                emailVerified: true
            };


            // add user
            users.push(newUser);


            // save to local storage
            saveUser(users);


            Swal.fire({
                icon: "success",
                title: "Account Created!",
                text: `Welcome ${name}! Your account was created.`,
                confirmButtonText: "Continue",
                confirmButtonColor: "#043170"

            }).then(() => {

                registerFrom.reset();
                showLoginFrom();

            });

        }
    );
}


// login

const loginFrom = document.getElementById("loginForm");

if (loginFrom) {

    loginFrom.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById("loginEmail").value.trim().toLowerCase();

            const password =
                document.getElementById("loginPassword").value;


            const users = getUsers();

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            if (!user) {

                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password.",
                    confirmButtonText: "Continue",
                    confirmButtonColor: "#043170"
                });

                return;
            }


            if (user.emailVerified === false) {

                Swal.fire({
                    icon: "error",
                    title: "Email Not Verified",
                    text: "Please verify your email first.",
                    confirmButtonText: "Continue",
                    confirmButtonColor: "#043170"
                });

                return;
            }


            if (
                user.role == undefined ||
                user.role == null
            ) {
                user.role = 0;
            }


            setCurrent(user);


            localStorage.setItem(
                "loginTime",
                new Date().toISOString()
            );


            window.location.href = "index.html";

        }
    );
}


function requireLogin() {

    if (isLoggendIn()) {
        return true;
    }

    return false;
}
// ================= PASSWORD SHOW / HIDE =================

const passwordToggles = document.querySelectorAll(".password-toggle");

passwordToggles.forEach(function (toggle) {

    toggle.addEventListener("click", function () {

        const input = this.parentElement.querySelector("input");

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


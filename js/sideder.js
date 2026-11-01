"use strict";

// ========================================
// 1. SHARED AUTHENTICATION SETTINGS
// ========================================

const CURRENT_USER_KEY = "aw_current_user";


// ========================================
// 2. GET CURRENT USER
// ========================================

function getCurrentUser() {
    try {
        const savedUser = sessionStorage.getItem(
            CURRENT_USER_KEY
        );

        if (!savedUser) {
            return null;
        }

        const user = JSON.parse(savedUser);

        if (
            !user ||
            typeof user !== "object" ||
            Array.isArray(user) ||
            user.id === undefined ||
            !user.email
        ) {
            return null;
        }

        return user;

    } catch (error) {
        console.error("Could not read current user:", error);
        return null;
    }
}


// ========================================
// 3. CHECK LOGIN STATUS
// ========================================

function isLoggedIn() {
    return getCurrentUser() !== null;
}


// ========================================
// 4. SAVE CURRENT USER
// ========================================

function setCurrentUser(user) {
    if (!user || !user.email || user.id === undefined) {
        throw new Error("Invalid user information.");
    }

    // Never store the password in the current session
    const sessionUser = {
        id: user.id,
        name: user.name || "User",
        email: user.email,
        role: Number(user.role) || 0
    };

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );
}


// ========================================
// 5. USER ROLES
// ========================================

function getRoleName(role) {
    const roles = {
        0: "User",
        1: "Editor",
        2: "Manager",
        3: "Admin"
    };

    return roles[Number(role)] || "User";
}

function getRuleName(role) {
    return "You are logged in as a " +
        getRoleName(role) + ".";
}


// ========================================
// 6. REQUIRE LOGIN
// ========================================

function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }

    if (typeof Swal !== "undefined") {
        Swal.fire({
            icon: "info",
            title: "Login Required",
            text: "Please log in first to continue.",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#043170"
        }).then(function (result) {
            if (result.isConfirmed) {
                window.location.href = "login.html";
            }
        });

    } else {
        const goToLogin = window.confirm(
            "Please log in first. Go to Login?"
        );

        if (goToLogin) {
            window.location.href = "login.html";
        }
    }

    return false;
}


// ========================================
// 7. LOGOUT
// ========================================

function logoutUser() {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem("loginTime");

    // Refresh the current page after logout
    window.location.href = "index.html";
}


// ========================================
// 8. PROFILE DROPDOWN
// ========================================

function initializeProfileDropdown() {
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.querySelector(
        ".profile-dropdown"
    );
    const profileMenu = document.getElementById("profile-menu");

    if (!profileBtn || !profileDropdown || !profileMenu) {
        return;
    }

    // Prevent duplicate listeners
    if (profileBtn.dataset.initialized === "true") {
        updateProfileInfo();
        return;
    }

    profileBtn.dataset.initialized = "true";
    profileBtn.setAttribute("aria-expanded", "false");

    profileBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = profileDropdown.classList.toggle("open");

        profileBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        updateProfileInfo();
    });

    profileMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", closeProfileDropdown);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeProfileDropdown();
        }
    });

    const logoutButton = document.getElementById(
        "profile-logout"
    );

    if (logoutButton) {
        logoutButton.addEventListener("click", logoutUser);
    }

    updateProfileInfo();
}


// ========================================
// 9. UPDATE PROFILE INFORMATION
// ========================================

function updateProfileInfo() {
    const user = getCurrentUser();

    const heading = document.querySelector(
        ".profile-user-info h4"
    );

    const email = document.querySelector(
        ".profile-user-info p"
    );

    const roleElement = document.querySelector(".user-role");

    const loginItem = document.querySelector(".login-item");

    const logoutButton = document.getElementById(
        "profile-logout"
    );

    if (heading) {
        heading.textContent = user
            ? `Welcome, ${user.name}!`
            : "Welcome, Guest!";
    }

    if (email) {
        email.textContent = user
            ? user.email
            : "Please log in to continue.";
    }

    if (roleElement) {
        roleElement.replaceChildren();

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-user-shield";

        roleElement.appendChild(icon);
        roleElement.appendChild(
            document.createTextNode(
                " " + (user ? getRoleName(user.role) : "Guest")
            )
        );
    }

    if (loginItem) {
        loginItem.style.display = user ? "none" : "flex";
    }

    if (logoutButton) {
        logoutButton.style.display = user ? "flex" : "none";
    }
}


// ========================================
// 10. CLOSE PROFILE DROPDOWN
// ========================================

function closeProfileDropdown() {
    const dropdown = document.querySelector(
        ".profile-dropdown"
    );

    const button = document.getElementById("profile-btn");

    if (dropdown) {
        dropdown.classList.remove("open");
    }

    if (button) {
        button.setAttribute("aria-expanded", "false");
    }
}


// ========================================
// 11. UPDATE NAVBAR
// ========================================

function updateAuthUI() {
    const loginButton = document.querySelector(".try-button");

    const userChip = document.querySelector("[data-user-chip]");
    const userName = document.querySelector("[data-user-name]");
    const userAvatar = document.querySelector("[data-user-avatar]");

    const user = getCurrentUser();

    if (loginButton) {
        loginButton.style.display = user ? "none" : "inline-flex";
    }

    if (userChip) {
        userChip.style.display = user ? "flex" : "none";
    }

    if (userName) {
        userName.textContent = user ? user.name : "";
    }

    if (userAvatar) {
        userAvatar.textContent = user
            ? user.name.charAt(0).toUpperCase()
            : "";
    }

    updateProfileInfo();
}


// ========================================
// 12. SIDEBAR USER INFORMATION
// ========================================

function populateSidebarUser() {
    const name = document.querySelector(
        "[data-sidebar-user-name]"
    );

    const email = document.querySelector(
        "[data-sidebar-user-email]"
    );

    const avatar = document.querySelector(
        "[data-sidebar-avatar]"
    );

    const user = getCurrentUser();

    if (name) {
        name.textContent = user ? user.name : "Guest";
    }

    if (email) {
        email.textContent = user ? user.email : "Guest";
    }

    if (avatar) {
        avatar.textContent = user
            ? user.name.charAt(0).toUpperCase()
            : "G";
    }
}


// ========================================
// 13. DASHBOARD ACCESS VISIBILITY
// ========================================

function updateDashboardAccess() {
    const dashboardMenu = document.getElementById(
        "dashboard-menu"
    );

    if (!dashboardMenu) {
        return;
    }

    const user = getCurrentUser();

    if (!user) {
        dashboardMenu.style.display = "none";
        return;
    }

    const role = Number(user.role);

    if ([1, 2, 3].includes(role)) {
        dashboardMenu.style.removeProperty("display");
    } else {
        dashboardMenu.style.display = "none";
    }
}


// ========================================
// 14. SIDEBAR CONTROLS
// ========================================

function initializeSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overly");
    const closeButton = document.getElementById("close-sidebar");

    const toggleButton =
        document.getElementById("toggle-sidebar") ||
        document.getElementById("open-sidebar") ||
        document.getElementById("menu-toggle");

    if (toggleButton) {
        toggleButton.onclick = function (event) {
            event.preventDefault();
            openSidebar();
        };
    }

    if (closeButton) {
        closeButton.onclick = function (event) {
            event.preventDefault();
            closeSidebar();
        };
    }

    if (overlay) {
        overlay.onclick = closeSidebar;
    }

    const logoutButton = document.getElementById("sidebar-logout");

    if (logoutButton) {
        logoutButton.onclick = logoutUser;
    }
}


function openSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overly");

    if (sidebar) {
        sidebar.classList.add("overly-visible");
    }

    if (overlay) {
        overlay.classList.add("overly-visible");
    }
}


function closeSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overly");

    if (sidebar) {
        sidebar.classList.remove("overly-visible");
    }

    if (overlay) {
        overlay.classList.remove("overly-visible");
    }
}


// ========================================
// 15. LOAD SIDEBAR
// ========================================

async function loadSidebar() {
    const mount = document.getElementById("sidebard");

    if (!mount) {
        return;
    }

    try {
        const response = await fetch("./sidebar.html");

        if (!response.ok) {
            throw new Error("Could not load sidebar.html");
        }

        mount.innerHTML = await response.text();

        initializeSidebar();
        updateAuthUI();
        populateSidebarUser();
        updateDashboardAccess();
        initializeProfileDropdown();

    } catch (error) {
        console.error("Sidebar loading error:", error);
    }
}


// ========================================
// 16. INITIALIZE AUTHENTICATION UI
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    updateAuthUI();
    populateSidebarUser();
    updateDashboardAccess();
    initializeProfileDropdown();

    if (document.getElementById("sidebard")) {
        loadSidebar();
    }
});
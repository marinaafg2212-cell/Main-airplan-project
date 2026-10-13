

function getRuleName(role) {
    switch (Number(role)) {
        case 0:
            return "You are logged in as a User.";
        case 1:
            return "You are logged in as a Manager.";
        case 2:
            return "You are logged in as an Editor.";
        case 3:
            return "You are logged in as an Administrator.";
        default:
            return "You are logged in as a User.";
    }
}

function getRoleName(role) {
    switch (Number(role)) {
        case 0:
            return "User";
        case 1:
            return "Manager";
        case 2:
            return "Editor";
        case 3:
            return "Administrator";
        default:
            return "User";
    }
}



function getCurrentUser() {
    try {
        const savedUser = localStorage.getItem("currentUser");

        if (!savedUser) {
            return null;
        }

        const user = JSON.parse(savedUser);

        if (!user || typeof user !== "object" ||
            Array.isArray(user)) {
            return null;
        }

        return user;

    } catch (error) {
        console.error("Error reading user:", error);
        return null;
    }
}



function initializeProfileDropdown() {
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.querySelector(".profile-dropdown");
    const profileMenu = document.getElementById("profile-menu");

    if (!profileBtn || !profileDropdown || !profileMenu) {
        console.warn("Profile elements not found on this page.");
        return;
    }

    // Avoid duplicate event listeners.
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

        profileBtn.setAttribute("aria-expanded", String(isOpen));

        updateProfileInfo();
    });

    profileMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function () {
        closeProfileDropdown();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeProfileDropdown();
        }
    });

    const logoutButton = document.getElementById("profile-logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", logoutUser);
    }

    updateProfileInfo();
}


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

    const logoutButton = document.getElementById("profile-logout");

    const avatar = document.querySelector(".profile-avatar");

    if (heading) {
        heading.textContent = user
            ? "Welcome, " + (user.name || "User") + "!"
            : "Welcome, Guest!";
    }

    if (email) {
        email.textContent = user
            ? (user.email || "")
            : "Please log in to continue.";
    }

    if (roleElement) {
        roleElement.textContent = user
            ? getRoleName(user.role)
            : "Guest";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-user-shield";

        roleElement.prepend(icon, " ");
    }

    if (avatar) {
        avatar.textContent = "";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-user";

        avatar.appendChild(icon);
    }

    if (loginItem) {
        loginItem.style.display = user ? "none" : "flex";
    }

    if (logoutButton) {
        logoutButton.style.display = user ? "flex" : "none";
    }
}


function closeProfileDropdown() {
    const dropdown = document.querySelector(".profile-dropdown");
    const button = document.getElementById("profile-btn");

    if (dropdown) {
        dropdown.classList.remove("open");
    }

    if (button) {
        button.setAttribute("aria-expanded", "false");
    }
}



function updateAuthUI() {
    const loginButton = document.querySelector(".try-button");
    const userChip = document.querySelector("[data-user-name]");
    const userName = document.querySelector("[data-user-name]");
    const userAvatar = document.querySelector("[data-user-avatar]");

    const user = getCurrentUser();

    if (user) {
        if (loginButton) {
            loginButton.style.display = "none";
        }

        if (userChip) {
            userChip.style.display = "flex";
        }

        if (userName) {
            userName.textContent = user.name || "User";
        }

        if (userAvatar) {
            userAvatar.textContent =
                (user.name || "U").charAt(0).toUpperCase();
        }

    } else {
        if (loginButton) {
            loginButton.style.display = "inline-flex";
        }

        if (userChip) {
            userChip.style.display = "none";
        }
    }

    updateProfileInfo();
}


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

    if (!user) {
        if (name) name.textContent = "Guest";
        if (email) email.textContent = "Guest";
        if (avatar) avatar.textContent = "G";

        return;
    }

    if (name) {
        name.textContent = user.name || "User";
    }

    if (email) {
        email.textContent = user.email || "";
    }

    if (avatar) {
        avatar.textContent =
            (user.name || "U").charAt(0).toUpperCase();
    }
}



function updateDashboardAccess() {
    const dashboardMenu = document.getElementById("dashboard-menu");

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




function logoutUser() {
    try {
        localStorage.removeItem("currentUser");
    } catch (error) {
        console.error("Logout error:", error);
        return;
    }

    updateAuthUI();
    populateSidebarUser();
    updateDashboardAccess();
    closeSidebar();
    closeProfileDropdown();

    window.location.href = "login.html";
}




document.addEventListener("DOMContentLoaded", function () {
    updateAuthUI();
    populateSidebarUser();
    updateDashboardAccess();
    initializeProfileDropdown();

    if (document.getElementById("sidebard")) {
        loadSidebar();
    }
});
import { elementFromHtml } from '/js/utils/element-from-html.js';
import { apiLogout } from '/js/api/auth.js';

export function navbarElement({ userProfile }) {
    const navbar = elementFromHtml(`
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand fw-bold" href="/" id="nav-brand">
                    🍔 UniBite
                </a>

                <!-- Hamburger button for mobile -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navigation links -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="listings-feed" id="navbar-listings-feed">
                                🍲 Listings Feed
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="my-listings" id="navbar-my-listings">
                                🧑‍🍳 My Listings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="meal-requests" id="navbar-meal-requests">
                                🔔 Meal Requests
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="my-reservations" id="navbar-my-reservations">
                                📅 My Reservations
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="admin-dashboard" id="navbar-admin-dashboard">
                                🛡️ Admin Dashboard
                            </a>
                        </li>
                    </ul>

                    <!-- User profile, points and logout button -->
                    <div class="navbar-nav">
                        <div class="nav-item d-flex align-items-center gap-3">
                            <!-- Points -->
                            <span class="nav-link text-white order-1 order-lg-0">
                                <span id="navbar-user-points"></span>
                                <span>🪙</span>
                            </span>
                            <!-- User -->
                            <span class="nav-link text-white">
                                <i class="bi bi-person-circle"></i>
                                <span id="navbar-user-name"></span>
                            </span>
                            <!-- Logout button -->
                            <button class="btn btn-outline-light btn-sm ms-auto order-3" id="navbar-logout">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
        `);

    navbar.querySelector('#navbar-user-name').innerHTML = userProfile.first_name;

    if (! userProfile.roles.includes('student')) {
        navbar.querySelector('#navbar-listings-feed').parentElement.style.display = "none";
        navbar.querySelector('#navbar-my-listings').parentElement.style.display = "none";
        navbar.querySelector('#navbar-meal-requests').parentElement.style.display = "none";
        navbar.querySelector('#navbar-my-reservations').parentElement.style.display = "none";

        navbar.querySelector('#navbar-user-points').parentElement.style.display = "none";
    }

    if (! userProfile.roles.includes('admin')) {
        navbar.querySelector('#navbar-admin-dashboard').parentElement.style.display = "none";
    }

    // Highlight the active navbar item
    const currentFile = window.location.pathname.split("/").pop();
    const activeLink = navbar.querySelector(`.nav-link[href="${currentFile}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Set user coins
    navbar.querySelector('#navbar-user-points').innerHTML = userProfile.points;

    // Add the event listener to the logout button
    navbar.querySelector("#navbar-logout").addEventListener("click", async () => {
        const { message } = await apiLogout();
        window.location.href = "/login";

        console.log(message);
    });

    return navbar;
}

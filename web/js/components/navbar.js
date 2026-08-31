import { logout } from '/js/api/auth.js';

export async function loadNavbar(userFirstName, userRoles) {
    const response = await fetch('navbar.html');
    const text = await response.text()

    const template = document.createElement('template');
    template.innerHTML = text.trim();
    const navbarElement = template.content.firstElementChild;

    document.querySelector('#navbar').replaceWith(navbarElement);

    document.querySelector('#navbar-user-name').innerHTML = userFirstName;

    if (! userRoles.includes('student')) {
        document.querySelector('#navbar-listings-feed').parentElement.style.display = "none";
        document.querySelector('#navbar-my-listings').parentElement.style.display = "none";
        document.querySelector('#navbar-meal-requests').parentElement.style.display = "none";
        document.querySelector('#navbar-my-reservations').parentElement.style.display = "none";
    }

    if (! userRoles.includes('admin')) {
        document.querySelector('#navbar-admin-dashboard').parentElement.style.display = "none";
    }

    // Highlight the active navbar item
    const currentFile = window.location.pathname.split("/").pop();
    const activeLink = document.querySelector(`.nav-link[href="${currentFile}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Add the event listener to the logout button
    document.querySelector("#navbar-logout").addEventListener("click", async () => {
        const { message } = await logout();
        window.location.href = "/login";

        console.log(message);
    });
}

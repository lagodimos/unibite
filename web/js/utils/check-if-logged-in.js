import { apiIsUserLoggedIn } from "/js/api/auth.js";

/**
 * Redirects the user to the login page,
 * if they are not logged in
 */
export async function checkIfLoggedIn() {
    const { loggedIn } = await apiIsUserLoggedIn();
    if (!loggedIn) {
        window.location.replace("/login");

        console.log("User is not logged in.");
        console.log("Redirecting to the login page...");
    }
}

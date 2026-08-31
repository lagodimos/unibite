import { isUserLoggedIn, login } from "/js/api/auth.js";

const { loggedIn } = await isUserLoggedIn();

if (loggedIn) {
    window.location.replace("/");

    console.log("User is already logged in.");
    console.log("Redirecting to homepage...");
}
else {
    // Show the body as the user is not logged in
    // See css/login.css
    document.body.style.visibility = "visible";
}

document.querySelector("#login-button").addEventListener("click", async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const { message } = await login(email, password);

    if (message === "loginSuccessful") {
        window.location.replace('/');
    }

    console.log(message)
});

// Press Enter to login
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.querySelector("#login-button").click();
    }
});

async function checkIfUserIsAlreadyLoggedIn() {
    const response = await fetch("/api/auth/status");
    const { loggedIn } = await response.json();

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
}

checkIfUserIsAlreadyLoggedIn();

document.querySelector("#login-button").addEventListener("click", async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const { message } = await response.json();

    if (message === "loginSuccessful") {
        window.location.replace('/');
    }

    console.log(message)
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.querySelector("#login-button").click();
    }
});

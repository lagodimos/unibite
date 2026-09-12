import { elementFromHtml } from "../utils/element-from-html.js";
import { apiIsUserLoggedIn, apiLogin } from "/js/api/auth.js";

const { loggedIn } = await apiIsUserLoggedIn();

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

function loadLoginForm() {
    const loginForm = elementFromHtml(`
        <div class="container min-vh-100 d-flex align-items-center justify-content-center">

            <!-- Container for logo and form -->
            <div class="w-100" style="max-width: 400px;">

                <!-- UniBite Logo -->
                <div class="text-center mb-4">
                    <h1 class="fw-bold text-primary">UniBite</h1>
                </div>

                <!-- Login Form -->
                <div class="card shadow-sm">
                    <div class="card-body p-4">

                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                class="form-control"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                class="form-control"
                                required
                            >
                        </div>

                        <button
                            id="login-btn"
                            class="btn btn-primary w-100"
                        >
                            Login
                        </button>

                        <!-- Account registration link -->
                        <div class="text-end mt-3">
                            <a href="/register" class="text-decoration-none">
                                I don't have an account
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `);

    loginForm.querySelector("#login-btn").addEventListener(
        "click",
        loginButtonHandler
    );

    // Press Enter to login
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            enterKeyHandler();
        }
    });

    document.body.append(loginForm);
}

async function loginButtonHandler() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const { message } = await apiLogin(email, password);

    if (message === "loginSuccessful") {
        window.location.replace('/');
    }

    console.log(message)
}

function enterKeyHandler() {
    const loginButton = document.querySelector("#login-button");
    loginButton.click();
}

loadLoginForm();

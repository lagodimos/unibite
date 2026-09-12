import { apiRegister } from "../api/auth.js";
import { elementFromHtml } from "../utils/element-from-html.js";

function loadRegistrationForm() {
    const registrationForm = elementFromHtml(`
        <div class="container min-vh-100 d-flex align-items-center justify-content-center">

            <!-- Container for logo and form -->
            <div class="w-100" style="max-width: 400px;">

                <!-- UniBite Logo -->
                <div class="text-center mb-4">
                    <h1 class="fw-bold text-primary">UniBite</h1>
                </div>

                <!-- Registration Form -->
                <div class="card shadow-sm">
                    <div class="card-body p-4">

                        <!-- First Name / Last Name Row -->
                        <div class="row mb-3">

                            <!-- FIrst Name -->
                            <div class="col-6">
                                <label for="first-name" class="form-label">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    class="form-control"
                                    required
                                >
                            </div>

                            <!-- Last Name -->
                            <div class="col-6">
                                <label for="last-name" class="form-label">Last Name</label>
                                <input
                                    type="text"
                                    id="last-name"
                                    class="form-control"
                                    required
                                >
                            </div>
                        </div>


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
                            id="register-btn"
                            class="btn btn-primary w-100"
                        >
                            Register
                        </button>

                        <!-- Account login link -->
                        <div class="text-end mt-3">
                            <a href="/login" class="text-decoration-none">
                                I already have an account
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `);

    registrationForm.querySelector("#register-btn").addEventListener(
        "click",
        registerButtonHandler
    );

    document.body.append(registrationForm);
}

async function registerButtonHandler() {
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const { message } = await apiRegister(
        firstName,
        lastName,
        email,
        password
    );

    if (message === "registrationSuccessful") {
        window.location.replace('/');
    }

    console.log(message)
}

loadRegistrationForm();

export async function apiIsUserLoggedIn() {
    const response = await fetch("/api/auth/status");
    return await response.json();
}

export async function apiRegister(firstName, lastName, email, password) {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });

    return await response.json();
}

export async function apiLogin(email, password) {
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

    return await response.json();
}

export async function apiLogout() {
    const response = await fetch("/api/auth/logout", {
            method: "DELETE"
        });
    console.log(response);
    return await response.json();
}

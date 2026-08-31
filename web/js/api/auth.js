export async function isUserLoggedIn() {
    const response = await fetch("/api/auth/status");
    return await response.json();
}

export async function login(email, password) {
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

export async function logout() {
    const response = await fetch("/api/auth/logout", {
            method: "DELETE"
        });
    console.log(response);
    return await response.json();
}

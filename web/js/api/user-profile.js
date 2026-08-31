export async function getUserProfile() {
    const response = await fetch("/api/user-profile");
    return await response.json();
}

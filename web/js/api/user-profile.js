export async function apiGetUserProfile() {
    const response = await fetch("/api/user-profile");
    return await response.json();
}

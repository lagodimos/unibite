export async function apiGetLocations() {
    const response = await fetch(`/api/locations`);
    return await response.json();
}

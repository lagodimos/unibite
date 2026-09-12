export async function apiGetRequestedListings() {
    const response = await fetch(`/api/meal-requests`);
    return await response.json();
}

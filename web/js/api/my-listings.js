export async function apiGetMyListings() {
    const response = await fetch("/api/my-listings");
    return await response.json();
}

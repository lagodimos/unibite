export async function apiGetListingsFeed() {
    const response = await fetch("/api/listings-feed");
    return await response.json();
}

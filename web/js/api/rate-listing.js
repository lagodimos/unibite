export async function apiRateListing(listingId, rating) {
    const response = await fetch("/api/rate-listing", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            listingId,
            rating
        })
    });

    return await response.json();
}

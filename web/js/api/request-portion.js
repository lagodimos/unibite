export async function apiRequestPortion(listingId) {
    const response = await fetch("/api/request-portion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            listing_id: listingId
        })
    });

    return await response.json();
}

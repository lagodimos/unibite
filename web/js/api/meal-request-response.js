export async function apiMealRequestResponse(listingId, requesterId, approved) {
    const response = await fetch("/api/meal-request-response", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            listingId,
            requesterId,
            approved
        })
    });

    return await response.json();
}

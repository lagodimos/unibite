export async function apiSubmitReceptionStatus(listingId, requesterId, received) {
    const response = await fetch("/api/submit-reception-status", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            listingId,
            requesterId,
            received
        })
    });

    return await response.json();
}

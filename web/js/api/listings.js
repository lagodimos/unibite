export async function apiGetListing(listingId) {
    const response = await fetch(`/api/listings/${listingId}`);
    return await response.json();
}

export async function apiEditListing(formData) {
    const response = await fetch(`/api/listings/${formData.get("listing_id")}`, {
        method: "PATCH",
        body: formData
    });

    return await response.json();
}


export async function apiDeleteListing(listingId) {
    const response = await fetch(`/api/listings/${listingId}`, {
            method: 'DELETE'
        }
    );
    return await response.json();
}

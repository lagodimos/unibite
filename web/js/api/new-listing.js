export async function apiNewListing(formData) {
    const response = await fetch("/api/new-listing", {
        method: "POST",
        body: formData
    });

    return await response.json();
}

export async function apiGetAllergens() {
    const response = await fetch(`/api/allergens`);
    return await response.json();
}

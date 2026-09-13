export async function apiGetStats() {
    const response = await fetch(`/api/stats`);
    return await response.json();
}

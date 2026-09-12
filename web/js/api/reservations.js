export async function apiGetReservations() {
    const response = await fetch("/api/reservations");
    return await response.json();
}

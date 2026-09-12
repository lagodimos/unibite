import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { apiGetReservations } from '/js/api/reservations.js';
import { navbarElement } from '/js/components/navbar.js';
import { listingCardElement } from '../components/listing-card.js';
import { ratingModalElement } from '../components/rating-modal.js';
import { apiRateListing } from '../api/rate-listing.js';
import { elementFromHtml } from '../utils/element-from-html.js';

await checkIfLoggedIn();

async function reloadMyReservations() {
    const listings = await apiGetReservations();

    const myReservationsElement = elementFromHtml(`
        <main id="my-reservations" class="container my-3">
            <div id="my-reservations-container" class="row d-flex flex-wrap"></div>
        </main>
    `);

    const myReservationsContainer = myReservationsElement.querySelector('#my-reservations-container');

    for (const listing of listings) {
        // We can reuse the "request" button in this case too
        // because it shows the status of the request.
        // In thi case we dont need to addd an event listener though.
        const card = listingCardElement({
            listing,
            buttonType: "request_status_rate",
            enableRating: true,
            onRate: () => {
                rateButtonHandler(listing.listing_id)
            }
        });
        myReservationsContainer.appendChild(card);
    }

    // Reomve old reservations from the page
    const oldMyReservationsElement = document.querySelector('#my-reservations');
    if (oldMyReservationsElement) {
        oldMyReservationsElement.remove();
    }

    // Show the new listings
    document.body.append(myReservationsElement);
}

async function rateButtonHandler(listingId) {
    const ratingModal = ratingModalElement({
        onSubmit: (rating) => {
            submitRatingHandler(listingId, rating);
        }
    });
    const modal = bootstrap.Modal.getOrCreateInstance(ratingModal);
    modal.show();
}

async function submitRatingHandler(listingId, rating) {
    const { message } = await apiRateListing(listingId, rating);
    console.log(message);

    reloadMyReservations();
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

reloadMyReservations();

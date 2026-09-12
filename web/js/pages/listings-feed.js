import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { apiGetListingsFeed } from '../api/listings-feed.js';
import { apiGetListing } from '/js/api/listings.js';
import { apiRequestPortion } from '../api/request-portion.js';
import { navbarElement } from '/js/components/navbar.js';
import { listingCardElement } from '../components/listing-card.js';
import { elementFromHtml } from '../utils/element-from-html.js';

await checkIfLoggedIn();

async function reloadListingsFeed() {
    const listings = await apiGetListingsFeed();

    const listingsFeedElement = elementFromHtml(`
        <main id="listings-feed" class="container my-3">
            <div id="listings-feed-container" class="row d-flex flex-wrap"></div>
        </main>
    `);

    const listingsFeedContainer = listingsFeedElement.querySelector('#listings-feed-container');

    for (const listing of listings) {
        // createListingCardElement() creates a button with id
        // listing-btn-<listing-id-here> when button type is "request"
        const card = listingCardElement({
            listing: listing,
            buttonType: "request_status_rate",
            onRequestPortion: () => {
                requestPortionButtonHandler(listing.listing_id);
            }
        });

        listingsFeedContainer.appendChild(card);
    }

    // Remove old listings from page
    let oldListingsFeedElement = document.querySelector('#listings-feed');
    if (oldListingsFeedElement) {
        oldListingsFeedElement.remove();
    }

    // Show new listings
    document.body.append(listingsFeedElement);
}

async function requestPortionButtonHandler(listingId) {
    const response = await apiRequestPortion(listingId);
    console.log(response.message);

    const listing = await apiGetListing(listingId);

    const card = document.querySelector(`#listing-card-${listingId}`);
    card.replaceWith(listingCardElement({
        listing: listing,
        buttonType: "request_status_rate"
    }));
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

reloadListingsFeed();

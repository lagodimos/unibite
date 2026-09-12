import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { apiGetMyListings } from '/js/api/my-listings.js';
import { navbarElement } from '/js/components/navbar.js';
import { addListingCardElement, listingCardElement } from '../components/listing-card.js';
import { listingModalElement } from '../components/listing-modal.js';
import { apiNewListing } from '../api/new-listing.js';
import { apiEditListing, apiDeleteListing } from '../api/listings.js';
import { elementFromHtml } from '../utils/element-from-html.js';

await checkIfLoggedIn();

async function reloadMyListings() {
    const listings = await apiGetMyListings();

    const myListingsElement = elementFromHtml(`
        <main id="my-listings" class="container my-3">
            <div id="my-listings-container" class="row d-flex flex-wrap"></div>
        </main>
    `);

    const myListingsContainer = myListingsElement.querySelector('#my-listings-container');

    // Add the "Add listing" button
    myListingsContainer.append(addListingCardElement({
        onAddListing: addListingButtonHandler
    }));

    // Add the listings
    for (const listing of listings) {
        // createListingCardElement() creates a button with id
        // listing-btn-<listing-id-here> when button type is "request"
        const listingCard = listingCardElement({
            listing: listing,
            buttonType: "edit_and_delete",
            onEdit: () => {
                editButtonHandler(listing);
            },
            onDelete: () => {
                deleteButtonHandler(listing);
            }
        });
        myListingsContainer.appendChild(listingCard);
    }

    // Reomve old listings from the page
    const oldMyListingsElement = document.querySelector('#my-listings');
    if (oldMyListingsElement) {
        oldMyListingsElement.remove();
    }

    // Show the new listings
    document.body.append(myListingsElement);
}

async function addListingButtonHandler() {
    const addListingModal = listingModalElement({
        onPublish: (formData) => {
            publishButtonHandler(formData);
        }
    });
    document.body.append(addListingModal);

    // The modal is set to be removed
    // when it's dismissed
    const modal = bootstrap.Modal.getOrCreateInstance(addListingModal);
    modal.show();
}

async function publishButtonHandler(formData) {
    const { message } = await apiNewListing(formData);
    console.log(message);

    reloadMyListings();
}

async function editButtonHandler(listing) {
    const editListingModal = listingModalElement({
        oldListing: listing,
        onSaveChanges: (formData) => {
            saveChangesButtonHandler(formData);
        }
    });
    document.body.append(editListingModal);

    // The modal is set to be removed
    // when it's dismissed
    const modal = bootstrap.Modal.getOrCreateInstance(editListingModal);
    modal.show();
}

async function saveChangesButtonHandler(formData) {
    const { message } = await apiEditListing(formData);
    console.log(message);

    reloadMyListings();
}

async function deleteButtonHandler(listing) {
    const { message } = await apiDeleteListing(listing.listing_id);
    console.log(message);

    reloadMyListings();
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

reloadMyListings();

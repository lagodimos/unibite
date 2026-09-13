import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { apiGetListingsFeed } from '../api/listings-feed.js';
import { apiGetListing } from '/js/api/listings.js';
import { apiRequestPortion } from '../api/request-portion.js';
import { navbarElement } from '/js/components/navbar.js';
import { listingCardElement } from '../components/listing-card.js';
import { elementFromHtml } from '../utils/element-from-html.js';

await checkIfLoggedIn();

let leafletMap = null;

async function reloadListingsFeed() {
    const listings = await apiGetListingsFeed();

    const viewSelectorElement = elementFromHtml(`
        <div id="feed-controls" class="container mt-4 mb-2 d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group" aria-label="View Mode Toggle">
                <button type="button" class="btn btn-outline-success active" id="btn-view-list">
                    <i class="bi bi-list-ul me-1"></i> List
                </button>
                <button type="button" class="btn btn-outline-success" id="btn-view-map">
                    <i class="bi bi-map me-1"></i> Map
                </button>
            </div>
        </div>
    `);
    setupViewSelector(viewSelectorElement);

    const listingsFeedElement = elementFromHtml(`
        <main id="listings-feed" class="container my-3">

            <!-- List view -->
            <div id="listings-list-view">
                <div id="listings-feed-container" class="row d-flex flex-wrap"></div>
            </div>

            <!-- Map view -->
            <div id="listings-map-view" class="d-none">
                <div id="map" class="shadow-sm border rounded" style="height: calc(100vh - 150px); width: 100%;"></div>
            </div>
        </main>
    `);

    const listingsFeedContainer = listingsFeedElement.querySelector('#listings-feed-container');

    for (const listing of listings) {
        // createListingCardElement() creates a button with id
        // listing-btn-<listing-id-here>[-<forView-here>] when button type is "request"
        // -<forView> suffix is added only if suffix is passed
        const card = listingCardElement({
            listing: listing,
            buttonType: "request_status_rate",
            onRequestPortion: () => {
                requestPortionButtonHandler(listing.listing_id);
            },
            forView: 'list'
        });

        listingsFeedContainer.appendChild(card);
    }

    let oldControls = document.querySelector('#feed-controls');
    if (oldControls) {
        oldControls.remove();
    }

    // Remove old listings from page
    let oldListingsFeedElement = document.querySelector('#listings-feed');
    if (oldListingsFeedElement) {
        oldListingsFeedElement.remove();
    }

    document.body.append(viewSelectorElement)

    // Show new listings
    document.body.append(listingsFeedElement);

    initLeafletMap(listings);
}

function setupViewSelector(viewSelector) {
    const listButton = viewSelector.querySelector('#btn-view-list');
    const mapButton = viewSelector.querySelector('#btn-view-map');

    listButton.addEventListener('click', () => {
        const listView = document.querySelector('#listings-list-view');
        const mapView = document.querySelector('#listings-map-view');

        listButton.classList.add('active');
        mapButton.classList.remove('active');
        listView.classList.remove('d-none');
        mapView.classList.add('d-none');
    });

    mapButton.addEventListener('click', () => {
        const listView = document.querySelector('#listings-list-view');
        const mapView = document.querySelector('#listings-map-view');

        mapButton.classList.add('active');
        listButton.classList.remove('active');
        mapView.classList.remove('d-none');
        listView.classList.add('d-none');

        if (leafletMap) {
            setTimeout(() => {
                leafletMap.invalidateSize();
            }, 100);
        }
    });
}

function initLeafletMap(listings) {
    const defaultLat = 38.2851972;
    const defaultLng = 21.7829352;

    if (leafletMap) {
        leafletMap.remove();
    }

    leafletMap = L.map('map').setView([defaultLat, defaultLng], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafletMap);

    listings.forEach((listing) => {

        const marker = L.marker(
            [
                listing.pickup_point_latitude,
                listing.pickup_point_longitude
            ],
            {   // mark inactive listings
                opacity: listing.is_active ? 1.0 : 0.55
            }
        ).addTo(leafletMap);

        marker.bindPopup(
            listingCardElement({
                listing: listing,
                buttonType: "request_status_rate",
                onRequestPortion: () => {
                    requestPortionButtonHandler(listing.listing_id, marker);
                },
                forView: 'map'
            })
        )
    });
}

async function requestPortionButtonHandler(listingId, marker) {
    const response = await apiRequestPortion(listingId);
    console.log(response.message);

    const listing = await apiGetListing(listingId);

    const listCard = document.querySelector(`#listing-card-${listingId}-list`);
    if (listCard) {
        listCard.replaceWith(listingCardElement({
            listing: listing,
            buttonType: "request_status_rate",
            forView: 'list'
        }));
    }

    if (marker) {
        marker.bindPopup(listingCardElement({
            listing: listing,
            buttonType: "request_status_rate",
            forView: 'map'
        }));
    }
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

reloadListingsFeed();

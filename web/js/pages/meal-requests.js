import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { navbarElement } from '/js/components/navbar.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { apiGetRequestedListings } from '../api/meal-requests.js';
import { elementFromHtml } from '../utils/element-from-html.js';
import { requestCard } from '../components/request-card.js';
import { apiMealRequestResponse } from '../api/meal-request-response.js';
import { apiSubmitReceptionStatus } from '../api/submit-reception-status.js'

await checkIfLoggedIn();

async function reloadMealRequests() {
    const mealRequestsElement = elementFromHtml(`
        <div class="container my-5" id="meal-requests">

            <!-- Requested -->
            <section class="mb-5">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="h5 mb-0">Requested</h2>
                    <span
                        class="badge bg-warning text-dark ms-2"
                        id="requested-counter"
                    ></span>
                </div>
                <div id="requested-list"></div>
            </section>


            <!-- Approved -->
            <section class="mb-5">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="h5 mb-0">Approved</h2>
                    <span
                        class="badge bg-success ms-2"
                        id="approved-counter"
                    ></span>
                </div>
                <div id="approved-list"></div>
            </section>


            <!-- Rejected -->
            <section class="mb-5">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="h5 mb-0">Rejected</h2>
                    <span
                        class="badge bg-danger ms-2"
                        id="rejected-counter"
                    ></span>
                </div>
                <div id="rejected-list"></div>
            </section>

        </div>
    `);

    const requestedListElement = mealRequestsElement.querySelector("#requested-list");
    const approvedListElement = mealRequestsElement.querySelector("#approved-list");
    const rejectedListElement = mealRequestsElement.querySelector("#rejected-list");

    const requestedCounterElement = mealRequestsElement.querySelector("#requested-counter");
    const approvedCounterElement = mealRequestsElement.querySelector("#approved-counter");
    const rejectedCounterElement = mealRequestsElement.querySelector("#rejected-counter");

    const listings = await apiGetRequestedListings();

    let requestedList = [];
    let approvedList = [];
    let rejectedList = [];

    // Put each request in the appropriate list
    for (const listing of listings) {
        for (const request of listing.requests) {
            const finalRequest = {
                ...listing,
                request: request
            }

            switch (request.status) {
                case 'requested':
                    requestedList.push(finalRequest);
                    break;
                case 'approved':
                    approvedList.push(finalRequest);
                    break;
                case 'rejected':
                    rejectedList.push(finalRequest);
                    break;
            }
        }
    }

    requestedCounterElement.innerHTML = requestedList.length;
    approvedCounterElement.innerHTML = approvedList.length;
    rejectedCounterElement.innerHTML = rejectedList.length;

    for (const listing of requestedList) {
        requestedListElement.append(
            requestCard({
                listing,
                onApprove: () => {
                    acceptButtonHandler(listing);
                },
                onReject: () => {
                    rejectButtonHandler(listing);
                }
            })
        );
    }

    for (const listing of approvedList) {
        if (listing.request.received == null) {
            approvedListElement.append(
                requestCard({
                    listing,
                    onReceived: () => {
                        receivedButtonHandler(listing);
                    },
                    onNotReceived: () => {
                        notReceivedButtonHandler(listing);
                    }
                })
            );
        }
        else {
            approvedListElement.append(
                requestCard({
                    listing
                })
            );
        }
    }

    for (const listing of rejectedList) {
        rejectedListElement.append(
            requestCard({
                listing,
            })
        );
    }

    // Remove old requests from page
    const oldMealRequestsElement = document.querySelector("#meal-requests");
    if (oldMealRequestsElement) {
        oldMealRequestsElement.remove();
    }

    document.body.append(mealRequestsElement);
}

async function acceptButtonHandler(listing) {
    const { message } = await apiMealRequestResponse(
        listing.listing_id,
        listing.request.requester_id,
        true
    );
    console.log(message);

    reloadMealRequests();
}

async function rejectButtonHandler(listing) {
    const { message } = await apiMealRequestResponse(
        listing.listing_id,
        listing.request.requester_id,
        false
    );
    console.log(message);

    reloadMealRequests();
}

async function receivedButtonHandler(listing) {
    const { message } = await apiSubmitReceptionStatus(
        listing.listing_id,
        listing.request.requester_id,
        true
    );
    console.log(message);

    reloadMealRequests();
}

async function notReceivedButtonHandler(listing) {
    const { message } = await apiSubmitReceptionStatus(
        listing.listing_id,
        listing.request.requester_id,
        false
    );
    console.log(message);

    reloadMealRequests();
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

reloadMealRequests();

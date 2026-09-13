import { elementFromHtml } from '/js/utils/element-from-html.js';

export function addListingCardElement({ onAddListing }) {
    const addListingCard = elementFromHtml(`
        <div class="col-12 col-sm-8 col-md-5 col-lg-4 col-xxl-3 m-2">
            <button class="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center"
                id="add-listing-btn"
                >

                <i class="bi bi-plus-lg fs-1"></i>
                <span>Add listing</span>
            </button>
        </div>
    `);

    const addListingButton = addListingCard.querySelector(`#add-listing-btn`);
    addListingButton.addEventListener("click", () => {
        onAddListing();
    });

    return addListingCard;
}

export function listingCardElement({ listing, buttonType, enableRating=false, onRequestPortion, onEdit, onDelete, onRate, forView='' }) {
    const { buttonColor, buttonText, isButtonEnabled } = calcListingRequestButtonProperties(
        listing.is_active,
        listing.status_for_current_user
    );

    let idSuffix = '';
    if (forView !== '') {
        idSuffix = `-${forView}`;
    }


    const imageClass = !listing.is_active ? "opacity-50" : "";

    const listingCard = elementFromHtml(`
        <div id="listing-card-${listing.listing_id}${idSuffix}"
            class="${forView === 'map' ? 'col' : 'col-12 col-sm-8 col-md-5 col-lg-4 col-xxl-3'} m-2"
        >
            <div class="card h-100 shadow-sm">

                <!-- Photo -->
                ${ listing.photo_filename ? `
                    <img
                        src="/uploads/images/${listing.photo_filename}"
                        class="card-img-top ${imageClass}"
                        alt="${listing.title}"
                        style="height: 200px; object-fit: cover;"
                    >` : `
                    <div
                        class="card-img-top ${imageClass} bg-light d-flex align-items-center justify-content-center"
                        style="height: 200px;"
                    >
                        <i class="bi bi-fork-knife text-secondary" style="font-size: 4rem;"></i>
                    </div>`
                }

                <div class="card-body d-flex flex-column">

                    <!-- Title -->
                    <h5 class="card-title mb-2">
                        ${listing.title}
                    </h5>

                    <!-- Notes -->
                    <p class="card-text text-muted">
                        ${listing.notes ?? ""}
                    </p>

                    <div class="mt-auto">

                        <!-- Allergens -->
                        <p class="mb-1">
                            <strong>Allergens:</strong>
                            ${listing.allergens.length !== 0 ?
                                listing.allergens.join(", ") :
                                "None"
                            }
                        </p>

                        <!-- Available portions -->
                        <p class="mb-1">
                            <strong>Avail. Portions:</strong>
                            ${listing.total_portions - listing.reserved_portions} / ${listing.total_portions}
                        </p>

                        <!-- Pickup time -->
                        <p class="mb-1">
                            <strong>Pickup:</strong>
                            ${formatDate(listing.pickup_datetime)}
                        </p>

                        <!-- Location -->
                        <p class="mb-3">
                            <strong>Location:</strong>
                            ${
                                listing.pickup_point_description +
                                (listing.pickup_point_room_number
                                    ? `, Room ${listing.pickup_point_room_number}`
                                    : "")
                            }
                        </p>

                        <!-- Rating -->
                        ${ listing.current_user_rating != null ?
                            `<p class="mb-3">
                                <strong>Your rating:</strong>
                                ${'⭐'.repeat(listing.current_user_rating)}
                            </p>` : ""
                        }

                        <!-- Request/Status button -->
                        ${ buttonType === "request_status_rate"
                            && (enableRating == false || !listing.received_by_current_user) ?
                            `<button
                                id="listing-btn-${listing.listing_id}${idSuffix}"
                                class="btn ${buttonColor} w-100"
                                ${
                                    !isButtonEnabled
                                        ? "disabled"
                                        : ""
                                }
                            >
                                ${buttonText}
                            </button>` :
                            ""
                        }

                        <!-- Rate button -->
                        ${ buttonType === "request_status_rate"
                            && listing.received_by_current_user
                            && listing.current_user_rating == null ?
                            `<button
                                id="rate-btn-${listing.listing_id}${idSuffix}"
                                class="btn btn-warning w-100"
                            >
                                Rate
                            </button>` : ""
                        }

                        <!-- Edit and Delete button if needed -->
                        ${buttonType === "edit_and_delete" ?
                            `<div class="d-flex gap-2">
                                <button class="btn btn-outline-primary flex-grow-1"
                                    id="edit-btn-${listing.listing_id}${idSuffix}"
                                >
                                    Edit
                                </button>

                                <button class="btn btn-danger"
                                    id="delete-btn-${listing.listing_id}${idSuffix}"
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                            ` :
                            ""
                        }

                    </div>
                </div>
            </div>
        </div>
    `);

    if (buttonType === "request_status_rate"
        && (enableRating == false || !listing.received_by_current_user)
    ) {
        const requestButton = listingCard.querySelector(`#listing-btn-${listing.listing_id}${idSuffix}`);
        requestButton.addEventListener("click", () => {
            onRequestPortion();
        });
    }
    else if (
        buttonType === "request_status_rate"
        && listing.received_by_current_user
        && listing.current_user_rating == null
        && enableRating
    ) {
        const rateButton = listingCard.querySelector(`#rate-btn-${listing.listing_id}${idSuffix}`);
        rateButton.addEventListener("click", () => {
            onRate();
        });
    }
    else if (buttonType === "edit_and_delete") {
        const editButton = listingCard.querySelector(`#edit-btn-${listing.listing_id}${idSuffix}`);
        const deleteButton = listingCard.querySelector(`#delete-btn-${listing.listing_id}${idSuffix}`);

        editButton.addEventListener("click", () => {
            onEdit();
        });

        deleteButton.addEventListener("click", () => {
            onDelete();
        });
    }

    return listingCard;
}

function calcListingRequestButtonProperties(isListingActive, statusForCurrentUser) {
    const variants = {
        active: {
            not_requested: {
                color: "btn-primary",
                text: "Request a portion"
            },
            requested: {
                color: "btn-warning",
                text: "Request pending"
            },
            approved: {
                color: "btn-success",
                text: "Request accepted"
            },
            rejected: {
                color: "btn-danger",
                text: "Request rejected"
            }
        },

        inactive: {
            not_requested: {
                color: "btn-secondary",
                text: "Unavailable"
            },
            approved: {
                color: "btn-success",
                text: "Request accepted"
            },
            rejected: {
                color: "btn-danger",
                text: "Request rejected"
            }
        }
    };

    const variantGroup = isListingActive ? variants.active : variants.inactive
    const variant = variantGroup[statusForCurrentUser];

    const isEnabled = isListingActive && statusForCurrentUser === 'not_requested';

    return {
        buttonColor: variant.color,
        buttonText: variant.text,
        isButtonEnabled: isEnabled
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

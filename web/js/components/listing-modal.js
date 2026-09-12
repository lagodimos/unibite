import { elementFromHtml } from '/js/utils/element-from-html.js';
import { apiGetAllergens } from '../api/allergens.js';
import { apiGetLocations } from '../api/locations.js';

const allergens = await apiGetAllergens();
const locations = await apiGetLocations();

/**
 * @param {*} oldListing - if passed the modal will edit
 * the specified listing instead of creating a new one
 */
export function listingModalElement({ oldListing, onPublish, onSaveChanges }) {
    const listingModal = elementFromHtml(`
    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        ${!oldListing ? "New listing" : "Edit Listing"}
                    </h5>

                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
                    </button>
                </div>

                <form id="listing-form">
                    <div class="modal-body">

                        <!-- Listing Title -->
                        <div class="mb-3">
                            <label for="listing-title" class="form-label">
                                Title
                            </label>
                            <input type="text"
                                class="form-control"
                                id="listing-title"
                                name="title"
                                required
                            >
                        </div>

                        <!-- Listing Photo -->
                        <div class="mb-3">
                            <label for="listing-photo" class="form-label">Photo (Optional)</label>

                            ${ oldListing?.original_photo_filename ?
                                `<div class="mb-2 text-muted">
                                    Current photo: <strong>${oldListing.original_photo_filename}</strong>
                                </div>` : ""
                            }

                            <input
                                class="form-control"
                                type="file"
                                id="listing-photo"
                                name="photo"
                                accept="image/*"
                            >
                        </div>

                        <!-- Listing Notes -->
                        <div class="mb-3">
                            <label for="listing-notes" class="form-label">
                                Notes
                            </label>
                            <textarea
                                class="form-control"
                                id="listing-notes"
                                name="notes"
                                rows="4"
                                placeholder="Describe your meal and what it includes..."
                                required
                            ></textarea>
                        </div>

                        <!-- Listing Total Portions -->
                        <div class="mb-3">
                            <label for="listing-total-portions" class="form-label">
                                Total Portions
                            </label>
                            <input
                                type="number"
                                class="form-control"
                                id="listing-total-portions"
                                name="totalPortions"
                                min="1"
                                step="1"
                                value="1"
                                required
                            >
                        </div>

                        <!-- Listing Pickup Time -->
                        <div class="mb-3">
                            <label for="pickup-datetime" class="form-label">Pickup date and time</label>
                            <input
                                type="datetime-local"
                                class="form-control"
                                id="listing-pickup-date-time"
                                name="pickupDateTime"
                                min="${localTimeWithOffset(Date.now(), 0)}"
                                max="${
                                    localTimeWithOffset(
                                        !oldListing ? Date.now() :
                                            new Date(oldListing.creation_datetime).getTime(),
                                        2 * 24 * 60 * 60
                                    )
                                }"
                                required
                            >
                        </div>

                        <!-- Listing Pickup Point -->
                        <div class="dropdown mb-3">
                            <label for="listing-pickup-point" class="form-label">
                                Pickup Point
                            </label>
                            <select
                                class="form-select"
                                id="listing-pickup-point"
                                name="pickupPoint"
                                required
                            >
                                <option value="" selected disabled>Select pickup point</option>
                                ${locations.map(location => `
                                    <option value="${location.name}">${location.name}</option>
                                    `).join("")
                                }
                            </select>
                        </div>

                        <!-- Room Number -->
                        <div
                            class="mb-3"
                            id="listing-room-number-container"
                            style="display: none;"
                        >
                            <label for="listing-room-number" class="form-label">
                                Room number
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="listing-room-number"
                                name="roomNumber"
                            >
                        </div>

                        <!-- Listing Allergens -->
                        <label class="form-label">
                            Allergens
                        </label>
                        <div class="row g-2">
                            ${ allergens.map(allergen => `
                                    <div class="col-6 col-sm-4 col-md-4 col-lg-3">
                                        <input type="checkbox"
                                            class="btn-check"
                                            id="listing-allergen-${allergen}"
                                            name="${allergen}"
                                            autocomplete="off"
                                        >
                                        <label class="btn btn-outline-primary" for="listing-allergen-${allergen}">
                                            ${allergen}
                                        </label>
                                    </div>
                                `).join("")
                            }
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal">
                            Cancel
                        </button>

                        <button type="submit" class="btn btn-primary">
                            ${ !oldListing ? "Publish" : "Save changes"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
    `);

    const titleInput = listingModal.querySelector("#listing-title");
    const notesInput = listingModal.querySelector("#listing-notes");
    const totalPortionsInput = listingModal.querySelector("#listing-total-portions");
    const pickupDateTimeInput = listingModal.querySelector("#listing-pickup-date-time");
    const pickupPointInput = listingModal.querySelector("#listing-pickup-point");
    const roomNumberContainer = listingModal.querySelector("#listing-room-number-container");
    const roomNumberInput = listingModal.querySelector("#listing-room-number");
    const allergenInputs = {};

    for (const allergen of allergens) {
        allergenInputs[allergen] = listingModal.querySelector(`#listing-allergen-${allergen}`);
    }

    // If the uer is editing an existing listing,
    // fill the inouts with the current values
    if (oldListing) {
        titleInput.value = oldListing.title;
        notesInput.value = oldListing.notes;
        totalPortionsInput.value = oldListing.total_portions;
        pickupDateTimeInput.value = oldListing.pickup_datetime
            .slice(0, 16);
        pickupPointInput.value = oldListing.pickup_point_description;

        if (oldListing.room_number) {
            roomNumberInput.value = oldListing.room_number;
        }

        Object.entries(allergenInputs).forEach(([key, value]) => {
            if (oldListing.allergens.includes(key)) {
                value.checked = true;
            }
        });

    }

    const listingBsModal = bootstrap.Modal.getOrCreateInstance(listingModal);

    // Destroy the modal when it gets hidden
    listingModal.addEventListener('hidden.bs.modal', () => {
        listingBsModal.dispose();
        listingModal.remove();
    }, { once: true });

    // Enable/Disable the "Room number" text input when needed
    pickupPointInput.addEventListener("change", function () {
        if (this.value === "Φοιτητική Εστία Πανεπιστήμιο Πατρών") {
            roomNumberContainer.style.display = "block";
            roomNumberInput.required = true;
        } else {
            roomNumberContainer.style.display = "none";
            roomNumberInput.required = false;
            roomNumberInput.value = '';
        }
    });

    // Form submission event listener
    const form = listingModal.querySelector(`#listing-form`);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        if (oldListing) {
            formData.set('listing_id', oldListing.listing_id);
        }

        // Modify the form data
        // so they are in a more usable form

        // Send all allergens under the name "allergens"
        for (const allergen of allergens) {
            if (formData.get(allergen) === "on") {
                formData.delete(allergen);
                formData.append("allergens", allergen);
            }
        }

        // Add latitude and longitude to form data
        // based on the selected pickup point
        const locations = await apiGetLocations();
        const { latitude, longitude } = locations.find(
            (location) => location.name === formData.get('pickupPoint')
        );
        formData.set('latitude', latitude);
        formData.set('longitude', longitude);

        if (!oldListing) {
            onPublish(formData);
        }
        else {
            onSaveChanges(formData);
        }

        // Hide Modal
        listingBsModal.hide();
    });

    return listingModal;
}

function localTimeWithOffset(dateTime, offsetInSeconds) {
    return new Date(
        dateTime
        - new Date().getTimezoneOffset() * 60 * 1000
        + offsetInSeconds * 1000
    ).toISOString().slice(0, 16)
}

import { elementFromHtml } from '/js/utils/element-from-html.js';

export function ratingModalElement({ onSubmit }) {
    const ratingModal = elementFromHtml(`
        <div
            class="modal fade"
            id="ratingModal"
            tabindex="-1"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">
                            Rate this listing
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div class="modal-body text-center">

                        <p class="mb-3">
                            How would you this meal?
                        </p>

                        <div class="text-center">

                            <div id="starRating" class="fs-1">
                                <span class="star" id="star-1">☆</span>
                                <span class="star" id="star-2">☆</span>
                                <span class="star" id="star-3">☆</span>
                                <span class="star" id="star-4">☆</span>
                                <span class="star" id="star-5">☆</span>
                            </div>

                            <input type="hidden" id="rating" value="0">

                        </div>

                    </div>

                    <div class="modal-footer">

                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            class="btn btn-primary"
                            id="submit-btn"
                            disabled
                        >
                            Submit
                        </button>

                    </div>

                </div>
            </div>
        </div>
    `);

    const ratingBsModal = bootstrap.Modal.getOrCreateInstance(ratingModal);

    // Destroy the modal when it gets hidden
    ratingModal.addEventListener('hidden.bs.modal', () => {
        ratingBsModal.dispose();
        ratingModal.remove();
    }, { once: true });

    const submitButton = ratingModal.querySelector("#submit-btn");
    const ratingInput = ratingModal.querySelector("#rating");

    let starElements = [];
    for (let i = 0; i < 5; i++) {
        starElements[i] = ratingModal.querySelector(`#star-${i + 1}`);
    }

    starElements.forEach(starElement => {
        starElement.addEventListener("click", () => {
            const rating = Number(
                starElement.id.slice(-1)
            );

            ratingInput.value = rating;

            for (let i = 0; i < 5; i++) {
                starElements[i].innerHTML =
                    i + 1 <= rating ?
                        "★" : "☆";
            }

            submitButton.disabled = false;
        });
    });

    submitButton.addEventListener("click", () => {
        onSubmit(ratingInput.value);
        ratingBsModal.hide();
    })

    return ratingModal;
}

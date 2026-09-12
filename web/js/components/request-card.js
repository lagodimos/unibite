import { elementFromHtml } from "../utils/element-from-html.js";

export function requestCard({ listing, buttonType, onApprove, onReject, onReceived, onNotReceived }) {
    const request = listing.request;

    const status = request.status;

    const card = elementFromHtml(`
        <div class="card shadow-sm mb-2">
            <div class="card-body">
                <div class="row align-items-center">

                    <!-- Request information -->
                    <div class="col">
                        <div class="fw-semibold">${listing.title}</div>
                        <div class="text-muted small">
                            by ${request.requester_first_name} ${request.requester_last_name}
                        </div>
                    </div>

                    ${ status === "requested" ?
                        `<!-- Approve and Reject buttons -->
                        <div class="col-auto">
                            <button
                                class="btn btn-success btn-sm me-2"
                                id="approve-request-btn"
                            >
                                Approve
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                id="reject-request-btn"
                            >
                                Reject
                            </button>
                        </div>` : ''
                    }

                    ${ status === "approved" && request.received == null ?
                        `<!-- Received and Not Received buttons -->
                        <div class="col-auto">
                            <button
                                class="btn btn-outline-success btn-sm"
                                id="received-btn"
                            >
                                Received
                            </button>

                            <button
                                class="btn btn-outline-danger btn-sm"
                                id="not-received-btn"
                            >
                                Not Received
                            </button>
                        </div>` : ''
                    }

                    ${ status === "approved" && request.received != null ?
                        `<!-- Reception status -->
                        <div class="col-auto">
                            ${ request.received ?
                                `<button
                                    class="btn btn-success btn-sm"
                                    disabled
                                >
                                    Received
                                </button>` :

                                `<button
                                    class="btn btn-outline-danger btn-sm"
                                    disabled
                                >
                                    Not Received
                                </button>`
                            }
                        </div>` : ''
                    }

                    ${ status === 'rejected' ?
                        `<!-- Not Received status -->
                        <div class="col-auto">
                            <button
                                class="btn btn-outline-danger btn-sm"
                                disabled
                            >
                                Rejected
                            </button>
                        </div>
                        ` : ''
                    }

                </div>
            </div>
        </div>
    `);

    /* Add event listeners */

    if (status === "requested") {
        const acceptButton = card.querySelector('#approve-request-btn');
        const rejectButton = card.querySelector('#reject-request-btn');

        acceptButton.addEventListener("click", () => {
            onApprove();
        });

        rejectButton.addEventListener("click", () => {
            onReject();
        });
    } else if (status === "approved" && request.received == null) {
        const receivedButton = card.querySelector('#received-btn');
        const notReceivedButton = card.querySelector('#not-received-btn');

        receivedButton.addEventListener("click", () => {
            onReceived();
        });

        notReceivedButton.addEventListener("click", () => {
            onNotReceived();
        });
    }

    return card;
}

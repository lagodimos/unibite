import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { navbarElement } from '/js/components/navbar.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';
import { elementFromHtml } from '../utils/element-from-html.js';
import { apiGetStats } from '/js/api/stats.js'

await checkIfLoggedIn();

async function loadAdminDashboard() {
    const {
        monthlySharedPortions,
        topDonor,
        topRatedMeals
    } = await apiGetStats();

    const adminDashboardElement = elementFromHtml(`
        <main class="container my-4" style="max-width: 900px;">

            <!-- Row for Monthly Portions and Top Donor
            <div class="row g-3 mb-4">


                <!-- Monthly Portions -->
                <div class="col-12 col-md-5">
                    <div class="card border-0 shadow-sm bg-success bg-gradient text-white p-3 h-100">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <span class="medium fw-bold opacity-75">Monthly Shared Portions</span>
                            <div class="display-4 fw-bold my-2">${monthlySharedPortions}</div>
                        </div>
                    </div>
                </div>


                <!-- Top Donor -->
                <div class="col-12 col-md-7">
                    <div class="card border-0 shadow-sm p-3 h-100 bg-white">
                        <div class="card-body d-flex flex-column justify-content-between">

                            <span class="text-uppercase small fw-bold text-muted">🏆 Top Donor</span>
                            <div class="d-flex align-items-center gap-3 my-2">
                                <div class="bg-warning-subtle text-warning border border-warning rounded-circle d-flex align-items-center justify-content-center fs-3 fw-bold" style="width: 50px; height: 50px;">
                                    🥇
                                </div>
                                <div>
                                    <h5 class="fw-bold mb-0 text-dark">${topDonor?.first_name} ${topDonor?.last_name}</h5>
                                    <small class="text-muted">${topDonor?.email}</small>
                                </div>
                            </div>
                            <div>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle">
                                    ${topDonor?.total_portions_donated} portions shared
                                </span>
                            </div>

                        </div>
                    </div>
                </div>


            </div>


            <!-- Top Rated Meals -->
            <div class="card border-0 shadow-sm p-3 bg-white">
                <div class="card-body">
                    <h5 class="fw-bold text-dark mb-3">⭐ Top Rated Meals</h5>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light small text-uppercase">
                                <tr>
                                    <th style="width: 50px;">#</th>
                                    <th>Meal Title</th>
                                    <th>Cook</th>
                                    <th class="text-end">Average Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topRatedMeals && topRatedMeals.length > 0 ? topRatedMeals.map((meal, index) => `
                                    <tr>
                                        <td class="fw-bold text-muted">${index + 1}</td>
                                        <td class="fw-semibold text-dark">${meal.title}</td>
                                        <td class="text-secondary small">${topDonor?.first_name} ${topDonor?.last_name}</td>
                                        <td class="text-end">
                                            <span class="badge bg-warning text-dark border border-warning-subtle">
                                                ★ ${meal.average_rating} / 5
                                            </span>
                                        </td>
                                    </tr>
                                `).join('') : `
                                    <tr>
                                        <td colspan="4" class="text-center text-muted py-3 small">
                                            No rated meals available yet.
                                        </td>
                                    </tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `);

    document.body.append(adminDashboardElement);
}

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

loadAdminDashboard();

import { checkIfLoggedIn } from '../utils/check-if-logged-in.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';

checkIfLoggedIn();

const userProfile = await apiGetUserProfile();

if (userProfile.roles.includes('student')) {
    // Redirect to the feed page
    window.location.replace("listings-feed");
}
else if (userProfile.roles.includes('admin')) {
    // Redirect to the admin dashboard
    window.location.replace("admin-dashboard");
}

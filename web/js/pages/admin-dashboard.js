import { checkIfLoggedIn } from '/js/utils/check-if-logged-in.js';
import { navbarElement } from '/js/components/navbar.js';
import { apiGetUserProfile } from '/js/api/user-profile.js';

await checkIfLoggedIn();

const userProfile = await apiGetUserProfile();

document.body.prepend(navbarElement({
    userProfile: userProfile
}));

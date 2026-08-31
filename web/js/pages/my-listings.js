import { loadNavbar } from '/js/components/navbar.js';
import { getUserProfile } from '/js/api/user-profile.js';

const userProfile = await getUserProfile();

loadNavbar(userProfile.firstName, userProfile.roles);

```
podman-compose up
```

## API Endpoints

GET /api/user-profile

GET /api/auth/status -> check if user is logged in
POST /api/auth/register -> create new student acount
POST /api/auth/login
DELETE /api/auth/logout

GET /api/listings-feed
get non-deleted listings
(current user's listings are not included)

POST /api/request-portion
make reservation request

GET /api/listings/:listingId
get specific listing info

DELETE /api/listings/:listingId
delete specific listing

GET /api/reservations
reservations (pending/reserved/rejected) of current user

GET /api/my-listings
listings created by the current user

POST /api/new-listing
new listing submission

GET /api/meal-requests
meal requests sent to the current user

PATCH /api/meal-request-response
approve / reject meal request

PATCH /api/submit-reception-status
mark a listing as received / not received

PATCH /api/rate-listing
rate a received listing

### Endpoints that don't require login (they are just constant data)

GET /api/allergens -> list of known allergens

GET /api/locations -> list of predefined locations

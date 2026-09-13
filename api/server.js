import cors from "cors";
import express, { json } from "express";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import { mkdirSync } from 'fs';
import fileUpload from "express-fileupload";

const FileStore = FileStoreFactory(session);
const app = express();
const port = 3000;

import authRoutes from "./routes/auth.js";
import userProfileRoutes from "./routes/user-profile.js";
import listingsFeedRoutes from "./routes/listings-feed.js";
import listingsRoutes from "./routes/listings.js";
import requestPortionRoutes from "./routes/request-portion.js";
import myListingsRoutes from "./routes/my-listings.js";
import newListingRoutes from "./routes/new-listing.js";
import mealRequestsRoutes from "./routes/meal-requests.js";
import mealRequestResponseRoutes from "./routes/meal-request-response.js";
import submitReceptionStatusRoutes from "./routes/submit-reception-status.js";
import reservationsRoutes from "./routes/reservations.js";
import rateListingRoutes from "./routes/rate-listing.js";
import statsRoutes from "./routes/stats.js";

import allergensRoutes from "./routes/allergens.js";
import locationsRoutes from "./routes/locations.js";
import { applyRatingPenaltyContinuously } from "./utils/apply-rating-penalty.js";

// Create dir for user submitted images,
// if it doesn't exist
mkdirSync('/app/uploads/images', { recursive: true });

app.use(cors());
app.use(json());
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    abortOnLimit: true
}));

app.use(
    session({
        name: "app_session",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({ path: "./sessions" }),
        cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
        },
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/user-profile", userProfileRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/listings-feed", listingsFeedRoutes);
app.use("/api/request-portion", requestPortionRoutes);
app.use("/api/my-listings", myListingsRoutes);
app.use("/api/new-listing", newListingRoutes);
app.use("/api/meal-requests", mealRequestsRoutes);
app.use("/api/meal-request-response", mealRequestResponseRoutes);
app.use("/api/submit-reception-status", submitReceptionStatusRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/rate-listing", rateListingRoutes);
app.use("/api/stats", statsRoutes);

// constant data endpoints (no login required)
app.use("/api/allergens", allergensRoutes);
app.use("/api/locations", locationsRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    return res.status(error.statusCode ?? 500).json({
        message: error.clientMessage ?? "internalServerError"
    });
});

applyRatingPenaltyContinuously();

app.listen(port, () => {
  console.log(`UniBite erver listening on port ${port}`);
});

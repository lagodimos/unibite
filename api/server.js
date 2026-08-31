const cors = require("cors");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth");
const userProfileRoutes = require("./routes/user-profile");

app.use(cors());
app.use(express.json());

app.use(
    session({
        name: "app_session",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new FileStore(),
        cookie: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
        },
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/user-profile", userProfileRoutes);

app.listen(port, () => {
  console.log(`UniBite erver listening on port ${port}`);
});

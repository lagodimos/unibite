function requireLogin(req, res, next) {
    if (!req.session?.user_id) {
        return res.status(401).json({
            message: "userIsLoggedOut"
        });
    }

    next();
}

module.exports = requireLogin;

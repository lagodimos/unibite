const crypto = require('crypto');
const { getDbConnection } = require('../utils/db');

exports.status = async (req, res, next) => {
    res.status(200).json({
      loggedIn: !!req.session.email,
    });
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const conn = await getDbConnection();
    const results = await conn.query(
        'SELECT * FROM user WHERE email = ?',
        [email]
    );
    conn.end();

    console.log(results[0]);

    if (
        results.length === 0 ||
        results[0].email !== email ||
        results[0].password_hash !== crypto
            .createHash('sha256')
            .update(password)
            .digest('hex')
    ) {
        return res.status(401).json({
            message: "invalidEmailOrPassword",
        });
    }

    req.session.regenerate((err) => {
        if (err) {
            return next(err);
        }

        req.session.email = results[0].email;

        res.json({
            message: "loginSuccessful",
        });
    });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("app_session");

    res.json({
      message: "loggedOut",
    });
  });
};

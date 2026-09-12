import { createHash } from 'crypto';
import { pool } from "../db/pool.js";

export async function status(req, res, next) {
    res.status(200).json({
      loggedIn: !!req.session.user_id,
    });
}

export async function register(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const userResults = await pool.query(`
            INSERT INTO user (
                first_name,
                last_name,
                email,
                password_hash
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                firstName,
                lastName,
                email,
                createHash('sha256')
                    .update(password)
                    .digest('hex')
            ]
        );

        const newUserId = userResults.insertId;
        const newUserPoints = 5;

        const studentResults = await pool.query(`
            INSERT INTO student (student_id, points)
            `,
            [newUserId, newUserPoints]
        );

        res.json({
            message: "registrationSuccessful",
        });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const results = await pool.query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (
            results.length === 0 ||
            results[0].email !== email ||
            results[0].password_hash !== createHash('sha256')
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

            req.session.user_id = results[0].user_id;

            res.json({
                message: "loginSuccessful",
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("app_session");

    res.json({
      message: "loggedOut",
    });
  });
}

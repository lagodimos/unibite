import { pool } from "../db/pool.js";

export async function userProfile(req, res, next) {
    try {
        const results = await pool.query(
            'SELECT * FROM user WHERE user_id = ?',
            [req.session.user_id]
        );

        const userRoles = []

        const adminResult = await pool.query(
            "SELECT * FROM admin WHERE admin_id = ?",
            [req.session.user_id]
        );

        const studentResult = await pool.query(
            "SELECT * FROM student WHERE student_id = ?",
            [req.session.user_id]
        );

        if (adminResult.length === 1) {
            userRoles.push("admin");
        }

        if (studentResult.length === 1) {
            userRoles.push("student");
        }

        let userResult = results[0];

        // Don't send the password hash
        delete userResult.password_hash;

        return res.json({
            ...userResult,
            points: studentResult[0]?.points,
            roles: userRoles
        });
    } catch (error) {
        next(error);
    }
}

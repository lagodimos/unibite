const { getDbConnection } = require('../utils/db');

exports.userProfile = async (req, res, next) => {
    try {
        const conn = await getDbConnection();
        const results = await conn.query(
            'SELECT * FROM user WHERE user_id = ?',
            [req.session.user_id]
        );

        const userRoles = []

        const adminResult = await conn.query(
            "SELECT * FROM admin WHERE admin_id = ?",
            [req.session.user_id]
        );

        const studentResult = await conn.query(
            "SELECT * FROM student WHERE student_id = ?",
            [req.session.user_id]
        );

        conn.end();

        if (adminResult.length === 1) {
            userRoles.push("admin");
        }

        if (studentResult.length === 1) {
            userRoles.push("student");
        }

        let userResult = results[0];

        return res.json({
            email: userResult.email,
            firstName: userResult.first_name,
            lastName: userResult.last_name,
            points: studentResult?.points,
            roles: userRoles
        });

    } catch (error) {
        next(error);
    }
};

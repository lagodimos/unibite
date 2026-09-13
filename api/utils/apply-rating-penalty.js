import { pool } from "../db/pool.js";

export function applyRatingPenaltyContinuously() {
    setInterval(async () => {
        try {
            await pool.query(`
                UPDATE student s
                JOIN reserves_portion rp ON s.student_id = rp.requested_by
                JOIN food_listing fl ON rp.listing = fl.listing_id
                SET
                    s.points = s.points - 1,
                    rp.rating_penalty_applied = TRUE
                WHERE
                    rp.received = TRUE
                    AND rp.rating IS NULL
                    AND rp.rating_penalty_applied = FALSE
                    AND fl.pickup_datetime <= NOW() - INTERVAL 48 HOUR
            `);
        } catch (err) {
            console.log(err);
        }
    }, 60 * 1000);
}

/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/seat.service.js");

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
    getByShowtime: async (req, res, next) => {
        const { showtimeId } = req.params

        try {

            const result = await service.getByShowtime(showtimeId);
            return res.status(200).send(result);

        } catch (error) {
            next(error);
        }

    },

};

/* ========== */

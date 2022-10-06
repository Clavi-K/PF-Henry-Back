/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/reservation.service")

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newReservation = req.body

        try {

            const result = await service.post(newReservation)
            return res.status(201).send(result)
        } catch (e) {
            next(e)
        }

    },

    getByUser: async (req, res, next) => {

        try {
            const userId = req.user._id.toString()
            const reservations = await service.getByUser(userId)

            return res.status(200).send(reservations)
        } catch (e) {
            next(e)
        }

    }

}

/* ========== */
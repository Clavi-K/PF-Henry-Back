/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/reservation.service")

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const { uid } = req.user

        const newReservation = req.body
        newReservation.userId = uid

        try {

            const result = await service.post(newReservation)
            return res.status(201).send(result)
        } catch (e) {
            next(e)
        }

    },

    getByUser: async (req, res, next) => {
        const { uid } = req.user

        try {
            const reservations = await service.getByUser(uid)

            return res.status(200).send(reservations)
        } catch (e) {
            next(e)
        }

    },

    confirmByUser: async (req, res, next) => {
        
        try {
            const user = req.user
            const { uid } = user

            await service.confirmByUser(uid)
            return res.status(200).send("Reservations confirmed successfully!")

        } catch (e) {
            next(e)
        }

    },

    setUserSeats: async (req, res, next) => {
        const { reservationId, seatLocations } = req.body

        try {

            await service.setUserSeats(reservationId, seatLocations)
            return res.status(200).send("Seats are now reserved!")

        } catch (e) {
            next(e)
        }

    },

    cancelById: async (req, res, next) => {
        const { reservationId } = req.body

        try {

            await service.cancelById(reservationId)
            return res.status(200).send("The reservation is now cancelled!")

        } catch (e) {
            next(e)
        }

    }

}

/* ========== */
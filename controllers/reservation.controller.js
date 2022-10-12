/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/reservation.service")

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
    
    post: async (req, res, next) => {
        const {uid} = req.user

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
        const { uid } = req.user

        try {

            await service.confirmByUser(uid)
            return res.status(200).send("Reservations confirmed successfully!")

        } catch (e) {
            next(e)
        }

    },

    setSeats: async (req, res, next) => {
        const { reservationId, seatIds } = req.body

        try {

            await service.setSeats(reservationId, seatIds)
            return res.status(200).send("Seats are now reserved!")

        } catch(e){
            next(e)
        }

    }

}

/* ========== */
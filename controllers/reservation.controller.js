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
        const { showtimeId, seatLocations } = req.body
        const { uid } = req.user

        try {

            const newReservation = await service.setUserSeats(uid, showtimeId, seatLocations)
            return res.status(200).send(newReservation)

        } catch (e) {
            next(e)
        }

    },

    cancelById: async (req, res, next) => {
        const { reservationId } = req.body
        const { uid } = req.user

        try {

            await service.cancelById(uid, reservationId)
            return res.status(200).send("The reservation is now cancelled!")

        } catch (e) {
            next(e)
        }

    },

    getPayedByUser: async (req, res, next) => {

        try {
            const { uid } = req.user

            const reservations = await service.getPayedByUser(uid)
            return res.status(200).send(reservations)
        } catch (e) {
            next(e)
        }

    },

    getByShowtime: async (req, res, next) => {

        try {
            const { showtimeId } = req.params

            const reservations = await service.getByShowtime(showtimeId)
            return res.status(200).send(reservations)
        } catch (e) {
            next(e)
        }

    },

    deleteByUser: async (req, res, next) => {

        try {

            const { uid } = req.user
            await service.deleteByUser(uid)
            return res.status(200).send("Deleted by user successfully!")

        } catch (e) {
            next(e)
        }

    },

    getAll: async (req, res, next) => {

        try {

            const reservations = await service.getAll()
            console.log(reservations)
            return res.status(200).send(reservations)

        } catch(e) {
            next(e)
        }

    }

}

/* ========== */
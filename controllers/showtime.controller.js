/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/showtime.service.js')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newShowtime = req.body

        try {

            const result = await service.post(newShowtime)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }
    },

    getAll: async (req, res, next) => {

        try {
            const showtimes = await service.getAll()
            return res.status(200).send(showtimes)
        } catch (e) {
            next(e)
        }

    },

    update: async (req, res, next) => {
        const updatedShowtime = req.body

        try {
            const result = await service.update(updatedShowtime)
            return res.status(201).send(result)
        } catch (e) {
            next(e)
        }
    },

    getByMovie: async (req, res, next) => {
        let { movieId } = req.params
        movieId = Number(movieId)

        try {

            const result = await service.getByMovie(movieId)
            return res.status(200).send(result)
        } catch (e) {
            next(e)
        }

    },

    getById: async (req, res, next) => {
        const { showtimeId } = req.params

        try {

            const result = await service.getById(showtimeId)
            return res.status(200).send(result)

        } catch (e) {
            next(e)
        }
    },

    endById: async (req, res, next) => {
        const { showtimeId } = req.params

        try {

            const result = await service.endById(showtimeId)
            return res.status(202).send("Showtime ended successfully")
        } catch (e) {
            next(e)
        }

    }
}

/* ========== */
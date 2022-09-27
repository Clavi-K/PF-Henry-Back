
const service = require('../services/api.service.js')

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    getAllPopular: async (req, res, next) => {

        try {
            const movies = await service.getAllPopular()
            res.status(200).send(movies)
        } catch (e) {
            next(e)
        }

    },

    getMovie: async (req, res, next) => {

        const {movieId} = req.params

        try {
            const movie = await service.getMovie(movieId)
            res.status(200).send(movie)
        } catch (e) {
            next(e)
        }

    }

}

/* ========== */
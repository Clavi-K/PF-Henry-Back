
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

        const { movieId } = req.params

        try {
            const movie = await service.getMovie(movieId)
            res.status(200).send(movie)
        } catch (e) {
            next(e)
        }

    },

    getAllGenres: async (req, res, next) => {

        try {
            const genres = await service.getAllGenres()
            res.status(200).send(genres)
        } catch (e) {

            next(e)
        }

    },

    getUpcoming: async (req, res, next) => {


        try {
            const results = await service.getUpcoming()
            res.status(200).send(results)
        } catch (e) {
            next(e)
        }

    }

}

/* ========== */
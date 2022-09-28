/* ===== REQUIRED IMPORTS ===== */

const axios = require('axios')
const config = require('../config')
const logger = require('../utils/logger')

/* ========== */


/* ===== EXPORT SERVICE ===== */

module.exports = {

    getAllPopular: async () => {

        try {

            let movies = []

            for (let i = 1; i < 21; i++) {

                const response = await axios.get(`${config.moviesApi.MOVIESPOPULARURL}&page=${i}`)

                const formattedMovies = response.data.results.map(m => {
                    return movieParser(m)
                })

                movies = [...movies, ...formattedMovies]

            }

            return movies

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getMovie: async (movieId) => {

        const axiosURL = config.moviesApi.GETMOVIE.replace("${movieId}", movieId)

        try {
            const movie = await axios.get(axiosURL)
            return movie.data
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAllGenres: async () => {

        try {
            const response = await axios.get(config.moviesApi.GENRESURL)
            return response.data.genres
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getUpcoming: async () => {

        try {
            const response = await axios.get(config.moviesApi.GETUPCOMINGURL)
            const formattedMovies = response.data.results.map(m => {
                return movieParser(m)
            })
            return formattedMovies
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function movieParser(m) {

    return {
        _id: m.id,
        title: m.title,
        summary: m.overview,
        rating: m.vote_average,
        vote_count: m.vote_count,
        duration: m.runtime,
        release_date: m.release_date,
        image: m.poster_path,
        onCinema: false,
        deleted: false,
        genres: m.genre_ids
    }
}

/* ========== */
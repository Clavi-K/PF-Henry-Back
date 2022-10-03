/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/function.model.js")
const apiService = require("../services/api.service.js")
const logger = require("../utils/logger.js")


/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.movieId || isNaN(Number(obj.movieId))) {
            throw new Error("Missing or invalid movie ID")
        }

        const movieTest = await apiService.getMovie(obj.movieId)
        if (!movieTest.title) {
            throw new Error("Missing or invalid movie ID")
        }

        obj.movieTitle = movieTest.title
        obj.image = movieTest.poster_path

        if (!obj.roomId || typeof obj.roomId !== "string") {
            throw new Error("Missing or invalid room ID")
        }
        
        if (!obj.format || typeof obj.format !== "string" || obj.format.trim(" ").length === 0) {
            throw new Error("Missing or invalid format")
        }

        if (!isValidDate(obj.dateTime)) {
            throw new Error("Missing or invalid function date-time")
        }

        try {
            return await model.save(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAll: async () => {

        try {
            return await model.getAll()
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    update: async (obj) => {

        if (!obj._id || typeof obj._id !== "string") {
            throw new Error("Missing function ID")
        }

        if (!obj.movieId || isNaN(Number(obj.movieId))) {
            throw new Error("Missing or invalid movie ID")
        }

        const movieTest = await apiService.getMovie(obj.movieId)
        if (!movieTest.title) {
            throw new Error("Missing or invalid movie ID")
        }

        obj.movieTitle = movieTest.title
        obj.image = movieTest.poster_path

        if (!obj.roomId || typeof obj.roomId !== "string") {
            throw new Error("Missing room ID")
        }

        if (!obj.format || typeof obj.format !== "string" || obj.format.trim(" ").length === 0) {
            throw new Error("Missing or invalid format")
        }

        if (!isValidDate(obj.dateTime)) {
            throw new Error("Invalid function date")
        }

        try {
            return await model.update(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function isValidDate(date) {
    const testDate = new Date(date)
    if (testDate < Date.now()) return false
    return testDate && Object.prototype.toString.call(testDate) === "[object Date]" && !isNaN(testDate);
}

/* ========== */
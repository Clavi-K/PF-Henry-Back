/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/showtime.model.js")
const apiService = require("./api.service.js")
const roomModel = require("../models/room.model")
const seatService = require("../services/seat.service")
const logger = require("../utils/logger.js")


/* ========== */

/* ===== EXPORT SERVICE ===== */

const showtimeService = {
    
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

        if(!obj.ticketPrice || isNaN(Number(obj.ticketPrice)) || obj.ticketPrice < 1) {
            throw new Error("Missing or invalid showtime ticket price")
        }

        if (!isValidDate(obj.dateTime)) {
            throw new Error("Missing or invalid showtime date-time")
        }

        try {

            const room = await roomModel.getById(obj.roomId)
            if (!room) {
                throw new Error("Invaid room ID")
            }


            const showtimes = await getByRoomId(obj.roomId)
            if (showtimes.length > 0) {
                throw new Error("There is already a showtime for that room")
            }

            const newShowtime = await model.save(obj)
            await seatService.bulkPost(newShowtime)

            return newShowtime

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
            throw new Error("Missing showtime ID")
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
            throw new Error("Invalid showtime date")
        }

        try {
            return await model.update(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getByMovie: async (movieId) => {

        if (!movieId || isNaN(Number(movieId))) {
            throw new Error("Missing or invalid movie ID!")
        }

        const movie = await apiService.getMovie(movieId)
        if (!movie.title) {
            throw new Error("Invalid movie ID!")
        }

        try {

            const result = await model.getByMovie(movieId)
            return result

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async (showtimeId) => {

        if (!showtimeId || typeof showtimeId !== "string") {
            throw new Error("Invalid showtime ID!")
        }

        try {

            const showtime = await model.getById(showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            return showtime

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    endById: async(showtimeId) => {

        if (!showtimeId || typeof showtimeId !== "string") {
            throw new Error("Invalid showtime ID!")
        }

        try{
            
            const showtime = await model.getById(showtimeId)
            if(!showtime) {
                throw new Error("Invalid showtime ID")
            }

            await model.loigcDelete(showtimeId)
            await seatService.hardDeleteByShowtime(showtimeId)

        } catch(e) {

        }

    }

}

module.exports = showtimeService

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function isValidDate(date) {
    const testDate = new Date(date)
    if (testDate < Date.now()) return false
    return testDate && Object.prototype.toString.call(testDate) === "[object Date]" && !isNaN(testDate);
}

async function getByRoomId(roomId) {

    if (!roomId || typeof roomId !== "string") {
        throw new Error("Missing or invalid room ID")
    }

    try {

        const room = await roomModel.getById(roomId)
        if (!room) {
            throw new Error("Invalid rooms ID")
        }

        return await model.getByRoomId(roomId)

    } catch (e) {
        logger.error(e)
        throw new Error(e)
    }

}

/* ========== */
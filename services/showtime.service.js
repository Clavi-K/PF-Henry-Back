/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/showtime.model.js")
const apiService = require("./api.service.js")
const reservationModel = require("../models/reservation.model")
const roomModel = require("../models/room.model")
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

        if (!obj.ticketPrice || isNaN(Number(obj.ticketPrice)) || obj.ticketPrice < 1) {
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

            if (showtimes.length) {
                const lastDate = getLastDate(showtimes)
                if (!oneDayGap(lastDate, new Date(obj.dateTime))) {
                    throw new Error("The new showtime must be at least 24 hours later than the last showtime!")
                }
            }

            obj.seats = createSeats(room.rows, room.columns)
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

    endById: async (showtimeId) => {

        if (!showtimeId || typeof showtimeId !== "string") {
            throw new Error("Invalid showtime ID!")
        }

        try {

            const showtime = await model.getById(showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            const reservations = await reservationModel.getByShowtimeId(showtimeId)
            if (reservations.length) {
                throw new Error("You can't delete a showtime that has active reservations!")
            }

            await reservationModel.deleteByShowtimeId(showtimeId)
            await model.loigcDelete(showtimeId)

        } catch (e) {
            logger.log(e)
            throw new Error(e)
        }

    },

    setUserSeats: async (showtimeId, userId, seatLocations) => {

        if (!showtimeId || typeof showtimeId !== "string" || showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid showtime ID")
        }

        if (!seatLocations || !Array.isArray(seatLocations) || !seatLocations) {
            throw new Error("Missing or invalid seats!")
        }

        try {

            const showtime = await model.getById(showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            const showtimeSeats = [...showtime.seats]

            for (const location of seatLocations) {
                const row = location[0].charCodeAt() - 65
                const column = Number(location.slice(1)) - 1

                if (showtimeSeats[row][column].userId === undefined) {
                    showtimeSeats[row][column].userId = userId
                } else {
                    throw new Error("One seat is already taken!")
                }

            }

            return await model.setUserSeats(showtimeId, showtimeSeats)


        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    cancelSeatsById: async (showtimeId, seatLocations) => {

        if (!showtimeId || typeof showtimeId !== "string" || showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid showtime ID")
        }

        if (!seatLocations || !Array.isArray(seatLocations) || !seatLocations) {
            throw new Error("Missing or invalid seats!")
        }

        try {

            const showtime = await model.getById(showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            const showtimeSeats = [...showtime.seats]

            for (const location of seatLocations) {
                const row = location[0].charCodeAt() - 65
                const column = Number(location.slice(1)) - 1

                showtimeSeats[row][column].userId = undefined
            }

            return await model.setUserSeats(showtimeId, showtimeSeats)

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

function customLetterArray(index) {

    const alpha = Array.from(Array(index)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    return alphabet
}

function createSeats(rows, columns) {
    const alphabetArr = customLetterArray(rows)
    const result = []

    for (let i = 0; i < rows; i++) {

        const row = []

        for (let j = 1; j <= columns; j++) {

            row.push({
                location: `${alphabetArr[i]}${j}`,
                userId: undefined
            })

        }

        result.push(row)

    }

    return result

}

function oneDayGap(lastDateInput, newDateInput) {

    const lastDate = new Date(lastDateInput)
    const newDate = new Date(newDateInput)

    const dayInterval = (lastDate.getTime() - newDate.getTime()) / (1000 * 60 * 60)

    return (dayInterval <= -24)

}

function getLastDate(showtimes) {

    let lastDate = new Date(showtimes[0].dateTime)

    for (const showtime of showtimes) {

        if (lastDate < new Date(showtime.dateTime)) {
            lastDate = new Date(showtime.dateTime)
        }

    }

    return lastDate

}

/* ========== */
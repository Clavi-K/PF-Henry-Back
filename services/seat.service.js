/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/seat.model")
const showtimeService = require("../services/showtime.service")
const roomService = require("../services/room.service")
const logger = require("../utils/logger")

/* ========== */

/* ===== SERVICE EXPORT ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.location || typeof obj.location !== "string" || obj.location.trim(" ").length === 0 || !containsLettersAndNumbers(obj.location)) {
            throw new Error("Missing or invalid seat location!")
        }

        if (!obj.showtimeId || typeof obj.showtimeId !== "string" || obj.showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid seat showtime!")
        }

        try {

            const showtime = await showtimeService.getById(obj.showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            return await model.save(obj)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    bulkPost: async (showtime) => {

        if (!showtime) {
            throw new Error("Missing or invalid seats showtime!")
        }

        try {

            const room = await roomService.getById(showtime.roomId)
            if (!room) {
                throw new Error("Missing or invalid showtime room!")
            }

            console.log(room)

            const rowsArr = customLetterArray(room.rows)
            const seats = []

            for (let i = 0; i < room.rows; i++) {

                const row = []

                for (let j = 0; j < room.columns; j++) {

                    row.push({
                        location: `${rowsArr[i]}${j}`,
                        showtimeId: `${showtime._id.toString()}`,
                        userId: "",

                    })

                }

                seats.push(row)

            }

            return await model.bulkSave(seats)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    hardDeleteByShowtime: async (showtimeId) => {

        if (!showtimeId || typeof showtimeId !== "string") {
            throw new Error("Missing or not valid showtime ID")
        }

        try {

            const response = await model.hardDelete(showtimeId)
            console.log(response)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async (seatId) => {

        if (!seatId || typeof seatId !== "string") {
            throw new Error("Missing or invalid seat ID")
        }

        try {

            const seat = await model.getById(seatId)
            if(!seat) {
                throw new Error("Seat ID not valid")
            }

            return seat

        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function containsLettersAndNumbers(str) {
    return /\d/.test(str) && /[a-zA-Z]/.test(str)
}

function customLetterArray(index) {

    const alpha = Array.from(Array(index)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    return alphabet
}

/* ========== */
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

    bulkPost: async (room) => {

        // if (!showtime) {
        //     throw new Error("Missing or invalid seats showtime!")
        // }

        try {

            // const room = roomService.getById(showtime.roomId)
            // if (!room) {
            //     throw new Error("Missing or invalid showtime room!")
            // }

            console.log(room)

            const rowsArr = customLetterArray(room.rows)
            const seats = []

            for (let i = 0; i < room.rows; i++) {

                const row = []

                for (let j = 0; j < room.columns; j++) {

                    row.push({
                        location: `${rowsArr[i]}${j}`,
                        showtimeId: "showtimeIdPlaceholder",
                        userId: "",

                    })

                }

                seats.push(row)

            }

            console.log(seats)

        } catch (e) {
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
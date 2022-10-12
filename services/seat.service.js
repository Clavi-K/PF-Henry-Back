/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/seat.model")
const showtimeModel = require("../models/showtime.model")
const roomModel = require("../models/room.model")
const logger = require("../utils/logger")

/* ========== */

/* ===== SERVICE DEFINITION ===== */
const seat_Service = {

    post: async (obj) => {

        if (!obj.location || typeof obj.location !== "string" || obj.location.trim(" ").length === 0 || !containsLettersAndNumbers(obj.location)) {
            throw new Error("Missing or invalid seat location!")
        }

        if (!obj.showtimeId || typeof obj.showtimeId !== "string" || obj.showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid seat showtime!")
        }

        try {

            const showtime = await showtimeModel.getById(obj.showtimeId)
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

            const room = await roomModel.getById(showtime.roomId)
            if (!room) {
                throw new Error("Missing or invalid showtime room!")
            }

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

            const newSeats = await model.bulkSave(seats)
            const showtimeSeats = []

            for (const row of newSeats) {

                const showtimeRow = []

                for (const seat of row) {

                    showtimeRow.push(seat._id.toString())

                }

                showtimeSeats.push(showtimeRow)

            }

            await showtimeModel.update({ _id: showtime._id, seats: showtimeSeats })

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
            if (!seat) {
                throw new Error("Seat ID not valid")
            }

            return seat

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getByShowtime: async (showtimeId) => {

        if (!showtimeId || typeof showtimeId !== "string" || showtimeId.trim(" ").length === 0) {
            throw new Error("Missing or invalid showtime ID!")
        }

        try {

            const showtime = await showtimeModel.getById(showtimeId)
            if (!showtime) {
                throw new Error("Invalid showtime ID")
            }

            if (showtime.deleted) {
                throw new Error("That showtime is no longer active!")
            }

            return await getFormattedSeats(showtime.seats)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */

/* ===== SERVICE EXPORT ===== */

module.exports = seat_Service

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


async function getFormattedSeats(showtimeSeats) {
    let formattedSeats = []


    for (const showtimeRow of showtimeSeats) {

        const formattedRow = []

        for (const seat of showtimeRow) {
            //formattedRow.push(seat_Service.getById(seat))
            formattedSeats.push(seat_Service.getById(seat))
        }

        //formattedSeats.push(await Promise.all(formattedRow))
    }

    const result = await Promise.all(formattedSeats)

    // return formattedSeats
    return result

}

/* ========== */
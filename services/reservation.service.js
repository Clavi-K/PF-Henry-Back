/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/reservation.model.js");
const userService = require("./user.service")
const showtimeService = require("../models/showtime.model")
const seatModel = require("../models/seat.model")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.userId || typeof obj.userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        if (!obj.showtimeId || typeof obj.showtimeId !== "string") {
            throw new Error("Missing or invalid showtime ID")
        }

        if (!obj.seatId || typeof obj.seatId !== "string") {
            throw new Error("Missing or invalid seat ID")
        }

        if (!obj.type || typeof obj.type !== "string") {
            throw new Error("Missing or invalid reservation format")
        }

        if (!obj.price || isNaN(Number(obj.price)) || Number(obj.price) < 0) {
            throw new Error("Missing or invalid reservation price")
        }


        try {
            const user = await userService.getById(obj.userId)
            if (!user) {
                throw new Error("No user with that ID!")
            }

            const showtime = await showtimeService.getById(obj.showtimeId)
            if (!showtime) {
                throw new Error("No showtime with that ID!")
            }

            const seat = await seatModel.getById(obj.seatId)
            if (!seat) {
                throw new Error("No seat with that ID!")
            }

            obj.seatLocation = seat.location

            if (obj.showtimeId !== seat.showtimeId) {
                throw new Error("That seat does not belong to that function!")
            }

            if (seat.userId) {
                throw new Error("That seat is already taken!")
            }

            await seatModel.setUserId(obj.seatId, obj.userId)
            return await model.save(obj)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getByUser: async (userId) => {

        if (!userId || typeof userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        try {

            const user = userService.getById(userId)
            if (!user) {
                throw new Error("No user with that ID !")
            }

            return await model.getByUser(userId)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    

}

/* ========== */
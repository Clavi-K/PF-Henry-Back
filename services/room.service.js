/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/room.model")
const logger = require("../utils/logger")
const showtimeModel = require("../models/showtime.model")

/* ========== */

/* ===== SERVICE EXPORT ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.number || !Number(obj.number)) {
            throw new Error("Missing or invalid room number")
        }

        if (!obj.rows || !Number(obj.rows)) {
            throw new Error("Missing or invalid room rows number")
        }

        if (Number(obj.rows) > 7) {
            throw new Error("Room rows cant be more than 7")
        }

        if (!obj.columns || !Number(obj.columns)) {
            throw new Error("Missing or invalid room columns number")
        }

        if (Number(obj.columns) > 15) {
            throw new Error("Room columns cant be more thanb 15!")
        }

        try {

            const rooms = await model.getAll()

            for (const room of rooms) {
                if (room.number === obj.number) throw new Error("There is already a room with that number!")
            }

            return await model.save(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async (id) => {

        if (!id || typeof id !== "string") {
            throw new Error("Missing or invalid room ID")
        }

        try {
            return await model.getById(id)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAll: async () => {

        try {
            return await model.getAll()
        } catch (e) {
            throw new Error(e)
        }

    },

    deleteById: async (roomId) => {

        if (!roomId || typeof roomId !== "string" || roomId.trim(" ").length === 0) {
            throw new Error("Missing or invalid room ID")
        }

        try {

            const room = await model.getById(roomId)
            if (!room) {
                throw new Error("Invalid room ID")
            }

            if (room.deleted) {
                throw new Error("This room is already deleted!")
            }

            const showtimes = await showtimeModel.getByRoomId(roomId)
            if (showtimes.length) {
                throw new Error("You can't delete a room if it has showtimes associated")
            }

            await model.logicDelete(roomId)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */


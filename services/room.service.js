/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/room.model")
const logger = require("../utils/logger")

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

        if (Number(obj.rows) > 24) {
            throw new Error("Room rows cant be more than 26")
        }

        if (!obj.columns || !Number(obj.columns)) {
            throw new Error("Missing or invalid room columns number")
        }

        try {

            const rooms = await model.getAll()

            for(const room of rooms ) {
                if(room.number === obj.number) throw new Error("There is already a room with that number!")
            }

            return await model.save(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async(id) => {

        if(!id || typeof id !== "string") {
            throw new Error("Missing or invalid room ID")
        }

        try {
            return await model.getById(id)
        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAll: async() => {

        try {
            return await model.getAll()
        } catch(e) {
            throw new Error(e)
        }

    }

}

/* ========== */


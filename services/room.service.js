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

        if (Number(obj.rows) > 26) {
            throw new Error("Room rows cant be more than 26")
        }

        if (!obj.columns || !Number(obj.columns)) {
            throw new Error("Missing or invalid room columns number")
        }

        try {
            console.log(obj)
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

    }

}

/* ========== */


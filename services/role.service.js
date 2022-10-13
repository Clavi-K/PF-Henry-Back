/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/role.model")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    save: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        try {

            return await model.save({ userId })

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        try {

            return await model.getById(userId)

        } catch (e) {
            logger.error(e)
        }

    }

}

/* ========== */
/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/email.model")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    save: async (email) => {
        if (!email || typeof email !== "string" || email.trim(" ").length === 0 || !email.includes("@")) throw new Error("Missing or invalid email")

        try {
            console.log(email)
            console.log(await model.save({ email }))
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    exists: async (email) => {
        if (!email || typeof email !== "string" || email.trim(" ").length === 0 || !email.includes("@")) throw new Error("Missing or invalid email")

        try {
            return (await model.getByEmail(email) !== null)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */
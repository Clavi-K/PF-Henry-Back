/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/user.model.js");
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    post: async (obj) => {

        if (!obj.email || typeof obj.email !== "string") {
            throw new Error("Missing or invalid email!")
        }

        if (await model.existsByEmail(obj.email)) {
            throw new Error("User already exists")
        }

        if (obj.password !== obj.password2) {
            throw new Error("Passwords don't match!")
        }

        if (!obj.firstname || typeof obj.firstname !== "string" || obj.firstname.trim(" ").length === 0) {
            return done(null, false, { message: "First name not valid!" })
        }

        if (!obj.lastname || typeof obj.lastname !== "string" || obj.lastname.trim(" ").length === 0) {
            return done(null, false, { message: "Last name not valid!" })
        }

        if (!obj.username || typeof obj.username !== "string" || obj.username.trim(" ").length === 0) {
            return done(null, false, { message: "User name not valid!" })
        }

        try {
            await model.save(obj)
        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */
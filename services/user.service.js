/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/user.model.js");
const reservationService = require("../services/reservation.service")

const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    post: async (obj, reservations) => {

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
            throw new Error("First name not valid!")
        }

        if (!obj.lastname || typeof obj.lastname !== "string" || obj.lastname.trim(" ").length === 0) {
            throw new Error("Last name not valid!")
        }

        if (!obj.username || typeof obj.username !== "string" || obj.username.trim(" ").length === 0) {
            throw new Error("Username not valid!")
        }

        try {
            obj.reservations = []
            const result = await model.save(obj)

            if (reservations.length) {

                reservations = reservations.map(r => {
                    reservationService.post({ ...r, userId: result._id.toString() })
                })

            }

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getById: async (userId) => {

        if (!userId || typeof userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        try {

            if (!user) {
                throw new Error("Invalid user!")
            }

            return user

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */
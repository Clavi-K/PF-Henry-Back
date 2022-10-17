/* ===== REQUIRED IMPORTS ===== */

const emailService = require("./email.service")
const mailSender = require("../notifications/mail.sender")
const templates = require("../notifications/mail.templates.js")
const roleModel = require("../models/role.model")

const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    emailRegister: async (currentUser) => {
        if (!currentUser || typeof currentUser !== "object") {
            throw new Error("Missing or invalid user")
        }

        try {
            const emailExists = await emailService.exists(currentUser.email)
            if (!emailExists) {
                await emailService.save(currentUser.email)
                await mailSender.send(currentUser.email, "Account creation", templates.register(currentUser.name || ""))
            }

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getRole: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0){
            throw new Error("Missing or invalid user ID")
        }

        try {

            const role = await roleModel.getById(userId)
            return role
        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */
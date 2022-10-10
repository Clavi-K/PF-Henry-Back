/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/user.model.js");
const reservationService = require("./reservation.service")
const mailSender = require("../notifications/mail.sender")
const templates = require("../notifications/mail.templates.js")

const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {
    
    post: async (obj, reservations) => {
        
        if (!obj.uid || typeof obj.uid !== "string" || obj.uid.trim(" ").length === 0) {
            throw new Error("Missing or invalid user UID")
        }
        
        if (!obj.email || typeof obj.email !== "string") {
            throw new Error("Missing or invalid email!")
        }
        
        if (await model.existsByEmail(obj.email)) {
            throw new Error("User already exists")
        }
        
        if (await model.existsByUid(obj.uid)) {
            throw new Error("User alreday exists")
        }
        
        if (!obj.displayName || typeof obj.displayName !== "string" || obj.displayName.trim(" ").length === 0) {
            throw new Error("Missing or invalid display name")
        }
        
        try {
            const response = await model.save(obj)
            await mailSender.send(response.email, "Account creation", templates.register(response.displayName))
            
            if (Array.isArray(reservations) && reservations.length) {
                for (const reserv of reservations) await reservationService.post(reserv)
            }
            
            return response
            
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

            const user = await model.getById(userId)

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
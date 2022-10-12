/* ===== REQUIRED IMPORTS ===== */

const userService = require("../services/user.service")
const logger = require('../utils/logger')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    emailSend: async (req, res, next) => {
        const currentUser = req.user

        try {
            await userService.emailRegister(currentUser)
        } catch (e) {
            logger.error(e)
            next(e)
        }

    }

}

/* ========== */
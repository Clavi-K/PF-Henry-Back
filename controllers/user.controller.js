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

    },

    getRole: async (req, res, next) => {

        try {

            const { uid } = req.user
            const result = await userService.getRole(uid)

            return res.status(200).send(result || "This user does not have admin role")
        } catch(e) {
            next(e)
        }

    }

}

/* ========== */
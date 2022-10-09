/* ===== REQUIRED IMPORTS ===== */

const config = require('../config')
const userService = require("../services/user.service")
const logger = require('../utils/logger')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    register: async (req, res, next) => {

        const { user, reservations } = req.body

        try {
            const response = await userService.post(user, reservations)
            return res.status(201).send(response)
        } catch (e) {
            logger.error(e)
            next(e)
        }

    },

    getById: async (req, res, next) => {

        const { userId } = req.params

        try {
            const response = await userService.getById(userId)
            return res.status(200).send(response)
        } catch (e) {
            logger.error(e)
            next(e)
        }

    }

}

/* ========== */
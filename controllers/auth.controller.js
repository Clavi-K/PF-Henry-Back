/* ===== REQUIRED IMPORTS ===== */

const config = require('../config')
const userService = require("../services/user.service")
const logger = require('../utils/logger')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    register: async (req, res, next) => {

        const user = req.body

        try {
            const response = await userService.post(user)
            return res.status(201).send(response)
        } catch (e) {
            logger.error(e)
            next(e)
        }

    },

    success: async (req, res, next) => {
        try {
            if (req.user) {
                return res.status(200).send(req.user)
            } else {
                return res.status(403).send({ message: "There's not an available sesion" })
            }
        } catch (e) {
            logger.error(e)
            next(e)
        }
    }

}

/* ========== */
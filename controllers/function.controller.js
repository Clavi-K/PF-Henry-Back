/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/function.service.js')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newFunction = req.body

        try {

            const result = await service.post(newFunction)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }
    },

    getAll: async (req, res, next) => {

        try {

            const functions = await service.getAll()
            return res.status(200).send(functions)

        } catch (e) {
            next(e)
        }

    },

    update: async (req, res, next) => {
        const updatedFunction = req.body

        try {

            const result = await service.update(updatedFunction)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }
    },
}

/* ========== */
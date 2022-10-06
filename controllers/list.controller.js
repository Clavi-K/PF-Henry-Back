/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/list.service.js");

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newList = req.body

        try {
            const result = await service.post(newList)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }

    }

}

/* ========== */
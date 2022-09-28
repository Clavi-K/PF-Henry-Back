/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/db.service')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
  postFunction: async (req, res, next) => {
    const newFunction = req.body

    try {

      const result = await service.postFunction(newFunction)
      return res.status(201).send(result)

    } catch (e) {
      next(e)
    }
  }

}

/* ========== */
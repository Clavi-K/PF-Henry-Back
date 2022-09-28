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
  },

  getAllFunctions: async (req, res, next) => {

    try {

      const functions = await service.getAllFunctions()
      return res.status(200).send(functions)

    } catch(e) {
      next(e)
    }

  }
}

/* ========== */
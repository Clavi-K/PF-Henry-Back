const express = require("express");
const logger = require("../utils/logger")

//Se importan todas las rutas
const ApiRouter = require("./api.router.js")
const functionRouter = require("./function.router.js")
const reviewRouter =  require("./review.router.js")

const router = express.Router();


//Se definen las rutas base 
router.use('/api', ApiRouter)// ejemplo:http://localhost:8082/api/popular
router.use('/function', functionRouter)
router.use ('/review', reviewRouter)


//Por si se ingresa una ruta no definida previamente
router.use("*/*", (req, res, next) => {
  logger.warn(`${req.protocol + '://' + req.get('host') + req.originalUrl} Not found`)

  try {
    res.status(404).send(`This page doesn't exists`);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
const express = require("express");
const logger = require("../utils/logger")

//Se importan todas las rutas
const ApiRouter = require("./api.router.js")
<<<<<<< HEAD
const functionRouter = require("./function.router.js")
const reviewRouter =  require("./review.router.js")
const autrhRouter = require("./auth.router.js")
const paymentRouter = require ("./payment.router.js")
=======
const showtimeRouter = require("./showtime.router.js")
const reviewRouter = require("./review.router.js")
const roomRouter = require("./room.router")
const reservationRouter = require("./reservation.router")
const authRouter = require("./auth.router")
>>>>>>> 7e6af1ce174412dddf0ba06123a5ee7c0a7a640c

const router = express.Router();

//Se definen las rutas base 
router.use("/auth", authRouter)
router.use('/api', ApiRouter)// ejemplo:http://localhost:8082/api/popular
<<<<<<< HEAD
router.use('/function', functionRouter)
router.use ('/review', reviewRouter)
router.use('/auth', autrhRouter)
router.use('/payment', paymentRouter)
=======
router.use('/showtime', showtimeRouter)
router.use('/review', reviewRouter)
router.use('/room', roomRouter)
router.use('/reservation', reservationRouter)
>>>>>>> 7e6af1ce174412dddf0ba06123a5ee7c0a7a640c

const userModel = require("../models/user.model")

router.post("/test", async (req, res) => {
  console.log(await userModel.getById("633cb93893ae09e5243ac4ca"))
  res.send(await userModel.getById("633cb93893ae09e5243ac4ca"))
})

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
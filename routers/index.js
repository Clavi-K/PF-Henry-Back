const express = require("express");
const logger = require("../utils/logger");

//Se importan todas las rutas
const ApiRouter = require("./api.router.js");
const showtimeRouter = require("./showtime.router.js");
const reviewRouter = require("./review.router.js");
const roomRouter = require("./room.router");
const reservationRouter = require("./reservation.router");
const authRouter = require("./auth.router");
const paymentRouter = require("./payment.router");
const listRouter = require("./list.router")

const router = express.Router();

//Se definen las rutas base
router.use("/auth", authRouter);
router.use("/api", ApiRouter); // ejemplo:http://localhost:8082/api/popular
router.use("/showtime", showtimeRouter);
router.use("/review", reviewRouter);
router.use("/room", roomRouter);
router.use("/reservation", reservationRouter);
router.use("/payment", paymentRouter);
router.use("/list", listRouter)

const userService = require("../services/user.service")

router.get("/test", async (req, res, next) => {

  try {
    console.log(await userService.getById("633f41f593ae09e524360970"))
  } catch (e) {
    next(e)
  }

})

//Por si se ingresa una ruta no definida previamente
router.use("*/*", (req, res, next) => {
  logger.warn(
    `${req.protocol + "://" + req.get("host") + req.originalUrl} Not found`
  );

  try {
    res.status(404).send(`This page doesn't exists`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const logger = require("../utils/logger");

//Se importan todas las rutas
const ApiRouter = require("./api.router.js");
const showtimeRouter = require("./showtime.router.js");
const reviewRouter = require("./review.router.js");
const roomRouter = require("./room.router");
const reservationRouter = require("./reservation.router");
const userRouter = require("./user.router");
const paymentRouter = require("./payment.router");
const listRouter = require("./list.router");

const router = express.Router();

//Se definen las rutas base
router.use("/user", userRouter);
router.use("/api", ApiRouter); // ejemplo:http://localhost:8082/api/popular
router.use("/showtime", showtimeRouter);
router.use("/review", reviewRouter);
router.use("/room", roomRouter);
router.use("/reservation", reservationRouter);
router.use("/payment", paymentRouter);
router.use("/list", listRouter);

const seatModel = require("../models/seat.model");

router.get("/test", async (req, res, next) => {
  seatModel.hardDelete("6340d0f04bc2dc2a36c4160d");
  res.send("ok");
});

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

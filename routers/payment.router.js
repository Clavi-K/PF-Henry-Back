const express = require("express");
const router = express.Router();
const axios = require("axios");
const reservationService = require("../services/reservation.service");
const showtimeService = require("../services/showtime.service");
const mailSender = require("../notifications/mail.sender");
const subscriptionService = require("../services/subscription.service");
const mercadopago = require("mercadopago");
// const { dataApi } = require("../controllers/game.controller");
const { ACCESS_TOKEN_MP } = process.env;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

let order;

router.post("/payment", async (req, res) => {
  const userId = req.query.userId;
  const { email, name, price, title } = req.body;
  const reservations = await reservationService.getByUser(userId);
  order = await Promise.all(
    reservations.map(async (e) => {
      const showtime = await showtimeService.getById(e.showtimeId);
      return {
        description: showtime.movieTitle,
        quantity: e.seatLocations.length ? e.seatLocations.length : 1,
        price: e.price,
      };
    })
  );

  let preference = {
    items: [
      {
        id: "item-ID-1234",
        title: title,
        currency_id: "ARS",
        picture_url: "img",
        description: "Description",
        quantity: 1,
        unit_price: parseInt(price),
      },
    ],
    payer: {
      name: "Belen",
      surname: "Manterola",
      email: "user@email.com",
      phone: {
        area_code: "3444",
        number: 4444 - 4444,
      },
    },
    back_urls: {
      // success: `http://localhost:8082/payment/payment?userId=${req.body.userId}`,
      success: `http://localhost:8082/payment/payment?userId=${userId}&email=${email}&name=${name}&total=${price}`,
      failure: "http://localhost:8082/payment/payment",
      pending: "https://pf-henry-back.herokuapp.com/payment/payment",
    },
  };
  try {
    const data = await mercadopago.preferences.create(preference);

    res.redirect(data.body.init_point);
  } catch (e) {
    console.log(e);
  }
});

router.get("/payment", async (req, res, next) => {
  const {
    userId,
    payment_type,
    collection_id,
    status,
    email,
    name,
    payment_id,
    total,
  } = req.query;

  try {
    if (status === "approved") {
      await reservationService.confirmByUser(userId);

      console.log(userId);
      await mailSender.payment(
        "Payment Successful",
        name,
        payment_id,
        userId,
        email,
        new Date().toLocaleString().replace(",", " -"),
        payment_type,
        order,
        total,
        "https://noticias.iruya.com/newnex/images/stories/cultura/audiovisuales/cine_pochoclo.jpg",
        "your purchase"
      );
      return res.redirect(
        `http://localhost:3000/profile/payments?collection_id=${collection_id}&status=${status}&payment_type=${payment_type}`
      );
    }

    return res.redirect(
      `http://localhost:3000/cart?collection_id=${collection_id}&status=failed&payment_type=${payment_type}`
    );
  } catch (err) {
    next(err);
  }
});

router.post("/paymentSubscription", async (req, res) => {
  const userId = req.query.userId;
  const { email, name, price, title } = req.body;
  order = [
    {
      description: title,
      quantity: 1,
      price: price,
    },
  ];

  let preference = {
    items: [
      {
        id: "item-ID-1234",
        title: title,
        currency_id: "ARS",
        picture_url: "img",
        description: "Description",
        quantity: 1,
        unit_price: parseInt(price),
      },
    ],
    payer: {
      name: "Belen",
      surname: "Manterola",
      email: "user@email.com",
      phone: {
        area_code: "3444",
        number: 4444 - 4444,
      },
    },
    back_urls: {
      // success: `http://localhost:8082/payment/payment?userId=${req.body.userId}`,
      success: `http://localhost:8082/payment/paymentSubscription?userId=${userId}&email=${email}&name=${name}&total=${price}`,
      failure: "http://localhost:8082/payment/paymentSubscription",
      pending:
        "https://pf-henry-back.herokuapp.com/payment/paymentSubscription",
    },
  };
  try {
    const data = await mercadopago.preferences.create(preference);

    res.redirect(data.body.init_point);
  } catch (e) {
    console.log(e);
  }
});

router.get("/paymentSubscription", async (req, res, next) => {
  const {
    userId,
    payment_type,
    collection_id,
    status,
    email,
    name,
    payment_id,
    total,
  } = req.query;

  try {
    if (status === "approved") {
      await subscriptionService.save({ userId: userId, price: total });

      await mailSender.payment(
        "Payment Successful",
        name,
        payment_id,
        userId,
        email,
        new Date().toLocaleString().replace(",", " -"),
        payment_type,
        order,
        total,
        "https://st3.depositphotos.com/3889193/12521/i/600/depositphotos_125219864-stock-photo-movie-streaming-app.jpg",
        "your subscription"
      );
      return res.redirect(
        `http://localhost:3000/profile/payments?collection_id=${collection_id}&status=${status}&payment_type=${payment_type}`
      );
    }

    return res.redirect(
      `http://localhost:3000/subscribe?collection_id=${collection_id}&status=failed&payment_type=${payment_type}`
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;

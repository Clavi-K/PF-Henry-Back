const express = require("express");
const router = express.Router();
const axios = require("axios");
const reservationService = require("../services/reservation.service");
const mailSender = require("../notifications/mail.sender");

const mercadopago = require("mercadopago");
// const { dataApi } = require("../controllers/game.controller");
const { ACCESS_TOKEN_MP } = process.env;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

router.post("/payment", async (req, res) => {
  const userId = req.query.userId;
  const { email, name } = req.body;
  let preference = {
    // items: tickets,
    items: [
      {
        id: "item-ID-1234",
        title: req.body.title,
        currency_id: "ARS",
        picture_url: "img",
        description: "Description",
        quantity: 1,
        unit_price: parseInt(req.body.price),
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
      success: `http://localhost:8082/payment/payment?userId=${userId}&email=${email}&name=${name}`,
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
  const { userId, payment_type, collection_id, status, email, name } =
    req.query;

  try {
    if (status === "approved") {
      await reservationService.confirmByUser(userId);

      console.log(userId);
      await mailSender.payment(email, "Payment successful");
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

module.exports = router;

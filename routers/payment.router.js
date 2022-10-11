const express = require("express");
const router = express.Router();
const axios = require("axios");
const reservationService = require("../services/reservation.service");
// const CourierClient = require("@trycourier/courier").CourierClient;
// const courier = CourierClient({
//   authorizationToken: process.env.COURRIER_API_KEY

// let order;
// let games_id;
// let cartItems;
const mercadopago = require("mercadopago");
// const { dataApi } = require("../controllers/game.controller");
const { ACCESS_TOKEN_MP } = process.env;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

router.post("/payment", async (req, res) => {
  // const tickets = [...req.body.tickets.split(",")].map((item) => {
  //   return {
  //     id: "item-ID-1234",
  //     title: item.split("%")[0],
  //     currency_id: "ARS",
  //     picture_url: item.split("%")[2],
  //     description: "Description",
  //     quantity: 1,
  //     unit_price: parseInt(item.split("%")[1]),
  //   };
  // });

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
      success: "http://localhost:8082/payment/success?userId=holi",
      failure: "https://pf-henry-back.herokuapp.com/payment/payment",
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

router.get("/success", async (req, res, next) => {
  const userId = req.query.userId;
  try {
    // if (req.query.status === "approved") {
    //   await axios.put(
    //     `http://localhost:8082/reservation/confirmByUser/${userId}`,
    //     { payed: true }
    //   );
    // }
    if (req.query.status === "approved") {
      await reservationService.confirmByUser(userId);
    }
    return res.redirect(process.env.DEPLOYCLIENTURL);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
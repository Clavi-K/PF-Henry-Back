const express = require("express");
const router = express.Router();
// const axios = require("axios");
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
  // Crea un objeto de preferencia
  // /cartItems=JSON.parse(req.body.cartItems)
  // console.log(cartItems)/

  // games_id = [...req.body.games_id.split(",")].map((i) => {
  //   return { _id: i };
  // });
  // cartItems = [...req.body.cartItems.split(",")];
  // const games = cartItems.map((item) => {
  //   return {
  //     title: item.split("%")[0],
  //     subtotal_price: parseInt(item.split("%")[1]),
  //   };
  // });

  // order = {
  //   user_id: 1,
  //   username: "Belen",
  //   email: "manterolabelu@outlook.es",
  //   games: "movie",
  //   total_price: parseInt(req.body.price),
  // };
  let preference = {
    items: [
      {
        id: "item-ID-1234",
        title: "Tickets",
        currency_id: "ARS",
        picture_url: "img",
        description: "Descripción del Item",
        quantity: 1,
        unit_price: 750,
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
      success: "http://localhost:3000/",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
    },
  };
  try {
    const data = await mercadopago.preferences.create(preference);

    res.redirect(data.body.init_point);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

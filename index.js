/* ===== ENVIROMENT VARIBALES FILE CONFIG ===== */

require('dotenv').config({ path: '.env' })

/* ========== */

/* ===== REQUIRED IMPORTS  ===== */

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const routes = require('./routers/index');
const cors = require('cors')
const logger = require("./utils/logger")

/* ========== */

/* ===== VARIABLES ===== */

const PORT = process.env.PORT || 8082

/* ========== */

/* ===== APP INITIALIZATION ===== */

const app = express()

/* =========== */

/* ===== DATABASE CONNECTION ===== */

mongoose.connect(`${config.atlas.SCHEMA}://${config.atlas.USER}:${config.atlas.PASSWORD}@${config.atlas.HOSTNAME}/${config.atlas.DATABASE}?${config.atlas.OPTIONS}`).then(() => {

  /* ===== MIDDLEWWARES ===== */

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // cors añadido 
  app.use(cors({ origin: ["http://localhost:3000", "https://hpfc.netlify.app/"], credentials: true, methods: "GET,POST,PUT,DELETE" }))

  /* ========== */

  /* ===== ROUTERS ===== */

  app.use("/", routes)

  /* ========== */

  /* ===== APP LISTENING ===== */

  // Error catching endware.
  app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || err;
    logger.error(err)

    res.status(status).send(message);

  });

  app.listen(PORT, () => logger.log(`Listening on port ${PORT}`))

  /* ========== */

})

/* ========== */



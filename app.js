/* ===== ENVIROMENT VARIBALES FILE CONFIG ===== */

require('dotenv').config({ path: '.env' })

/* ========== */

/* ===== REQUIRED IMPORTS  ===== */

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const routes = require('./routers/index');



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

    /* ========== */

    /* ===== ROUTERS ===== */

    app.use("/", routes)

    /* ========== */

    /* ===== APP LISTENING ===== */

    // Error catching endware.
    app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

    /* ========== */

})

/* ========== */



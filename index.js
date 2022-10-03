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

const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

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

  app.use(session({
    secret: "auth",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: `${config.atlas.SCHEMA}://${config.atlas.USER}:${config.atlas.PASSWORD}@${config.atlas.HOSTNAME}/${config.atlas.DATABASE}?${config.atlas.OPTIONS}`,
      ttl: 10 * 60,
      expires: 1000 * 10 * 60,
      autoRemove: "native"
    })
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  //cors añadido 
  app.use(cors())

  app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
  })

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



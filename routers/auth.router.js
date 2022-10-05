/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/auth.controller')
const config = require('../config')
const passport = require('passport')

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/login", passport.authenticate("login", {
    successRedirect: `${config.auth.CLIENTURL}`,
    failureRedirect: `${config.auth.CLIENTURL}/login`
}))

router.post("/register", passport.authenticate("register", {
    successRedirect: `${config.auth.CLIENTURL}`,
    failureRedirect: `${config.auth.CLIENTURL}/register`
}))

router.get("/google", passport.authenticate("google", ["profile", "email"]))
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${config.auth.CLIENTURL}`,
    failureRedirect: `${config.auth.CLIENTURL}/login`
}))

router.get("/login/success", controller.login)
router.get("/logout", controller.logout)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
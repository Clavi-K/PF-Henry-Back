/* ===== REQUIRED IMPORTS ===== */

const {Router} = require('express')
const passport = require('passport')

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/login", passport.authenticate("login", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login"
}))

router.post("/register", passport.authenticate("register", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/register"
}))

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
const router = require('express').Router()
const passport = require('passport')

router.post("/login", passport.authenticate("login", {
    successRedirect: "http://localhost:3000/register",
    failureRedirect: "http://localhost:3000/login",
    failureFlash: true
}))

router.post("/register", passport.authenticate("register", {
    successRedirect: "http://localhost:3000/home",
    failureRedirect: "http://localhost:3000/register",
    failureFlash: true
}))

module.exports = router
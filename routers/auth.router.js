/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const passport = require("passport")
const controller = require("../controllers/auth.controller.js");
const config = require("../config/")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/login", passport.authenticate("login", {
    //successRedirect: `${config.auth.CLIENTURL}`,
    failureRedirect: `/auth/failed`
}), (req, res) => {
    res.send(req.user)
})

router.post("/register", controller.register)

router.get("/google", passport.authenticate("google", ["profile", "email"]))
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${config.auth.CLIENTURL}`,
    failureRedirect: `/auth/failed`
}))

router.get("/success", controller.success)
router.get("/failed", controller.failed)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
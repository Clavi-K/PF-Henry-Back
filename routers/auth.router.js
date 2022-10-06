/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const passport = require("passport")
const controller = require("../controllers/auth.controller.js");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/login", passport.authenticate("login", {
    successRedirect: "/auth/success",
    failureRedirect: "http://localhost:3000"
}))

router.post("/register",)

router.get("/google", passport.authenticate("google", ["profile", "email"]))
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "http://localhost:3000"
}))

router.get("/success", controller.success)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
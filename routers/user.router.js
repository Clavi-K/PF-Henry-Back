/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.get("/emailSend", auth, controller.emailSend)
router.get("/role", auth, controller.getRole)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
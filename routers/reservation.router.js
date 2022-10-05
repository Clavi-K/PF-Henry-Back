/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/reservation.controller.js");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/reservation.controller.js");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)
router.get("/getByUser", controller.getByUser)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
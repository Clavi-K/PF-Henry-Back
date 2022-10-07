/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/reservation.controller.js");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)
router.get("/getByUser/:userId", controller.getByUser)
router.put("/confirmByUser/:userId", controller.confirmByUser)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
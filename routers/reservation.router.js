/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/reservation.controller.js");
const auth = require("../middlewares/auth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", auth, controller.post);
router.get("/getByUser/:userId", auth, controller.getByUser);
router.put("/confirmByUser/:userId", auth, controller.confirmByUser);

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */

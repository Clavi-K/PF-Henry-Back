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
router.get("/getByUser", auth, controller.getByUser);
router.put("/setUserSeats", auth, controller.setUserSeats)
router.put("/cancelById", auth, controller.cancelById)
router.put("/confirmByUser", auth, controller.confirmByUser);

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */

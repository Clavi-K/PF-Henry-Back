/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/subscription.controller");
const auth = require("../middlewares/auth");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post("/subscribe", auth, controller.subscribe);
router.put("/addPayment", auth, controller.addPayment);
router.delete("/cancelPayment", auth, controller.cancelPayment)
router.get("/hasActiveSubscription", auth, controller.hasActiveSubscription)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */

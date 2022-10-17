/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/reservation.controller.js");
const auth = require("../middlewares/auth")
const adminAuth = require("../middlewares/adminAuth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", auth, controller.post);

router.put("/setUserSeats", auth, controller.setUserSeats)
router.put("/cancelById", auth, controller.cancelById)
router.put("/deleteByUser", auth, controller.deleteByUser)
router.put("/confirmByUser", auth, controller.confirmByUser);

router.get("/getAll", auth, adminAuth, controller.getAll)
router.get("/getByUser", auth, controller.getByUser);
router.get("/getPayedByUser", auth, controller.getPayedByUser);
router.get("/getByShowtime/:showtimeId", auth, controller.getByShowtime)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */

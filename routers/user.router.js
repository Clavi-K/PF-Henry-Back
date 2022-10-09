/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/user.controller.js");

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/register", controller.register)
router.get("/getById/:userId", controller.getById)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/register", controller.register)
router.get("/getById/:userId", auth, controller.getById)


/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
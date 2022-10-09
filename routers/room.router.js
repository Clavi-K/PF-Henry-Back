/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express")
const controller = require("../controllers/room.controller")
const auth = require("../middlewares/auth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", auth, controller.post)
router.get("/getAll", controller.getAll)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
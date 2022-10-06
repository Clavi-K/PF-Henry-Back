/* ===== REQUIRED IMPORTS ===== */

const {Router} = require("express")
const controller = require("../controllers/room.controller")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
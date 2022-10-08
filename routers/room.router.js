/* ===== REQUIRED IMPORTS ===== */

const {Router} = require("express")
const controller = require("../controllers/room.controller")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)
router.get("/getAll", controller.getAll)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express")
const controller = require("../controllers/room.controller")
const auth = require("../middlewares/auth")
const adminAuth = require("../middlewares/adminAuth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.get("/getAll", controller.getAll)
router.post("/post", auth, adminAuth, controller.post)
router.delete("/delete/:roomId", auth, adminAuth, controller.deleteById)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
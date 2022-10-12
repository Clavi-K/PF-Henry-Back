/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express")
const controller = require("../controllers/list.controller")
const auth = require("../middlewares/auth")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", auth, controller.post)
router.get("/getByUser", auth, controller.getByUser)
router.put("/addMovie/:listId/:movieId", auth, controller.addMovie)
router.put("/removeMovie/:listId/:movieId", auth, controller.removeMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
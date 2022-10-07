/* ===== REQUIRED IMPORTS ===== */

const {Router} = require("express")
const controller = require("../controllers/list.controller")

/* ========== */

/* ===== VARIABLES ===== */

const router = Router()

/* ========== */

/* ===== ROUTES ===== */

router.post("/post", controller.post)
router.get("/getByUser", controller.getByUser)
router.get("/addMovie/:listId/:movieId", controller.addMovie)
router.get("/removeMovie/:listId/:movieId", controller.removeMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
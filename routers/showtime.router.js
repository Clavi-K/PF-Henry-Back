/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/showtime.controller.js')
const auth = require("../middlewares/auth")

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post('/post', auth, controller.post)
router.get('/getAll', controller.getAll)
router.put('/update', auth, controller.update)
router.get("/getById/:showtimeId", controller.getById)
router.delete("/endById/:showtimeId", auth, controller.endById)
router.get('/getByMovie/:movieId', controller.getByMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
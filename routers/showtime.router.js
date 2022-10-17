/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/showtime.controller.js')
const auth = require("../middlewares/auth")
const adminAuth = require("../middlewares/adminAuth")

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post('/post', auth, adminAuth, controller.post)
router.get('/getAll', auth, adminAuth, controller.getAll)
router.put('/update', adminAuth, auth, controller.update)
router.get("/getById/:showtimeId", controller.getById)
router.delete("/endById/:showtimeId", auth, adminAuth, controller.endById)
router.get('/getByMovie/:movieId', controller.getByMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
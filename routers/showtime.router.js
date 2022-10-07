/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/showtime.controller.js')

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post('/post', controller.post)
router.get('/getAll', controller.getAll)
router.put('/update', controller.update)
router.get("/getById/:showtimeId", controller.getById)
router.get('/getByMovie/:movieId', controller.getByMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
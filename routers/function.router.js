/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/function.controller.js')

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.get('/getAll', controller.getAll)
router.post('/post', controller.post)
router.put('/update', controller.update)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
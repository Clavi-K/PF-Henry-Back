/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/db.controller.js')

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.get('/getAllFunctions', controller.getAllFunctions)
router.post('/postFunction', controller.postFunction)
router.put('/updateFunction', controller.updateFunction)
/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
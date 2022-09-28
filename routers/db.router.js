/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/db.controller.js')

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.post('/postFunction', controller.postFunction)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */
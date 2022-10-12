/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/seat.controller.js')

/* ========== */

/* ===== VARIABLES  ===== */

const router = new Router()

/* ========== */

/* ===== ROUTES ===== */

router.get("/getByShowtime/:showtimeId", controller.getByShowtime)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
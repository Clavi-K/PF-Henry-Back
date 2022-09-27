/* ===== REQUIRED IMPORTS ===== */

const { Router } = require('express')
const controller = require('../controllers/api.controller.js')

/* ========== */

/* ===== VARIABLES  ===== */

const router = new Router()

/* ========== */

/* ===== ROUTES ===== */

router.get("/popular", controller.getAllPopular)
router.get("/:movieId", controller.getMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router

/* ========== */
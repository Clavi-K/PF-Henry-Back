/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/review.controller.js");

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */
router.get("/getAll", controller.getAll);
router.post("/post", controller.post);
router.get("/:movieId", controller.getByMovie)
/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */

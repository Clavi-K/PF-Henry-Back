/* ===== REQUIRED IMPORTS ===== */

const { Router } = require("express");
const controller = require("../controllers/review.controller.js");
const auth = require("../middlewares/auth")

/* ==========*/

/* ===== VARIABLES ===== */

const router = Router();

/* ========== */

/* ===== ROUTES ===== */

router.get("/getAll", controller.getAll);
router.post("/post", auth, controller.post);
router.post("/postWebsite", auth, controller.postWebiste)
router.get("/getAllWebsite", controller.getAllWebsite)
router.get("/:movieId", controller.getByMovie)

/* ========== */

/* ===== ROUTER EXPORT ===== */

module.exports = router;

/* ========== */


const { Router } = require('express')
const {postFunction} =require('../controllers/db.controller');

const router = Router();

router.post('/postFunction', postFunction)

module.exports = router;
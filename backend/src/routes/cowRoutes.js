const express = require('express');
const { registerCow, getCows } = require('../controllers/cow');
const router = express.Router();

router.post('/register', registerCow);
router.get('/all', getCows);

module.exports = router;
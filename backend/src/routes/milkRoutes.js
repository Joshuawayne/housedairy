const express = require('express');
const { logMilkSession, getMilkSessions } = require('../controllers/milk');
const router = express.Router();

router.post('/log', logMilkSession);
router.get('/all', getMilkSessions);

module.exports = router;

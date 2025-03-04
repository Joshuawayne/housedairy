const express = require('express');
const { logBreedingEvent, getBreedingEvents } = require('../controllers/breeding');
const router = express.Router();

router.post('/log', logBreedingEvent);
router.get('/all', getBreedingEvents);

module.exports = router;

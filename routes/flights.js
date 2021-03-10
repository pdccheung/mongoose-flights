const express = require('express');
const router = express.Router();

module.exports = router;

const flightsCtrl = require('../controllers/flights')

router.get('/', flightsCtrl.index);

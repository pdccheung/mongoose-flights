const express = require('express');
const router = express.Router();

module.exports = router;

const flightsCtrl = require('../controllers/flights')

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.newFlight);

router.post('/', flightsCtrl.create);

router.get('/:id', flightsCtrl.show);

router.post('/:id/destination', flightsCtrl.createDestination);

router.post('/:id/tickets', flightsCtrl.createTicket);

router.delete('/:id/tickets', flightsCtrl.deleteTicket);
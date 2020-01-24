const express = require('express')
const stationController = require('../controllers/station');
const router = express.Router();


router.post('/stations', stationController.create);


router.get('/stations', stationController.findAll);


router.get('/station/:Id', stationController.findOne);


router.put('/stations/:Id', stationController.update);


router.delete('/stations/:noteId', stationController.delete);

module.exports = router;
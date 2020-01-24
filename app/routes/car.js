const express = require('express')
const carController = require('../controllers/car');
const router = express.Router();


router.post('/cars', carController.create);


router.get('/car', carController.findAll);


router.get('/cars/:Id', carController.findOne);


router.put('/cars/:Id', carController.update);


router.delete('/cars/:noteId', carController.delete);

module.exports = router;
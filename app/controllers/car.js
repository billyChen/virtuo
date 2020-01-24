const Car = require('../models/Car');

exports.create = (req, res) => {
	console.log(req)
    if(!req.body.name || !req.body.available) {
        return res.status(400).send({
            message: "Car name and availability can not be empty"
        });
    }

    const car = new Car({
        name: req.body.name,
        available: req.body.available
    });

    car.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAll = (req, res) => {

	  Car.find()
	    .then(cars => {
	    	res.send(cars)
	    })
	    .catch(err => {
	    	 res.status(500).send({
	            message: err.message || "Some error occurred while retrieving cars."
	        });
	    });

};

exports.findOne = (req, res) => {
  const carId = req.params.carId;
  Car.findById(carId)
    .then(car => {
    	res.send(car)
    })
    .catch(err => {
    	 res.status(500).send({
            message: err.message || "Some error occurred while retrieving car."
        });
    });
};

exports.update = (req, res) => {

	    if(!req.body.name || !req.body.available) {
	        return res.status(400).send({
	            message: "Car name can not be empty"
	        });
	    }

	    Car.findByIdAndUpdate(req.params.carId, {
	        name: req.body.name,
	        available: req.body.available
	    })
	    .then(car => {
	        if(!car) {
	            return res.status(404).send({
	                message: "Car not found with id " + req.params.carId
	            });
	        }
	        res.send(car);
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Car not found with id " + req.params.carId
	            });                
	        }
	        return res.status(500).send({
	            message: "Error updating car with id " + req.params.carId
	        });
	    });
};

exports.delete = (req, res) => {
	Car.findByIdAndRemove(req.params.carId)
	    .then(car=> {
	        if(!car) {
	            return res.status(404).send({
	                message: "Car not found with id " + req.params.carId
	            });
	        }
	        res.send({message: "car deleted successfully!"});
	    }).catch(err => {
	        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
	            return res.status(404).send({
	                message: "Car not found with id " + req.params.carId
	            });                
	        }
	        return res.status(500).send({
	            message: "Could not delete car with id " + req.params.carId
	        });
	    });
};
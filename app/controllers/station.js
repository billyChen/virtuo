const Station = require('../models/Station');

// Create and Save a new station
exports.create = (req, res) => {
   // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Station name can not be empty"
        });
    }

    const station = new Station({
        name: req.body.name 
    });

    station.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Retrieve and return all station from the database.
exports.findAll = (req, res) => {

	  Station.find()
	    .then(stations => {
	    	res.send(stations)
	    })
	    .catch(err => {
	    	 res.status(500).send({
	            message: err.message || "Some error occurred while retrieving stations."
	        });
	    });

};

// Find a single station with a stationId
exports.findOne = (req, res) => {
  const stationId = req.params.stationId;
  Station.findById(stationId)
    .then(station => {
    	res.send(station)
    })
    .catch(err => {
    	 res.status(500).send({
            message: err.message || "Some error occurred while retrieving station."
        });
    });
};

// Update a station identified by the stationId in the request
exports.update = (req, res) => {

	    if(!req.body.name) {
	        return res.status(400).send({
	            message: "Station name can not be empty"
	        });
	    }

	    Station.findByIdAndUpdate(req.params.stationId, {
	        name: req.body.name
	    })
	    .then(station => {
	        if(!station) {
	            return res.status(404).send({
	                message: "Station not found with id " + req.params.stationId
	            });
	        }
	        res.send(station);
	    }).catch(err => {
	        if(err.kind === 'ObjectId') {
	            return res.status(404).send({
	                message: "Station not found with id " + req.params.stationId
	            });                
	        }
	        return res.status(500).send({
	            message: "Error updating station with id " + req.params.stationId
	        });
	    });
};

// Delete a station with the specified stationId in the request
exports.delete = (req, res) => {
	Station.findByIdAndRemove(req.params.stationId)
	    .then(station => {
	        if(!station) {
	            return res.status(404).send({
	                message: "Station not found with id " + req.params.stationId
	            });
	        }
	        res.send({message: "station deleted successfully!"});
	    }).catch(err => {
	        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
	            return res.status(404).send({
	                message: "Station not found with id " + req.params.stationId
	            });                
	        }
	        return res.status(500).send({
	            message: "Could not delete station with id " + req.params.stationId
	        });
	    });
};
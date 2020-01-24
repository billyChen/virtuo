const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stationRoutes = require('./app/routes/station');
const carRoutes = require('./app/routes/car');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(stationRoutes);
app.use(carRoutes);



mongoose
  .connect(
    'mongodb://localhost:27017/car'
  )
  .then(result => {

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


  module.exports = app;
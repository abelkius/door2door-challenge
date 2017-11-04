const express = require('express');
const routeControllers = require('./controller');

const vehicleRouter = express.Router();

vehicleRouter
  .route('/')
  .get(routeControllers.getAllVehicles)
  .post(routeControllers.createVehicle);

vehicleRouter
  .route('/:id')
  .get(routeControllers.getVehicle)
  .delete(routeControllers.deleteVehicle);

vehicleRouter.route('/:id/locations').post(routeControllers.createLocation);

module.exports = vehicleRouter;

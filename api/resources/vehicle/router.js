const express = require('express');
const routeController = require('./controller');
const validateLocation = require('./middleware');

const vehicleRouter = express.Router();

vehicleRouter
  .route('')
  .get(routeController.getAllVehicles)
  .post(routeController.createVehicle);

vehicleRouter
  .route('/:id')
  .get(routeController.getVehicle)
  .delete(routeController.deleteVehicle);

vehicleRouter.use('/:id/locations', validateLocation);

vehicleRouter.route('/:id/locations').post(routeController.addLocation);

module.exports = vehicleRouter;

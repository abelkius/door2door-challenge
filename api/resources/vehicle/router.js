const express = require('express');
const routeControllers = require('./controller');

const vehicleRouter = express.Router();

vehicleRouter
  .route('/')
  .get(routeControllers.getAll)
  .post(routeControllers.createOne);

vehicleRouter
  .route('/:id')
  .get(routeControllers.getOne)
  .delete(routeControllers.deleteOne);

vehicleRouter.route('/:id/locations').post(routeControllers.createLocation);

module.exports = vehicleRouter;

const _ = require('lodash');
const geolib = require('geolib');

const vehicles = [];
const office = [52.53, 13.403];
const cityRadius = 3500;

const controllers = {
  getAllVehicles: () => Promise.resolve(vehicles),
  getVehicle: id => {
    const found = _.find(vehicles, {id});
    if (!found) {
      return Promise.reject(new Error('Vehicle you are trying to get does not exist'));
    }
    return Promise.resolve(found);
  },
  createVehicle: vehicle => {
    if (!vehicle || !vehicle.id) {
      return Promise.reject(new Error('Vehicle you are trying to create must contain an unique id'));
    }
    vehicles.push(Object.assign({}, vehicle, {locations: []}));
    return Promise.resolve({});
  },
  deleteVehicle: id => {
    const foundVehicle = _.find(vehicles, {id});
    if (!foundVehicle) {
      return Promise.reject(new Error('Vehicle you are trying to delete does not exist'));
    }
    const index = vehicles.indexOf(foundVehicle);
    vehicles.splice(index, 1);
    return Promise.resolve({});
  },
  validateLocation(id, location) {
    const newLocation = [location.lat, location.lng];
    const found = _.find(vehicles, {id});

    if (!found) {
      console.info(`Vehicle with id ${id} does not exist, location ${location.lng} ${location.lat}`);
      return Promise.resolve(null);
    }
    if (!geolib.isPointInCircle(newLocation, office, cityRadius)) {
      console.info(`Location ${location.lng} ${location.lat} is outside of city boundries`);
      return Promise.resolve(null);
    }
    return Promise.resolve(found);
  },
  createLocation: (vehicle, location) => {
    if (vehicle) {
      vehicle.locations.push(location);
    }
    return Promise.resolve({});
  }
};

module.exports = {
  getAllVehicles: (req, res, next) =>
    controllers
      .getAllVehicles()
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),
  getVehicle: (req, res, next) =>
    controllers
      .getVehicle(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),

  createVehicle: (req, res, next) =>
    controllers
      .createVehicle(req.body)
      .then(data => res.status(204).json(data))
      .catch(error => next(error)),

  deleteVehicle: (req, res, next) =>
    controllers
      .deleteVehicle(req.params.id)
      .then(data => res.status(204).json(data))
      .catch(error => next(error)),
  createLocation: (req, res, next) =>
    controllers
      .validateLocation(req.params.id, req.body)
      .then(data => controllers.createLocation(data, req.body))
      .then(data => res.status(204).json(data))
      .catch(error => next(error))
};

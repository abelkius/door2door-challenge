const _ = require('lodash');

const vehicles = [];

const controllers = {
  getAll: () => Promise.resolve(vehicles),
  getOne: id => {
    const found = _.find(vehicles, {id});
    if (!found) {
      return Promise.reject(new Error('Vehicle you are trying to get does not exist'));
    }
    return Promise.resolve(found);
  },
  createOne: vehicle => {
    if (!vehicle || !vehicle.id) {
      return Promise.reject(new Error('Vehicle you are trying to create must contain an unique id'));
    }
    vehicles.push(Object.assign({}, vehicle, {locations: []}));
    return Promise.resolve({});
  },
  deleteOne: id => {
    const foundVehicle = _.find(vehicles, {id});
    if (!foundVehicle) {
      return Promise.reject(new Error('Vehicle you are trying to delete does not exist'));
    }
    const index = vehicles.indexOf(foundVehicle);
    vehicles.splice(index, 1);
    return Promise.resolve({});
  },
  createLocation: (id, location) => {
    const found = _.find(vehicles, {id});
    if (!found) {
      console.info(`Vehicle with id ${id} does not exist, location ${location.lng} ${location.lat}`);
    } else {
      found.locations.push(location);
    }
    return Promise.resolve({});
  }
};

module.exports = {
  getAll: (req, res, next) =>
    controllers
      .getAll()
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),
  getOne: (req, res, next) =>
    controllers
      .getOne(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),

  createOne: (req, res, next) =>
    controllers
      .createOne(req.body)
      .then(data => res.status(204).json(data))
      .catch(error => next(error)),

  deleteOne: (req, res, next) =>
    controllers
      .deleteOne(req.params.id)
      .then(data => res.status(204).json(data))
      .catch(error => next(error)),
  createLocation: (req, res, next) =>
    controllers
      .createLocation(req.params.id, req.body)
      .then(data => res.status(204).json(data))
      .catch(error => next(error))
};

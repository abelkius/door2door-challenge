const vehicles = {};

const controllers = {
  getAll: () => Promise.resolve(vehicles),
  getOne: index => {
    if (!vehicles[index]) {
      return Promise.reject(new Error('Vehicle you are trying to get does not exist'));
    }
    return Promise.resolve(vehicles[index]);
  },
  createOne: vehicle => {
    if (!vehicle || !vehicle.id) {
      return Promise.reject(new Error('Vehicle you are trying to create must contain an unique id'));
    }
    vehicles[vehicle.id] = {...vehicle, locations: []};
    return Promise.resolve({});
  },
  deleteOne: index => {
    if (!vehicles[index]) {
      return Promise.reject(new Error('Vehicle you are trying to delete does not exist'));
    }
    vehicles.splice(index, 1);
    return Promise.resolve({});
  },
  createLocation: (index, location) => {
    if (!vehicles[index]) {
      return Promise.reject(new Error('Vehicle of which location you are trying to update does not exist'));
    }
    vehicles[index].locations.push(location);
    return Promise.resolve({});
  }
};

export default {
  getAll: (req, res, next) =>
    controllers
      .getAll()
      .then(data => res.json(data))
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

const vehicles = [];

const controllers = {
  getAll: () => Promise.resolve(vehicles),
  getOne: index => Promise.resolve(vehicles[index]),
  createOne: vehicle => {
    vehicles.push(vehicle);
    const created = vehicles[vehicles.indexOf(vehicle)];
    return Promise.resolve(created);
  },
  deleteOne: index => {
    const deleted = vehicles.splice(index, 1);
    return Promise.resolve(deleted);
  }
};

export default {
  getAll: (req, res, next) =>
    controllers
      .getAll()
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),

  getOne: (req, res, next) =>
    controllers
      .getOne(req.idParam)
      .then(data => res.status(200).json(data))
      .catch(error => next(error)),

  createOne: (req, res, next) =>
    controllers
      .createOne(req.body)
      .then(data => res.status(201).json(data))
      .catch(error => next(error)),

  deleteOne: (req, res, next) =>
    controllers
      .deleteOne(req.idParam)
      .then(data => res.status(200).json(data))
      .catch(error => next(error))
};

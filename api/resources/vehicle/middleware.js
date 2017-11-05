const geolib = require('geolib');

const office = [52.53, 13.403];
const cityRadius = 3500;

module.exports = function validateLocation(req, res, next) {
  if (!req.body || !req.body.lat || !req.body.lng) {
    res.status(500).send('Invalid request body');
    return;
  }

  const newLocation = [req.body.lat, req.body.lng];

  if (!geolib.isPointInCircle(newLocation, office, cityRadius)) {
    console.info(`Location ${newLocation[0]} ${newLocation[1]} is outside of city boundries`);
    res.status(204).send();
    return;
  }
  next();
};

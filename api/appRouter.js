const express = require('express');
const vehicleRouter = require('./resources/vehicle/router');

const router = express.Router();

// application routing
router.use('/vehicles', vehicleRouter);
// error handling
router.use((error, req, res, _next) => {
  console.error('Error: ', error.stack);
  res.status(500).send(error.message || error.toString());
});

module.exports = router;

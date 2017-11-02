const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Vehicle cannot be created without unique id']
  },
  locations: [
    {
      at: Date,
      lat: Number,
      lng: Number
    }
  ]
});

module.exports = mongoose.model('vehicle', vehicleSchema);

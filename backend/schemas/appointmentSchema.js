const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    veterinarian: { type: String, required: true },
    pet: { type: String, required: true },
    date: {
        type: Date,
        required: true,
      }
  });
  
module.exports = mongoose.model('appointment', appointmentSchema);
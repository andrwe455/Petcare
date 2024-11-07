const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({

  medId: {type: String},
  commercial_name: {type: String, required: true}, 
  generic_name: {type: String, required: true},
  description: {type: String, required: true},
  expiration_date: {type: Date, required: true},
  category: {type: String, enum:['Antibiotic', 'Vaccine', 'Antiparasitic'], required: true},
  stock: {type: Number, required: true},
  price: {type: Number, required: true}
})

module.exports = mongoose.model('Medicine', medicineSchema); 
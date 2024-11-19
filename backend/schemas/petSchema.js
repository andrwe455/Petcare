const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  image: { type: String },
  allergies: [
    {
      name: { type: String }
    }
  ],
  vaccinationRecords: 
  [
    {
      date: { type: Date},
      vaccine: { type: String},
      nextAppointment: { type: Date}
    }
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }
}); 


module.exports = mongoose.model('Pet', petSchema, 'pets');
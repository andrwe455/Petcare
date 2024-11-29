const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  pet: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
  assigner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  medicines: {type: [String], required: true},
  dose_amount: {type: [Number], required: true},
  dose_time_type: {type: [String], required: true},
  dose_time_amount: {type: [Number], required: true},
  dose_type: {type: [String], enum:['Pills', 'Drops'], required: true},
  initial_date: {type: Date, required: true},
  final_date: {type: Date, required: true},
  recommendations: {type: String, required: false},
  generation_date: {type: Date, required: true}
})

module.exports = mongoose.model('Recipe', recipeSchema); 
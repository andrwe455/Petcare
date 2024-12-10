const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }, 
  assigner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  diagnostic_name: { type: String, required: true }, 
  symptoms_description: { type: String, required: true }, 
  tests_required: { type: [String], required: false }, 
  treatment_plan: { type: String, required: true }, 
  initial_date: { type: Date, required: true }, 
  final_date: { type: Date, required: true }, 
  recommendations: { type: String, required: false },
  generation_date: { type: Date, default: Date.now, required: true } 
});

module.exports = mongoose.model('Diagnostic', diagnosticSchema);



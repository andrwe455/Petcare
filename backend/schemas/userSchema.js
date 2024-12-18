const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['veterinarian', 'owner'], required: true },
    temPassword: { type: Boolean}
});

module.exports = mongoose.model('User', userSchema, 'Users');
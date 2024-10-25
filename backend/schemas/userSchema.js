const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['doctor', 'owner'], required: true }
});

module.exports = mongoose.model('User', userSchema, 'Users');
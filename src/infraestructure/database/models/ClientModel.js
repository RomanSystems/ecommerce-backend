const mongoose = require('../mongoose');

const clientSchema = new mongoose.Schema({
    // id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    nitCi: { type: String, required: true, min: 5 },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, min: 6 },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
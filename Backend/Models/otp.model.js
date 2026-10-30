const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60
    }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
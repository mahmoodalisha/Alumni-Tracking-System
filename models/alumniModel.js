const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    graduationYear: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
    },
    linkedinProfile: {
        type: String,
    },
    photo: {
        type: String,
    },
    motivationMessage: {
        type: String,
    }
});

const Alumni = mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;

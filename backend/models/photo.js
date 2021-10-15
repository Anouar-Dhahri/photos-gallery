const mongoose = require('mongoose');

const photosSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [Object]
}, {timestamps: true});

const Photos = mongoose.model('Photos', photosSchema);

module.exports = Photos;
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/NasaApi');

const landing = mongoose.model('landings', {
    name : String,
    id: Number,
    nametype: String,
    recclass: String,
    mass: Number,
    fall: String,
    year: Date,
    reclat: Number,
    reclong: Number,
    geolocation: {
        latitude: Number,
        longitude: Number
    }
})

module.exports = landing;
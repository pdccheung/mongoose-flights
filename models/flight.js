const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// modify below as you see fit.
module.exports = mongoose.modle('Flight', flightSchema);

const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United'] },
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
    flightNo: {type: Number, min: 10, max: 9999, required: true},
    departs: {
        type: Date,
        default: () => new Date(+new Date() + 362*24*60*60*1000) 
        },
})



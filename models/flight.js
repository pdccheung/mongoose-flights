let mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
let Schema = mongoose.Schema;

const destinationSchema = new Schema ({
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] },
    arrival: Date,
}, {
    timestamps: true
})


const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United'] },
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
    flightNo: {type: Number, min: 10, max: 9999, required: true},
    departs: {
        type: Date,
        default: () => new Date(+new Date() + 362*24*60*60*1000) 
        },
    destination: [destinationSchema],
}, {
    timestamps: true
},
);

// compile schema into a model. Model name is singular
module.exports = mongoose.model('Flight', flightSchema);



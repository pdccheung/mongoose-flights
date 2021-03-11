let mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
let Schema = mongoose.Schema;

// modify below as you see fit.


const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United'] },
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
    flightNo: {type: Number, min: 10, max: 9999, required: true},
    departs: {
        type: Date,
        default: () => new Date(+new Date() + 362*24*60*60*1000) 
        },
}, {
    timestamps: true
},
)


// compile schema into a model. Model name is singular
module.exports = mongoose.model('Flight', flightSchema);
// all mongoose functions run asynchronously; 
// it does not follow the normal thread of execution
//use either async/await or callback function.
//Also should use Try/Catch for error handling

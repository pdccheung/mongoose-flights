module.exports = {
    index, 
    newFlight,
    create,
    // update,
    // delete,
}

let Flight = require('../models/flight')


async function index(req, res){
    let result = await Flight.find({});
    console.log (result);
    res.render('flights/index', {
        result: result,
    })
}

function newFlight(req, res){
    res.render('flights/new', {})
}

 function create(req, res){
    // console.log(addFlightToDB(req.body));
    // await Flight.create(req.body);
    addFlightToDB(req.body);
    res.send('Thank you for adding your flight info')
}

async function addFlightToDB(incomingData){
    try {
    if (incomingData.departs != null ) {
      await Flight.create({
        airline: incomingData.airline,
        airport: incomingData.airport,
        flightNo: incomingData.flightNo,
        departs: incomingData.departs,
    })  
    } else {
        await Flight.create({
            airline: incomingData.airline,
            airport: incomingData.airport,
            flightNo: incomingData.flightNo,
    }) }
} catch(err){
    console.log(err);
    return res.send('There was an error processing your flight info')
}
    
}


/* function findFlights () {

} */
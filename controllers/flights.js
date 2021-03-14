module.exports = {
    index, 
    newFlight,
    show,
    create,
    createDestination,
    // update,
    // delete,
}

let Flight = require('../models/flight')
let Ticket = require('../models/ticket')


async function show(req, res) {
    let result = await Flight.findById(req.params.id)
    let departsTime = result.departs.toISOString().slice(11, 16);
    let departsDate = result.departs.toLocaleDateString();
    res.render('flights/show', {
        result:result,
        departsTime: departsTime,
        departsDate: departsDate,
    })
}

async function index(req, res){
    let result = await Flight.find({});
    res.render('flights/index', {
        result: result,
    })
}

function newFlight(req, res){
    res.render('flights/new', {})
}


function create(req, res) {
    if (req.body.departs == '') req.body.departs = undefined;
    const newFlight = new Flight(req.body);
    const dt = newFlight.departs;
    const departsData = dt.toISOString().slice(0, 16);
    newFlight.save(function(err){
        if (err) return res.redirect('flights/new');
        res.redirect('/flights');
    })
}


async function createDestination(req, res) {
    let indFlight = await Flight.findById(req.params.id);
    indFlight.destination.push(req.body);
    await indFlight.save();
    // res.send("is it working?")
    res.redirect('/flights/' + indFlight.id);
}
//date.toLocaleDateString();

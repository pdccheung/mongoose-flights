module.exports = {
    index, 
    newFlight,
    show,
    create,
    createDestination,
    createTicket,
    deleteTicket,
    
}

let Flight = require('../models/flight')
let Ticket = require('../models/ticket')

async function createTicket (req, res) {
    console.log(req.params.id)
    let myTicket = await Ticket.create(req.body);
    await myTicket.save();
    console.log(myTicket)
    res.redirect('/flights/' + myTicket.flight);
}


async function show(req, res) {
    let result = await Flight.findById(req.params.id)
    let departsTime = result.departs.toISOString().slice(11, 16);
    let departsDate = result.departs.toLocaleDateString();
    let price = getRandomInt(800, 1500);
    let tickets = await Ticket.find();
    res.render('flights/show', {
        result:result,
        departsTime: departsTime,
        departsDate: departsDate,
        price: price,
        tickets: tickets,
    })
}

async function index(req, res){
    let result = await Flight.find();
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


//Flight random price generator; min = 800, max 1500
function getRandomInt(min, max) {
    const precision = 100;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max*precision - min*precision) + min*precision)/precision; //The maximum is exclusive and the minimum is inclusive
  }

  async function deleteTicket(req, res){
      let tix = await Ticket.findById(req.body.ticketID);
      console.log(tix.flight);
        await Ticket.deleteOne(tix);
      res.redirect('/flights/' + tix.flight);
  }

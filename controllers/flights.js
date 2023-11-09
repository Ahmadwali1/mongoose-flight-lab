const Flight = require("../models/flight");

module.exports = {
  new: newFlight,
  create,
  index,
  show,
  createDestination,
  deleteDestination,
};

async function show(req, res) {
  const flight = await Flight.findById(req.params.id);
  res.render("flights/show", { title: "flight Details", flight });
}

async function index(req, res) {
  const flights = await Flight.find({});
  res.render("flights/index", { title: "All flights", flights });
}

async function create(req, res) {
  req.body.airline = req.body.airline.trim();
  try {
    await Flight.create(req.body);
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.render("/flights/new", { errorMsg: err.message });
  }
}

function newFlight(req, res) {
  res.render("flights/new", { errorMsg: "" });
}

async function createDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    flight.destination.push(req.body);

    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function deleteDestination(req, res) {
  const flight = await Flight.findOne({
    "destination._id": req.params.id,
    "destination.user": req.user._id,
  });

  if (!flight) return res.redirect("/flights");

  flight.destination.remove(req.params.id);
  await flight.save();
  res.redirect(`/flights/${flight._id}`);
}

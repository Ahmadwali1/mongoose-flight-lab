const Flight = require("../models/flight");

async function create(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    flight.destination.push(req.body);

    await flight.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}

module.exports = {
  create,
};

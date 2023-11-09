var express = require("express");
var router = express.Router();

const flightsCtrl = require("../controllers/flights");

router.get("/", flightsCtrl.index);
// Get / flights / new
router.get("/new", flightsCtrl.new);

router.get("/:id", flightsCtrl.show);

// post /flights
router.post("/", flightsCtrl.create);

router.post("/:id/destinations", flightsCtrl.createDestination);

router.delete("/destinations/:id", flightsCtrl.deleteDestination);

module.exports = router;

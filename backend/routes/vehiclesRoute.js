const router = require("express").Router();
const Vehicles = require("../controllers/vehiclesController");

router.post("/createVehicles", Vehicles.createVehicle);

module.exports = router;
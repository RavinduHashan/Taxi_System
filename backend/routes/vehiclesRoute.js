const router = require("express").Router();
const Vehicles = require("../controllers/vehiclesController");

router.post("/createVehicles", Vehicles.createVehicle);
router.get("/getVehicles", Vehicles.getVehicles);
router.put("/updateVehicles/:id", Vehicles.updateVehicles);
router.delete("/deleteVehicles/:id", Vehicles.deleteVehicles);
router.get("/getOneVehicle/:id", Vehicles.getOneVehicle);

module.exports = router;
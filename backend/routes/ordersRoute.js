const router = require("express").Router();
const Orders = require("../controllers/ordersController");



//Admin
router.get("/viewOrdersByResponse/:response", Orders.viewOrdersByResponse);

router.post("/createOrders", Orders.createOrders);
router.get("/getOrders", Orders.getOrders);
router.put("/updateOrders/:id", Orders.updateOrders);
router.delete("/deleteOrders/:id", Orders.deleteOrders);
router.get("/searchOrders", Orders.searchOrders);

router.get("/allCount", Orders.allCount);

//Customer
router.post("/customerCreateOrders/:customer_id", Orders.customerCreateOrders);
router.get("/customerGetOrders/:id", Orders.customerGetOrders);
router.put("/customerUpdateOrders/:id", Orders.customerUpdateOrders);
router.delete("/customerDeleteOrders/:id", Orders.customerDeleteOrders);

//Driver
router.get("/driverGetOrders/:id", Orders.driverGetOrders);

router.get("/getAvailableDrivers", Orders.getAvailableDrivers);
router.put("/insertAvailability/:id/:available", Orders.insertAvailability);
router.put("/insertResponse/:id/:response", Orders.insertResponse);

//Admin
router.get("/:id", Orders.getOneOrder);

module.exports = router;

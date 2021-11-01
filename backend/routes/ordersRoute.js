const router = require("express").Router();
const Orders = require("../controllers/ordersController");

//Admin

router.get("/viewPendingOrders", Orders.viewPendingOrders);
router.get("/viewConfirmOrders", Orders.viewConfirmOrders);
router.get("/viewCompleteOrders", Orders.viewCompleteOrders);
router.get("/viewRejectOrders", Orders.viewRejectOrders);
router.get("/viewOrdersByResponse/:value", Orders.viewOrdersByResponse);

router.post("/createOrders", Orders.createOrders);
router.get("/getOrders", Orders.getOrders);
router.put("/updateOrders/:id", Orders.updateOrders);
router.delete("/deleteOrders/:id", Orders.deleteOrders);
router.get("/searchOrders/:pick_location/:drop_location/:pick_time/:drop_time/:response", Orders.searchOrders)


//Customer
router.post("/customerCreateOrders/:customer_id", Orders.customerCreateOrders);
router.get("/customerGetOrders/:id", Orders.customerGetOrders);
router.put("/customerUpdateOrders/:id", Orders.customerUpdateOrders);
router.delete("/customerDeleteOrders/:id", Orders.customerDeleteOrders);

//Driver
router.get("/driverGetOrders/:id", Orders.driverGetOrders);

router.get("/getAvailableDrivers", Orders.getAvailableDrivers);
router.put("/insertTrue/:id", Orders.insertTrue);
router.put("/insertFalse/:id", Orders.insertFalse);

router.put("/insertConfirm/:id", Orders.insertConfirm);
router.put("/insertReject/:id", Orders.insertReject);
router.put("/insertComplete/:id", Orders.insertComplete);

router.get("/:id", Orders.getOneOrder);


module.exports = router;

const router = require("express").Router();
const Orders = require("../controllers/ordersController");

//Admin
router.post("/createOrders", Orders.createOrders);
router.get("/getOrders", Orders.getOrders);
router.get("/:id", Orders.getOneOrder);
router.put("/updateOrders/:id", Orders.updateOrders);
router.delete("/deleteOrders/:id", Orders.deleteOrders);

router.get("/viewPendingOrders", Orders.viewPendingOrders);
router.get("/viewConfirmOrders", Orders.viewConfirmOrders);
router.get("/viewCompleteOrders", Orders.viewCompleteOrders);
router.get("/viewRejectOrders", Orders.viewRejectOrders);
router.get("/viewOrdersByResponse/:response", Orders.viewOrdersByResponse);

router.get("/seeAvailableDrivers", Orders.seeAvailableDrivers);
router.put("/updateAvailableState/:id", Orders.updateAvailableState);

router.put("/insertTrue/:id", Orders.insertTrue);
router.put("/insertFalse/:id", Orders.insertFalse);

router.put("/insertConfirm/:id", Orders.insertConfirm);
router.put("/insertReject/:id", Orders.insertReject);
router.put("/insertComplete/:id", Orders.insertComplete);

router.put("/updateDriverResponse/:id", Orders.updateDriverResponse);

//Customer
router.post("/customerCreateOrders/:customer_id", Orders.customerCreateOrders);
router.get("/customerGetOrders/:id", Orders.customerGetOrders);
router.put("/customerUpdateOrders/:id", Orders.customerUpdateOrders);
router.delete("/customerDeleteOrders/:id", Orders.customerDeleteOrders);

module.exports = router;

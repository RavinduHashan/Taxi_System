const router = require('express').Router()
const Orders = require('../controllers/ordersController')

//Admin
router.post('/createOrders', Orders.createOrders)
router.get('/getOrders', Orders.getOrders)
router.get('/getOneOrder/:id', Orders.getOneOrder)
router.put('/updateOrders/:id', Orders.updateOrders)
router.delete('/deleteOrders/:id', Orders.deleteOrders)

router.get('/viewPendingOrders', Orders.viewPendingOrders)
router.get('/viewConfirmOrders', Orders.viewConfirmOrders)
router.get('/viewCompleteOrders', Orders.viewCompleteOrders)
router.get('/viewRejectOrders', Orders.viewRejectOrders)

router.get('/seeAvailableDrivers', Orders.seeAvailableDrivers)
router.put('/updateAvailableState/:id', Orders.updateAvailableState)

router.put('/updateDriverResponse/:id', Orders.updateDriverResponse)

//Customer
router.post('/customerCreateOrders/:customer_id', Orders.customerCreateOrders)
router.get('/customerGetOrders/:id', Orders.customerGetOrders)
router.put('/customerUpdateOrders/:id', Orders.customerUpdateOrders)
router.delete('/customerDeleteOrders/:id', Orders.customerDeleteOrders)

module.exports = router
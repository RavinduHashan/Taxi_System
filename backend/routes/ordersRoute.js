const router = require('express').Router()
const Orders = require('../controllers/ordersController')

router.post('/createOrders', Orders.createOrders)
router.get('/getOrders', Orders.getOrders)
router.get('/getOneOrder/:order_id', Orders.getOneOrder)
router.put('/updateOrders/:order_id', Orders.updateOrders)
router.delete('/deleteOrders/:order_id', Orders.deleteOrders)

router.post('/createOnlineState', Orders.createOnlineState)
router.post('/removeOnlineState', Orders.removeOnlineState)
router.get('/seeOnlineDrivers', Orders.seeOnlineDrivers)
router.get('/driverSeeOrders', Orders.driverSeeOrders)
//router.put('/driverResponseOrder', Orders.driverResponseOrder)
router.get('/userSeeOrders', Orders.userSeeOrders)
//router.get('/deleteOrders', Orders.deleteOrders)

module.exports = router
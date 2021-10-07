const router = require('express').Router()
const Orders = require('../controllers/ordersController')

router.post('/createOrders', Orders.createOrders)
router.get('/getOrders', Orders.getOrders)
router.get('/getOneOrder/:order_id', Orders.getOneOrder)
router.put('/updateOrders/:order_id', Orders.updateOrders)
router.delete('/deleteOrders/:order_id', Orders.deleteOrders)

router.get('/viewPendingOrders', Orders.viewPendingOrders)
router.get('/viewConfirmOrders', Orders.viewConfirmOrders)
router.get('/viewCompleteOrders', Orders.viewCompleteOrders)
router.get('/viewRejectOrders', Orders.viewRejectOrders)

router.post('/createOnlineState', Orders.createOnlineState)
router.get('/seeOnlineDrivers', Orders.seeOnlineDrivers)
router.delete('/removeOnlineState/:online_driver_id', Orders.removeOnlineState)
router.put('/updateOnlineState/:online_driver_id', Orders.updateOnlineState)



module.exports = router
const router = require('express').Router()
const Drivers = require('../controllers/driversController')
const validInfo = require("../middleware/driversValidInfo")
const authorization = require("../middleware/driversAuthorization")

router.post('/register',validInfo, Drivers.registerDrivers)
router.post('/login', validInfo, Drivers.loginDrivers)
router.get('/is-verify',authorization, Drivers.verify)
router.get('/dashboard',authorization, Drivers.dashboard)
router.get('/get', Drivers.getDrivers)
router.put('/update/:driver_id', Drivers.updateDrivers)
router.delete('/delete/:driver_id', Drivers.deleteDrivers)
router.get('/getOneDrvier/:driver_id', Drivers.getOneDriver)

module.exports = router
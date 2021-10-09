const router = require('express').Router()
const Drivers = require('../controllers/driversController')
const validInfo = require("../middleware/driversValidInfo")
const authorization = require("../middleware/driversAuthorization")

router.post('/register',validInfo, Drivers.registerDrivers)
router.post('/login', validInfo, Drivers.loginDrivers)
router.get('/is-verify',authorization, Drivers.verify)
router.get('/dashboard',authorization, Drivers.dashboard)
router.get('/get', Drivers.getDrivers)
router.put('/update/:id', Drivers.updateDrivers)
router.delete('/delete/:id', Drivers.deleteDrivers)
router.get('/getOneDriver/:id', Drivers.getOneDriver)

module.exports = router
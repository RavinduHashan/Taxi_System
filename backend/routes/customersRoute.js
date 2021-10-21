const router = require('express').Router()
const Customers = require('../controllers/customersController')
const validInfo = require("../middleware/customersValidInfo")
const authorization = require("../middleware/customersAuthorization")


router.post('/register',validInfo, Customers.registerCustomers)
router.post('/login', validInfo, Customers.loginCustomers)
router.get('/is-verify',authorization, Customers.verify)
router.get('/dashboard',authorization, Customers.dashboard)
router.get('/get', Customers.getCustomers)
router.put('/update/:id', Customers.updateCustomers)
router.delete('/delete/:id', Customers.deleteCustomers)
router.get('/:id', Customers.getOneCustomer)

module.exports = router
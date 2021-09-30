const router = require('express').Router()
const Users = require('../controllers/usersController')
const validInfo = require("../middleware/usersValidInfo")
const authorization = require("../middleware/usersAuthorization")


router.post('/register',validInfo, Users.registerUsers)
router.post('/login', validInfo, Users.loginUsers)
router.get('/is-verify',authorization, Users.verify)
router.get('/dashboard',authorization, Users.dashboard)
router.get('/get', Users.getUsers)
router.put('/update/:user_id', Users.updateUsers)
router.delete('/delete/:user_id', Users.deleteUsers)
router.get('/getOneUser/:user_id', Users.getOneUser)

module.exports = router
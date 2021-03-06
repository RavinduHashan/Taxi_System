const router = require("express").Router();
const Admins = require("../controllers/adminsController");
const authorization = require("../middleware/adminsAuthorization");

router.post("/register",  Admins.registerAdmins);
router.post("/login", Admins.loginAdmins);
router.get("/is-verify", authorization, Admins.verify);
router.get("/dashboard", authorization, Admins.dashboard);
router.get("/get", Admins.getAdmins);
router.put("/update/:id", Admins.updateAdmins);
router.delete("/delete/:id", Admins.deleteAdmins);
router.get("/:id", Admins.getOneAdmin);

module.exports = router;

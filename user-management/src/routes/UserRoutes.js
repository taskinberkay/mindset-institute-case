const express = require("express");
const {register, login, findById, findByParams, update} = require("../controllers/UserController");
const checkForAdminPrivileges = require("../middlewares/VerifyAdminMiddleware");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/findById/:id", checkForAdminPrivileges, findById);
router.post("/findByParams", checkForAdminPrivileges, findByParams);
router.put("/update/:id", checkForAdminPrivileges, update);


module.exports = router;
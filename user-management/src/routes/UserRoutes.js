const express = require("express");
const {register, login, findById, findByParams, update, deleteUser} = require("../controllers/UserController");
const checkForAdminPrivileges = require("../middlewares/VerifyAdminMiddleware");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/findById/:id", checkForAdminPrivileges, findById);
router.post("/findByParams", checkForAdminPrivileges, findByParams);
router.put("/update/:id", checkForAdminPrivileges, update);
router.delete("/:id", checkForAdminPrivileges, deleteUser);


module.exports = router;
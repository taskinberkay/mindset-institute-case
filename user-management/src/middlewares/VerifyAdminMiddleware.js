const jwt = require('jsonwebtoken');
require("dotenv").config();


const checkForAdminPrivileges = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({message: "No token provided!"});
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(500).send({message: "Failed to authenticate token."});
        }

        if (decoded.role === 'Admin') {
            req.headers["x-is-admin"] = true;
        } else {
            req.headers["x-is-admin"] = false;
            req.headers["x-user-id"] = decoded.userId;
        }
        next();
    });
};


module.exports = checkForAdminPrivileges;
const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user");

router.post('/users/register', (req, res) => UserController.register(req, res));

module.exports = router;
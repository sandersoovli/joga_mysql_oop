const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user");

router.post('/users/register', (req, res) => UserController.register(req, res));

// LOGIN
router.post('/users/login', (req, res) => UserController.login(req, res));

module.exports = router;
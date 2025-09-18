const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res) => UserController.register(req, res));

router.get('/login', (req, res) => res.render('login'));
router.post('/login', (req, res) => UserController.login(req, res));

router.get('/logout', (req, res) => UserController.logout(req, res));

module.exports = router;

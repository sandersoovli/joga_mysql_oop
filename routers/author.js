const express = require('express');
const router = express.Router();

const AuthorControllerClass = require('../controllers/author');
const AuthorController = new AuthorControllerClass();

// GET /author/:author_id → render autor ja tema artiklid
router.get('/:author_id', (req, res) => AuthorController.renderAuthor(req, res));

module.exports = router;

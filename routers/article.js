const express = require('express');
const router = express.Router();
const  ArticleControllerClass = require('../controllers/article');

const ArticleController = new ArticleControllerClass();

// GET /articles - get all articles
router.get('/', (req, res) => ArticleController.getAllArticles(req, res));

// GET /article by slug
router.get('/article/:slug', (req, res) =>{
    ArticleController.getArticleBySlug(req, res);
});

module.exports = router;
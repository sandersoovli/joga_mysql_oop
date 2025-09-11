const express = require('express');
const router = express.Router();
const  ArticleControllerClass = require('../controllers/article');

const ArticleController = new ArticleControllerClass();

// GET /articles - get all articles
router.get('/', (req, res) => ArticleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res) => ArticleController.getArticleBySlug(req, res));

router.post('/article/create', (req, res) => ArticleController.createNewArticle(req, res));

// GET /article by slug
router.get('/article/:slug', (req, res) =>{
    ArticleController.getArticleBySlug(req, res);
});

// uus route artikli muutmiseks
router.patch('/article/edit/:id', (req, res) => {
    ArticleController.updateArticle(req, res);
});

module.exports = router;
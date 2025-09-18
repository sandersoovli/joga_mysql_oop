const express = require('express');
const router = express.Router();
const ArticleControllerClass = require('../controllers/article');
const ArticleController = new ArticleControllerClass();

// Root URL – suunab artiklite lehele
router.get('/', (req, res) => {
    ArticleController.getAllArticles(req, res)
});
router.get('/articles', (req, res) => ArticleController.renderAllArticles(req, res));


// ===== API JSON =====
router.get('/api/articles', (req, res) => ArticleController.getAllArticles(req, res));
router.get('/api/article/:slug', (req, res) => ArticleController.getArticleBySlug(req, res));

// ===== Brauseri Handlebars vaated =====
//router.get('/', (req, res) => ArticleController.renderAllArticles(req, res));        // homepage
router.get('/article/:slug', (req, res) => ArticleController.renderArticleBySlug(req, res));

// ===== CRUD API POST/PATCH/DELETE =====
router.post('/article/create', (req, res) => ArticleController.createNewArticle(req, res));
router.patch('/article/edit/:id', (req, res) => ArticleController.updateArticle(req, res));
router.delete('/article/delete/:id', (req, res) => ArticleController.deleteArticle(req, res));

module.exports = router;

const experss = require('express');
const router = experss.Router();

const ArticleControllerClass = require('../controllers/author');
const AuthorController = new ArticleControllerClass();

// GET /articles - get all articles
router.get('/author/:author_id', (req, res) =>{
    AuthorController.getAllAuthorbyId(req, res)
});



module.exports = router;
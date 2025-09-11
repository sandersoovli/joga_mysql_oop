const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class ArticleController {
    constructor() {
        const articles = [];
    }
    
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
            res.status(200).json({articles: articles});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async getArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            res.status(200).json({article: article});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async createNewArticle(req, res) {
        const newArticle ={
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        };
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({
            message: 'created article with id ${articleId}  ', 
            article: {id: articleId, ...newArticle } 
        }); 

    } 
}

module.exports = ArticleController
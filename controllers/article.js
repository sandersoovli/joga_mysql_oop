const articleDbModel = require('../models/article');
const articleModel = new articleDbModel();

class ArticleController {
    constructor() {
        const articles = [];
    }
    
    // ===== API JSON meetodid =====
    async getAllArticles(req, res) {
        try {
            const articles = await articleModel.findAll();
          //  res.status(200).json({ articles });
          res.render('articles', { articles: articles }); // kõik artiklid
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            res.status(200).json({ article });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        };
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({
            message: `created article with id ${articleId}`,
            article: { id: articleId, ...newArticle }
        });
    }

    async updateArticle(req, res) {
        try {
            const articleId = req.params.id;
            const updatedData = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0, 19).replace('T', ' '),
                author_id: req.body.author_id
            };

            const affectedRows = await articleModel.update(articleId, updatedData);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json({ message: 'Article updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteArticle(req, res) {
        try {
            const articleId = req.params.id;
            const affectedRows = await articleModel.delete(articleId);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Article not found' });
            }

            res.status(200).json({ message: 'Article deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== Handlebars render meetodid =====
    async renderAllArticles(req, res) {
    try {
        const articles = await articleModel.findAll();
        res.render('articles', { layout: 'main', articles }); // kõik artiklid
    } catch (error) {
        res.status(500).send(error.message);
    }
}


    async renderArticleBySlug(req, res) {
        try {
            const article = await articleModel.findOne(req.params.slug);
            if (!article) return res.status(404).send("Artiklit ei leitud");
            res.render('article', { layout: 'main', article }); // layout main.hbs
        } catch (error) {
            res.status(500).send(error.message);
        } 
    }
}

module.exports = ArticleController;

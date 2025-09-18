class AuthorController {
    async getAllAuthorbyId(req, res) {
        try {
            const author = await authorModel.findById(req.params.author_id);
            res.status(200).json({ author });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 🌟 Lisa see meetod veebilehitseja jaoks
    async renderAuthor(req, res) {
        try {
            const author = await authorModel.findById(req.params.author_id);
            const articles = await articleModel.findMany(author);
            author.articles = articles;
            res.render('author', { author }); // views/author.hbs
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = AuthorController;

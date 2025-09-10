const authorDbModel = require('../models/author');
const authorModel = new authorDbModel();


class AuthorController {
    async getAllAuthorbyId(req, res) {
        try {
            const author = await authorModel.findById(req.params.author_id);
            res.status(200).json({author: author } );
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
}

module.exports = AuthorController
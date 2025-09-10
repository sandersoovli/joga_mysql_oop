const BaseSQLModel = require('./base');

class Author extends BaseSQLModel {
    constructor() {
        super('author');
    }
    async findById(id) {
        const results = await super.findById(id);
        return results;
    }
}
module.exports = Author;
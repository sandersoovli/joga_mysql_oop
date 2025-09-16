// /oop/joga_mysql_oop/models/user.js
const BaseSQLModel = require('./base');

class User extends BaseSQLModel {
    constructor() {
        super('users'); // MySQL tabeli nimi
    }

    async findById(id) {
        return await super.findById(id);
    }

    async create(data) {
        return await super.create(data);
    }
}

module.exports = User;

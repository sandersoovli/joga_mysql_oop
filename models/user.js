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
    //kasutajanime kontroll
    async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const result = await this.executeQuery(sql, [username]);
    const rows = Array.isArray(result) ? result[0] : [];
    return rows || null;
}

}

module.exports = User;

const BaseSQLModel = require('./base');

class User extends BaseSQLModel {
    constructor() {
        super('users'); // MySQL tabeli nimi
    }

    async findById(id) {
        return await super.findById(id);
    }

    async create(data) {
        const userData = {
            username: data.username,
            password: data.password,
            email: data.email,
            role: data.role || 'user' // default roll 'user'
        };

        return await super.create(userData);
    }

    async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
        const [rows] = await this.executeQuery(sql, [username]);
        return rows || null;
    }
}

module.exports = User;

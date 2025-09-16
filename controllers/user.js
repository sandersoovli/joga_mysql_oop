const bcrypt = require('bcrypt');
const userDbModel = require('../models/user');
const userModel = new userDbModel();

class UserController {
    // olemasolev register meetod jääb alles

    // -------------- LOGIN --------------
    async login(req, res) {
        const { username, password } = req.body;

        // Kontroll, et väljad on täidetud
        if (!username || !password) {
            return res.status(400).json({ error: "Kasutajanimi ja parool on kohustuslikud" });
        }

        try {
            // Leia kasutaja andmebaasist kasutajanime järgi
            const user = await userModel.findByUsername(username);

            if (!user) {
                return res.status(404).json({ error: "Kasutajat ei leitud" });
            }

            // Võrdle sisestatud parooli krüpteeritud parooliga
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Vale parool" });
            }

            // Kui kõik klapib, loo sessioon
            req.session.user = {
                username: user.username,
                user_id: user.id
            };

            res.json({
                message: "Sisse logitud edukalt",
                user_session: req.session.user
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();

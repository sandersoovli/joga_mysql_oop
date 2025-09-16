const bcrypt = require('bcrypt');
const userDbModel = require('../models/user');
const userModel = new userDbModel();

class UserController {
    // ✅ Registreerimine
    async register(req, res) {
        const { username, password, email, role } = req.body;

        // Kontroll väljade täitmise kohta
        if (!username || !password || !email) {
            return res.status(400).json({ error: "Kõik väljad on kohustuslikud" });
        }

        try {
            // Kontroll, kas kasutaja juba olemas
            const existingUser = await userModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: "Kasutajanimi on juba võetud" });
            }

            // Parooli krüpteerimine
            const hashedPassword = await bcrypt.hash(password, 10);

            // Salvestamine andmebaasi
            const registeredId = await userModel.create({
                username,
                password: hashedPassword,
                email,
                role: role || 'user'
            });

            if (registeredId) {
                const userData = await userModel.findById(registeredId);

                req.session.user = {
                    username: userData.username,
                    user_id: userData.id,
                    role: userData.role
                };

                return res.json({
                    message: "New user is registered",
                    user_session: req.session.user
                });
            } else {
                return res.status(500).json({ error: "User registration failed" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // ✅ Login
    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Kasutajanimi ja parool on kohustuslikud" });
        }

        try {
            const user = await userModel.findByUsername(username);
            if (!user) {
                return res.status(404).json({ error: "Kasutajat ei leitud" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Vale parool" });
            }

            req.session.user = {
                username: user.username,
                user_id: user.id,
                role: user.role
            };

            return res.json({
                message: "Sisse logitud edukalt",
                user_session: req.session.user
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();

const bcrypt = require('bcrypt');
const userDbModel = require('../models/user');
const userModel = new userDbModel();

class UserController {
    async register(req, res) {
        console.log(req.body); // kontrollib, mis tuleb
        const { username, email, password } = req.body;

        // Kontroll, et kõik väljad oleks täidetud
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Kõik väljad on kohustuslikud" });
        }

        try {
            // Kontroll, kas kasutajanimi on juba olemas
            const existingUser = await userModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Kontrolli parooli pikkust
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            // Kontrolli parooli keerukust
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: 'The password must contain uppercase and lowercase letters, numbers, and symbols.' });
            }

            // Parooli krüpteerimine
            const cryptPassword = await bcrypt.hash(password, 10);
            const registeredId = await userModel.create({
                username,
                email,
                password: cryptPassword
            });

            if (registeredId) {
                const userData = await userModel.findById(registeredId);

                // Loo sessioon
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                };

                res.json({
                    message: 'New user is registered',
                    user_session: req.session.user
                });
            } else {
                res.status(500).json({ message: 'User registration failed' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();

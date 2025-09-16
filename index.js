const express = require('express');
const sessions = require('express-session');

const app = express();

// 1️⃣ Body parserid peavad olema enne routereid
app.use(express.json()); // loeb JSON body
app.use(express.urlencoded({ extended: true })); // loeb x-www-form-urlencoded

// 2️⃣ Session middleware
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// 3️⃣ Routerid
const articleRouter = require('./routers/article');
app.use('/', articleRouter);

const authorRouter = require('./routers/author');
app.use('/', authorRouter);

const userRouter = require('./routers/users');
app.use('/', userRouter);

// 4️⃣ Server käivitamine
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

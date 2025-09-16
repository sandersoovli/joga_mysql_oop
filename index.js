const express = require('express');
//const db = require('./utils/db.js');
//import articleRouter from './routers/article.js';
const sessions = require('express-session');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: false 
}));

const PORT = 3000;
app.use(express.json());

const articleRouter = require('./routers/article');
app.use('/', articleRouter);

const authorRouter = require('./routers/author');
app.use('/', authorRouter);

const userRouter = require('./routers/users');
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
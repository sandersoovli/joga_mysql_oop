const express = require('express');
const sessions = require('express-session');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Staatilised failid public kaustast (CSS, pildid, JS)
app.use(express.static('public'));

// Handlebars engine seadistamine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routerid
const articleRouter = require('./routers/article');
app.use('/', articleRouter);

const authorRouter = require('./routers/author');
app.use('/author', authorRouter);

const userRouter = require('./routers/users');
app.use('/users', userRouter);

// Server käivitamine
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

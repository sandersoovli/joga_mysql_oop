const express = require('express');
//const db = require('./utils/db.js');
//import articleRouter from './routers/article.js';

const app = express();
const PORT = 3000;
app.use(express.json());

const articleRouter = require('./routers/article');
app.use('/', articleRouter);

const authorRouter = require('./routers/author');
app.use('/', authorRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
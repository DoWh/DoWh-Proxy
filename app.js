global.__appdir = __dirname;
const express = require('express');
const router = require('./routes/index')

const app = express();
const port = 3001;

app.listen(port)


app.use('/', router);

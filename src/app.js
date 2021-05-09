const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', require('./routes/user.route'));

module.exports = app;
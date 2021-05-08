const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
app.use(compression());
app.use(cors());

app.use('/users', require('./routes/users.route'));

module.exports = app;
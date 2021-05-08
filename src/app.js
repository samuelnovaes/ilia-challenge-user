const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();
app.use(compression());
app.use(cors());

app.get('/', (req, res) => {
	res.send(`USER ${process.env.NODE_ENV}`);
});

module.exports = app;
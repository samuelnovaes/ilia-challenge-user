require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3002;

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	authSource: 'admin'
});

const db = mongoose.connection;

db.once('open', () => {
	app.listen(port, () => {
		console.log('User service running on port', port);
	});
});

db.on('error', (err) => {
	console.error(err.stack);
});
require('dotenv').config();

const mongoose = require('mongoose');
const userController = require('./controllers/user.controller');
const app = require('./app');

const port = process.env.PORT || 3002;

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	authSource: 'admin'
});

const db = mongoose.connection;

db.once('open', async () => {
	if(process.env.NODE_ENV == 'development') {
		await userController.createMockUsers();
	}
	app.listen(port, () => {
		console.log('User service running on port', port);
	});
});

db.on('error', (err) => {
	console.error(err.stack);
});
require('dotenv').config({
	path: '.env.test'
});

const mongoose = require('mongoose');

const userControllerTests = require('./controllers/user.controller.test');
const userRouteTests = require('./routes/user.route.test');

const setupMongooseConnection = () => {
	beforeAll((done) => {
		//Start mongoose connection
		mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			authSource: 'admin'
		});
		mongoose.connection.once('open', done);
	});

	afterAll(async () => {
		//Drop all collections
		const collections = await mongoose.connection.db.collections();
		for(const collection of collections) {
			await collection.drop();
		}
	
		//Disconnect the database
		mongoose.connection.close();
	});
};

describe('User controller', () => {
	setupMongooseConnection();
	userControllerTests();
});

describe('User route', () => {
	setupMongooseConnection();
	userRouteTests();
});
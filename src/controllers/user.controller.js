const User = require('../models/user.model');
const CustomError = require('../utils/customError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

class UserController {

	async register(body) {
		//Validate user fields
		try {
			await User.joiValidate(body);
		}
		catch (error) {
			throw new CustomError(error.message, 400);
		}

		//Verify if user is already registered
		const userRegistered = await User.findOne({
			username: body.username
		});
		if (userRegistered) {
			throw new CustomError('User already registered', 409);
		}

		//then register an return the user
		body.password = await bcrypt.hash(body.password, 8);
		const user = await (await User.create(body)).toObject();
		delete user.password;
		return user;
	}

	async updateUser(_id, body) {
		//Find the user to be updated
		const user = await User.findOne({
			_id
		});
		if (!user) {
			throw new CustomError('User not found', 404);
		}

		//Validate and update fields
		try {
			if (body.email != null) {
				await User.joiValidate(body, 'email');
				user.email = body.email;
			}
			if (body.firstName != null) {
				await User.joiValidate(body, 'firstName');
				user.firstName = body.firstName;
			}
			if (body.lastName != null) {
				await User.joiValidate(body, 'lastName');
				user.lastName = body.lastName;
			}
			if (body.password != null) {
				await User.joiValidate(body, 'password');
				user.password = await bcrypt.hash(body.password, 8);
			}
		}
		catch (err) {
			throw new CustomError(err.message, 400);
		}

		//Save user
		const updatedUser = await (await user.save()).toObject();
		delete updatedUser.password;
		return updatedUser;
	}

	async authenticate({ username, password }) {
		//Get the user with the given username
		const user = await User.findOne({
			username
		});
		if (!user) {
			throw new CustomError('User not found! Try using another usename.', 401);
		}

		//Verify the given password
		if (!(await bcrypt.compare(password, user.password))) {
			throw new CustomError('Wrong password', 401);
		}

		//Generate and return token
		const token = await promisify(jwt.sign)({ _id: user._id }, process.env.PRIVATE_KEY);

		return { token };
	}

	async getUserInfo(_id) {
		const user = await User.findOne({
			_id
		});
		if (!user) {
			throw new CustomError('User not found', 404);
		}
		return user;
	}

	async createMockUsers() {
		try {
			console.log('Creating mock users');
			await this.register({
				username: 'usertesta',
				email: 'user.test.a@gmail.com',
				firstName: 'User',
				lastName: 'A',
				password: 'iliachallenge'
			});
			await this.register({
				username: 'usertestb',
				email: 'user.test.b@gmail.com',
				firstName: 'User',
				lastName: 'B',
				password: 'iliachallenge'
			});
		}
		catch(error) {
			console.log('Mock users already registered');
		}
	}

}

module.exports = new UserController();
const CustomError = require('../utils/customError');
const User = require('../models/user.model');
const parseError = require('../utils/parseError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
	try {
		const authorization = req.get('Authorization');
		if (!authorization) {
			throw new CustomError('The access token is required', 401);
		}

		const token = authorization.replace(/^bearer (.*)$/i, '$1');
		let payload = null;
		try {
			payload = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
		}
		catch (error) {
			throw new CustomError('Invalid access token', 401);
		}

		const user = await User.findOne({
			_id: payload._id
		});
		if (!user) {
			throw new CustomError('User not found');
		}
		
		req.userId = payload._id;

		next();
	}
	catch (error) {
		parseError(error, res);
	}
};
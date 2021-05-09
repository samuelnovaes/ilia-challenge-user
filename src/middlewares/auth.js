const CustomError = require('../utils/customError');
const parseError = require('../utils/parseError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
	try {
		const authorization = req.get('Authorization');
		if(!authorization) {
			throw new CustomError('The access token is required', 401);
		}
		const token = authorization.replace(/^bearer (.*)$/i, '$1');
		try {
			const payload = await promisify(jwt.verify)(token, process.env.PRIVATE_KEY);
			req.userId = payload._id;
			next();
		}
		catch(error) {
			throw new CustomError('Invalid access token');
		}
	}
	catch(error) {
		parseError(error, res);
	}
};
const parseError = require('../utils/parseError');
const userController = require('../controllers/user.controller');

module.exports = async (req, res, next) => {
	try {
		const authorization = req.get('Authorization');
		req.userId = await userController.validateToken(authorization);
		next();
	}
	catch(error) {
		parseError(error, res);
	}
};
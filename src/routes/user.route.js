const router = require('express').Router();
const parseError = require('../utils/parseError');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

//Register an user
router.post('/', async (req, res) => {
	try {
		const result = await userController.register(req.body);
		res.json(result);
	}
	catch (error) {
		parseError(error, res);
	}
});

//Update the user profile
router.put('/', auth, async (req, res) => {
	try {
		const result = await userController.updateUser(req.userId, req.body);
		res.json(result);
	}
	catch (error) {
		parseError(error, res);
	}
});

//Get the logged user info
router.get('/', auth, async (req, res) => {
	try {
		const result = await userController.getUserInfo(req.userId);
		res.json(result);
	}
	catch (error) {
		parseError(error, res);
	}
});

router.post('/auth', async (req, res) => {
	try {
		const result = await userController.authenticate(req.body);
		res.json(result);
	}
	catch (error) {
		parseError(error, res);
	}
});

module.exports = router;
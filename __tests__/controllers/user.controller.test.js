const userController = require('../../src/controllers/user.controller');
const { isValidObjectId } = require('mongoose');

module.exports = () => {
	let user = null;

	it('When registering an user, it should return a valid user object with a valid ID', async () => {
		user = await userController.register({
			username: 'samuelnovaes',
			email: 'samuel.novaes.96@gmail.com',
			firstName: 'Samuel',
			lastName: 'Sena',
			password: 'iliachallenge'
		});
		expect(isValidObjectId(user._id)).toBe(true);
	});

	it('When updating an user, it should return the updated user', async () => {
		const updatedUser = await userController.updateUser(user._id, {
			email: 'foo.bar@gmail.com',
			firstName: 'Foo',
			lastName: 'Bar',
			password: 'mynewpassword'
		});
		expect(isValidObjectId(updatedUser._id)).toBe(true);
	});

	it('When authenticating the user, an access token must be returned', async () => {
		const authResult = await userController.authenticate({
			username: 'samuelnovaes',
			password: 'mynewpassword'
		});
		expect(authResult.token).toBeTruthy();
	});

	it('The "getUserInfo" method must return a valid user with the given ID', async () => {
		const userInfo = await userController.getUserInfo(user._id);
		expect(isValidObjectId(userInfo._id)).toBe(true);
		expect(userInfo.firstName).toBe('Foo');
	});
};
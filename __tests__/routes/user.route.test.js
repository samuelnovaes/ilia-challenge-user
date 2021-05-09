const request = require('supertest');
const app = require('../../src/app');
const { isValidObjectId } = require('mongoose');

module.exports = () => {
	let token = null;

	it('When registering an user, it should return a valid user object with a valid ID', (done) => {
		request(app)
			.post('/user')
			.send({
				username: 'samuelnovaes',
				email: 'samuel.novaes.96@gmail.com',
				firstName: 'Samuel',
				lastName: 'Sena',
				password: 'iliachallenge'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).toBeFalsy();
				expect(isValidObjectId(res.body._id)).toBe(true);
				done();
			});
	});

	it('When authenticating the user, an access token must be returned', (done) => {
		request(app)
			.post('/user/auth')
			.send({
				username: 'samuelnovaes',
				password: 'iliachallenge'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).toBeFalsy();
				expect(res.body.token).toBeTruthy();
				token = res.body.token;
				done();
			});
	});

	it('When updating an user, it should return the updated user', (done) => {
		request(app)
			.put('/user')
			.set('Authorization', token)
			.send({
				email: 'foo.bar@gmail.com',
				firstName: 'Foo',
				lastName: 'Bar',
				password: 'mynewpassword'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).toBeFalsy();
				expect(isValidObjectId(res.body._id)).toBe(true);
				done();
			});
	});

	it('The "getUserInfo" method must return a valid user with the given ID', (done) => {
		request(app)
			.get('/user')
			.set('Authorization', token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				expect(err).toBeFalsy();
				expect(isValidObjectId(res.body._id)).toBe(true);
				expect(res.body.firstName).toBe('Foo');
				done();
			});
	});
};
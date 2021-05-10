const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	firstName: String,
	lastName: String,
	password: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

userSchema.statics.joiValidate = (body, field = null) => {
	const keys = {
		username: Joi.string().alphanum().min(6).required().label('Username'),
		email: Joi.string().email().required().label('Email'),
		firstName: Joi.string().alphanum().required().label('First name'),
		lastName: Joi.string().alphanum().required().label('Last name'),
		password: Joi.string().min(6).required().label('Password')
	};
	const schema = Joi.object().keys(field ? { [field]: keys[field] } : keys);
	return schema.validateAsync(body, {
		allowUnknown: true
	});
};

module.exports = mongoose.model('user', userSchema);
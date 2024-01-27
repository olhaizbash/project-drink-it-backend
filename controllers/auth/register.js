const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

const { User } = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');

const { BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationToken = randomUUID();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: 'Verification email',
		html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
	};
	await sendEmail(verifyEmail);
	res.status(201).json({ user: { email: newUser.email } });
};

module.exports = register;

const User = require('../db/Model/User');
const jwt = require('jsonwebtoken');
module.exports = {
	SignIn: async (req, res) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email ve şifre gereklidir.' });
		}

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
			}

			const isPasswordValid = await user.comparePassword(password);
			if (!isPasswordValid) {
				return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
			}

			const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '8h' });

			return res.status(200).json({
				token,
				user: {
					name: user.name,
					surname: user.surname,
					email: user.email,
				},
			});
		} catch (error) {
			console.error('SignIn error:', error);
			return res.status(500).json({ message: 'Bir hata oluştu.', error: error.message });
		}
	},

	listUser: async (req, res) => {
		try {
			const user = await User.find().sort({ date: -1 });
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	SignUp: async (req, resp) => {
		const { name, surname, email, password } = req.body;
		if (!email || !password || !name || !surname) {
			return resp.status(406).json();
		}
		try {
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				return resp.status(409).json();
			}

			const user = new User({ name, surname, email, password, date: Date.now() });
			await user.save();

			return resp.status(201).json();
		} catch (error) {
			return resp.status(500).json({ message: 'Hata ', error: error.message });
		}
	},
};

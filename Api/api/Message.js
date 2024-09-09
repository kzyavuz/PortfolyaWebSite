const Message = require('../db/Model/Message');
const validator = require('validator');

const validateInput = (data) => {
	const errors = [];

	if (!validator.isAlpha(data.fullName.replace(/\s/g, ''))) {
		errors.push('Özel karekter kullanmadan isim giriniz');
	}

	if (!validator.isAlpha(data.title.replace(/\s/g, ''))) {
		errors.push('Özel karekter kullanmadan isim giriniz');
	}

	if (!validator.isEmail(data.email)) {
		errors.push('email addresi bos olamaz');
	}

	if (validator.isEmpty(data.message) || data.message.length < 10 || data.message.length > 300) {
		errors.push('mesaj 10 ile 300 karakter arasında olmalıdır');
	}

	return errors;
};

module.exports = {
	addMessage: async (req, res) => {
		const { fullName, email, message, title } = req.body;

		const errors = validateInput({ fullName, email, message, title });
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		try {
			const newMessage = new Message({ title, fullName, email, message, status: false, date: Date.now() });
			await newMessage.save();
			res.status(200).json(newMessage);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	readMessage: async (req, res) => {
		const { _id } = req.body;
		try {
			const message = await Message.findById(_id);
			if (!message) {
				return res.status(404).json();
			}
			await Message.findByIdAndUpdate(_id, {
				status: true,
			});
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	datailsMessage: async (req, res) => {
		try {
			const { _id } = req.body;
			const messageDetails = await Message.findById(_id);

			if (!messageDetails) {
				res.status(404).json();
			}

			res.status(200).json(messageDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	listMessage: async (req, res) => {
		try {
			const about = await Message.find({ status: true }).sort({ date: -1 });
			res.status(200).json(about);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	newListMessage: async (req, res) => {
		try {
			const about = await Message.find({ status: false }).sort({ date: -1 });
			res.status(200).json(about);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	countMessage: async (req, res) => {
		try {
			const count = await Message.countDocuments({ status: false });
			res.status(200).json({ count });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

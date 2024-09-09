const Education = require('../db/Model/Education');

module.exports = {
	// Proje verisi ekler.
	addEducation: async (req, res) => {
		const { title, description, date } = req.body;

		if (!title || !description || !date) {
			return res.status(406).json();
		}

		try {
			const newEducation = new Education({
				title,
				description,
				date,
			});
			await newEducation.save();
			res.status(200).json(newEducation);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm hakkımda verilerini gösteriri.
	listEducation: async (req, res) => {
		try {
			const data = await Education.find().sort({ _id: -1 });
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verilerini günceller.
	updateEducation: async (req, res) => {
		const { _id, title, description, date } = req.body;

		if (!title || !description || !date) {
			return res.status(406).json();
		}

		try {
			const education = await Education.findById(_id);
			if (!education) {
				return res.status(404).json();
			}
			const updatedEducation = await Education.findByIdAndUpdate(_id, {
				title,
				description,
				date,
			});

			if (!education) {
				return res.status(404).json();
			}
			res.status(200).json(updatedEducation);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteEducation: async (req, res) => {
		try {
			const { _id } = req.body;
			const educationID = await Education.findById(_id);

			if (!educationID) {
				res.status(404).json();
			}

			await Education.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsEducation: async (req, res) => {
		try {
			const { _id } = req.body;
			const educationDetails = await Education.findById(_id);

			if (!educationDetails) {
				res.status(404).json();
			}

			res.status(200).json(educationDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

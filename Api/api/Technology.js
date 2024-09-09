const Technology = require('../db/Model/Technology');

module.exports = {
	// Proje verisi ekler.
	addTechnology: async (req, res) => {
		const { name } = req.body;

		if (!name) {
			return res.status(406).json();
		}

		try {
			const newTechnology = new Technology({
				name,
			});
			await newTechnology.save();
			res.status(200).json(newTechnology);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm hakkımda verilerini gösteriri.
	listTechnology: async (req, res) => {
		try {
			const data = await Technology.find();
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verilerini günceller.
	updateTechnology: async (req, res) => {
		const { name, _id } = req.body;

		if (!name) {
			return res.status(406).json();
		}

		try {
			const tecchnelogy = await Technology.findById(_id);
			if (!tecchnelogy) {
				return res.status(404).json();
			}
			const updatedTechnology = await Technology.findByIdAndUpdate(_id, {
				name,
			});
			if (!tecchnelogy) {
				return res.status(404).json();
			}
			res.status(200).json(updatedTechnology);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteTechnology: async (req, res) => {
		try {
			const { _id } = req.body;
			const tecchnelogyID = await Technology.findById(_id);

			if (!tecchnelogyID) {
				res.status(404).json();
			}

			await Technology.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsTechnology: async (req, res) => {
		try {
			const { _id } = req.body;
			const tecchnelogyDetails = await Technology.findById(_id);

			if (!tecchnelogyDetails) {
				res.status(404).json();
			}

			res.status(200).json(tecchnelogyDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

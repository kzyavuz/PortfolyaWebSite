const About = require('../db/Model/About');

module.exports = {
	// Son eklenen veriyi göster.
	getOneAbout: async (req, res) => {
		try {
			const about = await About.findOne().sort({ _id: -1 });
			res.status(200).json(about);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verisi ekler.
	addAbout: async (req, res) => {
		const { title, description, profilePicture } = req.body;

		if (!title || !description) {
			return res.status(406).json();
		}

		try {
			const newAbout = new About({
				title,
				description,
				profilePicture,
			});
			await newAbout.save();
			res.status(200).json(newAbout);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm hakkımda verilerini gösteriri.
	listAbout: async (req, res) => {
		try {
			const about = await About.find().sort({ _id: -1 });
			res.status(200).json(about);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verilerini günceller.
	updateAbout: async (req, res) => {
		const { _id, title, description, profilePicture } = req.body;
		try {
			const about = await About.findById(_id);
			if (!about) {
				return res.status(404).json();
			}
			const updatedAbout = await About.findByIdAndUpdate(_id, {
				title: title || about.title,
				description: description || about.description,
				profilePicture: profilePicture || about.profilePicture,
			});
			if (!about) {
				return res.status(404).json();
			}
			res.status(200).json(updatedAbout);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteAbout: async (req, res) => {
		try {
			const { _id } = req.body;
			const aboutID = await About.findById(_id);

			if (!aboutID) {
				res.status(404).json();
			}

			await About.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsAbout: async (req, res) => {
		try {
			const { _id } = req.body;
			const aboutDetails = await About.findById(_id);

			if (!aboutDetails) {
				res.status(404).json();
			}

			res.status(200).json(aboutDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

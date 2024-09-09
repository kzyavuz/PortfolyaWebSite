const Home = require('../db/Model/Home');

module.exports = {
	// Son eklenen veriyi göster.
	getOneHome: async (req, res) => {
		try {
			const home = await Home.findOne().sort({ _id: -1 });
			res.status(200).json(home);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// home verisi ekler.
	addHome: async (req, res) => {
		const { linkedin, github, instagram, name, mail, introduction, whatsappNumber, animationText } = req.body;

		if (!name || !mail || !introduction || !whatsappNumber || !animationText || github) {
			return res.status(406).json();
		}

		try {
			const newHome = new Home({
				name,
				mail,
				introduction,
				whatsappNumber,
				animationText,
				linkedin,
				github,
				instagram,
			});
			await newHome.save();
			res.status(200).json(newHome);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm hakkımda verilerini gösteriri.
	listHome: async (req, res) => {
		try {
			const home = await Home.find().sort({ _id: -1 });
			res.status(200).json(home);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verilerini günceller.
	updateHome: async (req, res) => {
		const { _id, name, mail, introduction, whatsappNumber, animationText, linkedin, github, instagram } = req.body;

		if (!name || !mail || !introduction || !whatsappNumber || !animationText || github) {
			return res.status(406).json();
		}

		try {
			const home = await Home.findById(_id);
			if (!home) {
				return res.status(404).json();
			}
			const updatedHome = await Home.findByIdAndUpdate(_id, {
				name: name || home.name,
				mail: mail || home.mail,
				introduction: introduction || home.introduction,
				whatsappNumber: whatsappNumber || home.whatsappNumber,
				animationText: animationText || home.animationText,
				linkedin: linkedin || home.linkedin,
				github: github || home.github,
				instagram: instagram || home.instagram,
			});
			res.status(200).json(updatedHome);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteHome: async (req, res) => {
		try {
			const { _id } = req.body;
			const homeID = await Home.findById(_id);

			if (!homeID) {
				res.status(404).json();
			}

			await Home.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsHome: async (req, res) => {
		try {
			const { _id } = req.body;
			const homeDetails = await Home.findById(_id);

			if (!homeDetails) {
				res.status(404).json();
			}

			res.status(200).json(homeDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

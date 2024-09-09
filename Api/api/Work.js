const Work = require('../db/Model/Work');

module.exports = {
	// İş verisi ekler.
	addWork: async (req, res) => {
		const { title, description, name, position, date } = req.body;

		if (!title || !description || !name || !position || !date) {
			return res.status(406).json();
		}

		try {
			const newWork = new Work({
				title,
				description,
				name,
				position,
				date,
			});
			await newWork.save();
			res.status(200).json(newWork);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm iş verilerini gösteriri.
	listWork: async (req, res) => {
		try {
			const work = await Work.find();
			res.status(200).json(work);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// İş verilerini günceller.
	updateWork: async (req, res) => {
		const { _id, title, description, name, position, date } = req.body;
		try {
			const work = await Work.findById(_id);

			if (!work) {
				return res.status(404).json();
			}
			const updatedWork = await Work.findByIdAndUpdate(_id, {
				title: title || work.title,
				description: description || work.description,
				name: name || work.name,
				position: position || work.position,
				date: date || work.date,
			});
			res.status(200).json(updatedWork);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//İş verisini siler.
	deleteWork: async (req, res) => {
		try {
			const { _id } = req.body;
			const workID = await Work.findById(_id);

			if (!workID) {
				res.status(404).json();
			}

			await Work.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsWork: async (req, res) => {
		try {
			const { _id } = req.body;
			const workDetails = await Work.findById(_id);

			if (!workDetails) {
				res.status(404).json();
			}

			res.status(200).json(workDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

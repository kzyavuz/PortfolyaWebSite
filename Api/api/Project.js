const Project = require('../db/Model/Project');

module.exports = {
	// Proje verisi ekler.
	addProject: async (req, res) => {
		const { title, projectImage, tech1, tech2, tech3, tech4, link, position } = req.body;

		if (!title || !tech1 || !tech2 || !tech3 || !link || !position) {
			return res.status(406).json();
		}

		try {
			const newProject = new Project({
				title,
				projectImage,
				tech1,
				tech2,
				tech3,
				tech4,
				link,
				position,
			});
			await newProject.save();
			res.status(200).json(newProject);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Tüm hakkımda verilerini gösteriri.
	listProject: async (req, res) => {
		try {
			const data = await Project.find();
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	// Hakkımda verilerini günceller.
	updateProject: async (req, res) => {
		const { title, projectImage, tech1, tech2, tech3, tech4, link, position, _id } = req.body;

		if (!title || !tech1 || !tech2 || !tech3 || !link || !position) {
			return res.status(406).json();
		}

		try {
			const project = await Project.findById(_id);
			if (!project) {
				return res.status(404).json();
			}
			const updatedProject = await Project.findByIdAndUpdate(_id, {
				title,
				projectImage: projectImage || project.projectImage,
				tech1,
				tech2,
				tech3,
				tech4: tech4 || project.tech4,
				link,
				position,
			});
			if (!project) {
				return res.status(404).json();
			}
			res.status(200).json(updatedProject);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Hakkımda verisini siler.
	deleteProject: async (req, res) => {
		try {
			const { _id } = req.body;
			const projectID = await Project.findById(_id);

			if (!projectID) {
				res.status(404).json();
			}

			await Project.findByIdAndDelete(_id);
			res.status(200).json();
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	datailsProject: async (req, res) => {
		try {
			const { _id } = req.body;
			const projectDetails = await Project.findById(_id);

			if (!projectDetails) {
				res.status(404).json();
			}

			res.status(200).json(projectDetails);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

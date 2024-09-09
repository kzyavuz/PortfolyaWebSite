const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	position: String,
	projectImage: String,
	tech1: String,
	tech2: String,
	tech3: String,
	tech4: String,
	title: String,
	link: String,
});

module.exports = mongoose.model('project', projectSchema);

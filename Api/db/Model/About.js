const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
	title: String,
	description: String,
	profilePicture: String,
});

module.exports = mongoose.model('about', aboutSchema);

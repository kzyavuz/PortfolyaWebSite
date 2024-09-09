const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: String,
});

module.exports = mongoose.model('education', educationSchema);

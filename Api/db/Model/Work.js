const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
	name: String,
	position: String,
	title: String,
	description: String,
	date: Date,
});

module.exports = mongoose.model('work', workSchema);

const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
	name: String,
	mail: String,
	introduction: String,
	whatsappNumber: String,
	animationText: String,
	linkedin: String,
	github: String,
	instagram: String,
});

module.exports = mongoose.model('home', homeSchema);

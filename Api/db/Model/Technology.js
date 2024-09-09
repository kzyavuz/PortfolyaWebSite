const mongoose = require('mongoose');

const techstackSchema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model('techstack', techstackSchema);

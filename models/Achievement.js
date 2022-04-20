const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	enrollment_number: {
		type: String,
		required: false,
	},
	program: {
		type: String,
		required: true,
	},
	passing_year: {
		type: String,
		required: true,
	},
	rewards: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	imgUrl: {
		type: String,
	},
	proofUrl: {
		type: String,
	},
});

module.exports = Achievement = mongoose.model("achievement", AchievementSchema);

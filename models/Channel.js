const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	posts: {
		type: [String],
	},
});

module.exports = Channel = mongoose.model("channel", ChannelSchema);

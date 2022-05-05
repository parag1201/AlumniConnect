const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
	requirePostApproval: {
		type: Boolean,
        required: true
	},
});

module.exports = mongoose.model("Setting", SettingSchema);

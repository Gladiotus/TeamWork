const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	teamID: { type: Schema.Types.ObjectId, ref: "Team" },
	pending: { type: Boolean, default: "false" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

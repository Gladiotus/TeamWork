const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
	name: { type: String, required: true },
	adminID: { type: Schema.Types.ObjectId, ref: "User", required: true },
	projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
	joinRequests: [Object],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

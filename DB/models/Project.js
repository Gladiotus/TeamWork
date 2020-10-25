const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
	name: { type: String, required: true },
	data: { type: [Object], required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../auth/auth");
const Project = require("../../DB/models/Project");
const Team = require("../../DB/models/Team");

router.post("/new", authUser, authAdmin, async (req, res) => {
	const newProject = new Project({ name: req.body.name, data: req.body.data });
	newProject.lastUpdated = Date.now();
	newProject.save();
	const team = await Team.findById(req.body.teamID);
	team.projects.push(newProject._id);
	team.save();
	res.json(newProject);
});

router.post("/get", authUser, async (req, res) => {
	const project = await Project.findById(req.body.projectID);
	res.json({ data: project.data, lastUpdated: project.lastUpdated });
});

router.post("/lastupdated", authUser, async (req, res) => {
	const project = await Project.findById(req.body.projectID);
	res.json(project.lastUpdated);
});

router.post("/save", authUser, async (req, res) => {
	const project = await Project.findById(req.body.project._id);
	// let newData = req.body.project.data.map((list) => { // Getting all the new lists from the requests
	// 	const oldList = project.data.find((oldList) => oldList.id === list.id);
	// 	if (oldList) {
	// 		if (oldList.content.length !== list.content.length) {
	// 			return list;
	// 		} else {
	// 			oldList.content.forEach((item, i) => {
	// 				if (item.content !== list.content[i].content || item.desc !== list.content[i].desc) {
	// 					return list;
	// 				}
	// 			});
	// 		}
	// 	} else return list;
	// });
	// // deleting lists that are not in the new data
	// const newDataIDS = req.body.project.data.map((list) => list.id);
	// console.log(newDataIDS);
	// project.data.forEach((list, i) => {
	// 	if (!newDataIDS.includes(list.id)) {
	// 		console.log("hio");
	// 		project.data.splice(i, 1);
	// 	}
	// });
	// console.log(Array.from(project.data));
	// newData.forEach((newList) => {
	// 	if (newList) {
	// 		const oldListIndex = project.data.findIndex((list) => list.id === newList.id);
	// 		if (oldListIndex > -1) project.data[oldListIndex] = newList;
	// 		else project.data.push(newList);
	// 	}
	// });
	project.data = req.body.project.data;
	project.lastUpdated = Date.now();
	project.save((err) => {
		if (err) console.log(err);
		console.log("Project Saved");
		res.json({ msg: "Project Saved" });
	});
});

module.exports = router;

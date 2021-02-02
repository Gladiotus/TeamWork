const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../auth/auth");
const Team = require("../../DB/models/Team");
const User = require("../../DB/models/User");

router.use((req, res, next) => next());

router.get("/admin", authUser, authAdmin, async (req, res) => {
	const team = await Team.findOne({ adminID: req.user }).populate("projects", "_id name");
	res.json(team);
});
router.get("/employee", authUser, async (req, res) => {
	const user = await User.findOne({ _id: req.user }).populate({
		path: "teamID",
		populate: {
			path: "projects",
			select: "_id name",
		},
	});

	res.json(user.teamID);
});
router.post("/newteam", authUser, authAdmin, async (req, res) => {
	const newTeam = new Team(req.body);
	console.log("New team");
	newTeam.save();
	res.json({ msg: "New Team" });
});
router.get("/all", authUser, async (req, res) => {
	const allTeams = await Team.find({});
	res.json(allTeams);
});
router.post("/join", authUser, async (req, res) => {
	const team = await Team.findOne({ _id: req.body.teamID });
	const index = team.joinRequests.findIndex((request) => request.id === req.body.userID);
	if (index === -1) {
		team.joinRequests.push({ name: req.body.username, id: req.body.userID });
		team.save();
		const user = await User.findByIdAndUpdate(req.body.userID, { pending: true });
	}
});
router.post("/add", authUser, authAdmin, async (req, res) => {
	try {
		const team = await Team.findById(req.body.teamID);
		const user = await User.findByIdAndUpdate(req.body.userID, {
			pending: false,
			teamID: team._id,
		});
		const index = team.joinRequests.findIndex((request) => request.id === req.body.userID);
		team.joinRequests.splice(index, 1);
		team.save();
		res.json({ msg: "success" });
	} catch (err) {
		console.log(err);
	}
});
router.post("/remove", authUser, authAdmin, async (req, res) => {
	try {
		const team = await Team.findById(req.body.teamID);
		const user = await User.findByIdAndUpdate(req.body.userID, { pending: false });
		const index = team.joinRequests.findIndex((request) => request.id === req.body.userID);
		team.joinRequests.splice(index, 1);
		team.save();
		res.json({ msg: "success" });
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;

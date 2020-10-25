const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authUser, authAdmin } = require("../auth/auth");
const User = require("../../DB/models/User");

router.use((req, res, next) => next());

router.post("/register", async (req, res) => {
	const userReq = req.body;
	const userExists = await User.exists({ email: userReq.email });
	if (!userExists) {
		userReq.password = bcrypt.hashSync(userReq.password, 10);
		const newUser = new User(req.body);
		newUser.save((err) => {
			if (err) console.log(err);
			console.log(`User ${userReq.name} saved to DB`);
			res.json({ success: "true", msg: "User Registered Successfully" });
		});
	} else res.json({ success: "false", msg: "A user with this email already exists" });
});
router.post("/login", async (req, res) => {
	const userReq = req.body;
	const user = await User.findOne({ email: userReq.email });
	if (user) {
		if (bcrypt.compareSync(userReq.password, user.password)) {
			const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET);
			res.json({
				success: "true",
				msg: "Login Successfull",
				token,
				user: { id: user._id, name: user.name, role: user.role, pending: user.pending },
			});
		} else res.json({ success: "false", msg: "Incorrect Password" });
	} else res.json({ success: "false", msg: "No Such User" });
});
router.get("/isvalidtoken", authUser, (req, res) => {
	if (req.user) {
		res.json(true);
	} else {
		res.json(false);
	}
});
router.get("/", authUser, async (req, res) => {
	const user = await User.findById(req.user);
	res.json({
		success: "true",
		user: { name: user.name, id: user._id, role: user.role, pending: user.pending },
	});
});
module.exports = router;

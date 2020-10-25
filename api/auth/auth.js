const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) return res.status(401).json({ msg: "No authentication token, authorization denied." });

		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied." });

		req.user = verified.id;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const authAdmin = (req, res, next) => {
	const token = req.header("x-auth-token");
	const verified = jwt.verify(token, process.env.TOKEN_SECRET);
	try {
		if (verified.role !== "admin") {
			return res.status(401).json({ msg: "Permission Denied" });
		}
		next();
	} catch (err) {
		console.log(err);
	}
};

module.exports = { authUser, authAdmin };

const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});
};

mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Database Connected");
});

module.exports = connectDB;

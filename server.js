const express = require("express");
const path = require("path");
const connectDB = require("./DB/connection");
const usersRouter = require("./api/routes/users");
const teamsRouter = require("./api/routes/teams");
const projectsRouter = require("./api/routes/projects");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/users", usersRouter);
app.use("/teams", teamsRouter);
app.use("/projects", projectsRouter);

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	console.log(`TeamWork running on port ${port}`);
});

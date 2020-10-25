import React from "react";
import classes from "./AdminTeams.module.css";

const AdminTeams = (props) => {
	const formSubmit = async (e) => {
		e.preventDefault();
		props.newTeam(e.target.name.value);
	};
	return (
		<div className={classes.AdminTeams}>
			<h2>Set Up Your Work Team</h2>
			Enter Team Name:
			<form onSubmit={formSubmit}>
				<input type="text" name="name" />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default AdminTeams;

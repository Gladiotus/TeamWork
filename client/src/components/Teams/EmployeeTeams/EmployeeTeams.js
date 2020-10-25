import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/userContext";
import TeamItem from "./TeamItem/TeamItem";
import axios from "axios";
import classes from "./EmployeeTeams.module.css";

const EmployeeTeams = () => {
	const [teams, setTeams] = useState([]);
	const [teamDisplay, setTeamDisplay] = useState();
	const userData = useContext(UserContext);
	const history = useHistory();
	useEffect(() => {
		const getAllTeams = async () => {
			const allTeam = await axios.get("/teams/all", {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
			setTeams(allTeam.data);
		};
		getAllTeams();
		let display;
		if (!userData.loggedIn.pending) {
			if (teams) {
				display = teams.map((team) => (
					<TeamItem clickedJoin={joinClickedHandler} name={team.name} id={team._id} key={team._id} />
				));
			}
		} else {
			display = "Already joined a team, wait to be approved";
		}
		setTeamDisplay(display);
		// eslint-disable-next-line
	}, [teams.length]);
	const joinClickedHandler = (teamID) => {
		axios.post(
			"/teams/join",
			{ username: userData.loggedIn.name, userID: userData.loggedIn.id, teamID: teamID },
			{
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			}
		);
		const newUserContext = { ...userData.loggedIn };
		newUserContext.pending = true;
		userData.setLoggedIn(newUserContext);
		history.push("/");
	};

	const searchChangedHandler = (e) => {
		const display = teams.map((team) => {
			if (team.name.toLowerCase().includes(e.target.value.toLowerCase())) {
				return <TeamItem clickedJoin={joinClickedHandler} name={team.name} id={team._id} key={team._id} />;
			}
			return null;
		});
		setTeamDisplay(display);
	};
	return (
		<div className={classes.EmployeeTeams}>
			<h2>EmployeeTeams</h2>
			{typeof teamDisplay === "string" ? null : (
				<input type="text" placeholder="Search Team's Name..." onChange={searchChangedHandler} />
			)}

			<div className={classes.TeamsContainer}>{teamDisplay}</div>
		</div>
	);
};

export default EmployeeTeams;

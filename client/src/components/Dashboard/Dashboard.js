import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AdminTeams from "../Teams/AdminTeams/AdminTeams";
import EmployeeTeams from "../Teams/EmployeeTeams/EmployeeTeams";
import ProjectList from "./ProjectList/ProjectList";
import UserContext from "../../context/userContext";
import RequestList from "./RequestList/RequestList";
import classes from "./Dashboard.module.css";
import Spinner from "../UI/Spinner/Spinner";

const Dashboard = () => {
	const [teamData, setTeamData] = useState({ _id: null });
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const userContext = useContext(UserContext);
	const configDisplay = () => {
		let displayTemp;
		if (userContext.loggedIn.role === "admin") {
			if (!teamData?._id) {
				displayTemp = <AdminTeams newTeam={setUpTeam} />;
			} else {
				displayTemp = (
					<>
						<h1>{teamData.name}</h1>
						<h2>Projects</h2>
						<ProjectList list={teamData.projects} add={addProject} />
						<h2>Join Requests</h2>
						<RequestList list={teamData.joinRequests} add={addToTeam} decline={declineFromTeam} />
					</>
				);
			}
		} else if (userContext.loggedIn.role === "employee") {
			if (!teamData._id) {
				displayTemp = <EmployeeTeams />;
			} else {
				displayTemp = (
					<>
						<h1>{teamData.name}</h1>
						<h2>Projects</h2>
						<ProjectList list={teamData.projects} />
					</>
				);
			}
		}
		return displayTemp;
	};
	const addToTeam = async (id, loadRequest) => {
		loadRequest(true);
		await axios.post(
			"/teams/add",
			{ userID: id, teamID: teamData._id },
			{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
		);
		const updateState = { ...teamData };
		const index = updateState.joinRequests.findIndex((request) => request.id === id);
		updateState.joinRequests.splice(index, 1);
		setTeamData(updateState);
	};
	const declineFromTeam = async (id, loadRequest) => {
		loadRequest(true);
		await axios.post(
			"/teams/remove",
			{ userID: id, teamID: teamData._id },
			{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
		);
		const updateState = { ...teamData };
		const index = updateState.joinRequests.findIndex((request) => request.id === id);
		updateState.joinRequests.splice(index, 1);
		setTeamData(updateState);
	};
	const getTeamData = async () => {
		let dataRes;
		if (userContext.loggedIn.role === "admin") {
			console.log("this is admin");
			dataRes = await axios.get("/teams/admin", { headers: { "x-auth-token": localStorage.getItem("auth-token") } });
		} else if (userContext.loggedIn.role === "employee") {
			console.log("this is employee");
			dataRes = await axios.get("/teams/employee", {
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			});
		}
		return dataRes.data;
	};

	useEffect(() => {
		let isMounted = true;
		const setUpDashboard = async () => {
			const response = await getTeamData();
			if (isMounted) {
				setTeamData(response);
				setLoading(false);
			}
		};
		setUpDashboard();
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line
	}, [teamData?._id]);
	const setUpTeam = async (teamName) => {
		await axios.post(
			"/teams/newteam",
			{ name: teamName, adminID: userContext.loggedIn.id },
			{
				headers: { "x-auth-token": localStorage.getItem("auth-token") },
			}
		);
		history.push("/"); // Replace later with http request for teams data
	};
	const addProject = async (projectName, loadingProject) => {
		loadingProject(true);
		const res = await axios.post(
			"/projects/new",
			{ name: projectName, data: [], teamID: teamData._id },
			{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
		);
		const updateTeamData = { ...teamData };
		updateTeamData.projects.push(res.data);
		loadingProject(false);
		setTeamData(updateTeamData);
	};

	return <div className={classes.Dashboard}>{loading ? <Spinner /> : configDisplay()}</div>;
};

export default Dashboard;

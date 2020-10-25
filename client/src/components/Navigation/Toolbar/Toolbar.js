import React, { useContext } from "react";
import userContext from "../../../context/userContext";

import classes from "./Toolbar.module.css";
import { Link } from "react-router-dom";

const Toolbar = () => {
	const loggedInContext = useContext(userContext);
	const logOut = () => {
		loggedInContext.setLoggedIn({ user: null });
		localStorage.setItem("auth-token", "");
	};
	return (
		<header className={classes.Toolbar}>
			<nav>
				{loggedInContext.loggedIn.id ? (
					<>
						<Link to="/dashboard">Dashboard</Link>
						<Link onClick={logOut} to="/">
							Logout
						</Link>
						<div className={classes.UserName}>{loggedInContext.loggedIn.name}</div>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
						<div className={classes.UserName}>{loggedInContext.loggedIn.name}</div>
					</>
				)}
			</nav>
		</header>
	);
};

export default Toolbar;

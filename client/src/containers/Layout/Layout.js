import React from "react";
import { Switch, Route } from "react-router-dom";
import Project from "../../components/Project/Project";
import Dashboard from "../../components/Dashboard/Dashboard";
import PrivateRoute from "../../components/Navigation/PrivateRoute/PrivateRoute";
import classes from "./Layout.module.css";
import Login from "../../components/Users/Login/Login";
import Register from "../../components/Users/Register/Register";

const Layout = () => {
	return (
		<div className={classes.Layout}>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<PrivateRoute exact path="/project" component={Project} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
			</Switch>
		</div>
	);
};

export default Layout;

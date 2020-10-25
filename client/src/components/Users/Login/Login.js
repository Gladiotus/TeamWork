import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../../context/userContext";
import classes from "./Login.module.css";
import axios from "axios";

const Login = () => {
	const loggedInContext = useContext(userContext);
	const history = useHistory();
	const formSubmit = async (e) => {
		e.preventDefault();
		const user = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		const response = await axios.post("/users/login", user);
		if (response.data.success) {
			localStorage.setItem("auth-token", response.data.token);
			loggedInContext.setLoggedIn(response.data.user);
			history.push("/");
		}
	};
	return (
		<div className={classes.Login}>
			<div className={classes.FormContainer}>
				<h1>Login</h1>
				<form onSubmit={formSubmit}>
					<input name="email" type="email" placeholder="Enter Email..." />
					<input name="password" type="password" placeholder="Enter Password..." />
					<button>Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

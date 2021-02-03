import React from "react";
import classes from "./Register.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const history = useHistory();
	const formSubmit = async (e) => {
		e.preventDefault();
		const user = {
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
			role: e.target.role.value,
		};
		if (user.password === e.target.confirmPassword.value) {
			const response = await axios.post("/users/register", user);
			if (response.data.success) {
				history.push("/login");
			}
		} else alert("Passwords dont match");
	};
	return (
		<div className={classes.Register}>
			<form onSubmit={formSubmit}>
				<h1>Register</h1>
				<input name="name" type="text" placeholder="Enter Name..." />
				<input name="email" type="email" placeholder="Enter Email..." />
				<input name="password" type="password" placeholder="Enter Password..." />
				<input name="confirmPassword" type="password" placeholder="Enter Confirm Password..." />
				<div className={classes.RadioContainer}>
					<label>
						<input type="radio" name="role" value="admin" />
						Admin
					</label>
					<label>
						<input type="radio" name="role" value="employee" />
						Employee
					</label>
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Register;

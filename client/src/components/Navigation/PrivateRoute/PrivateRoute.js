import React, { useContext } from "react";
import UserContext from "../../../context/userContext";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const userData = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (userData.loggedIn.id) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default PrivateRoute;

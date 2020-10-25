import React, { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import Layout from "./Layout/Layout";
import UserContext from "../context/userContext";
import { BrowserRouter } from "react-router-dom";

function App() {
	const [loggedIn, setLoggedIn] = useState({ user: null });
	useEffect(() => {
		const checkLoggedIn = async () => {
			if (!loggedIn.user) {
				const token = localStorage.getItem("auth-token");
				if (token) {
					const isValidToken = await axios.get("/users/isvalidtoken", { headers: { "x-auth-token": token } });
					if (isValidToken.data) {
						const userRes = await axios.get("/users", { headers: { "x-auth-token": token } });
						setLoggedIn(userRes.data.user);
					}
				}
			}
		};
		checkLoggedIn();
		// eslint-disable-next-line
	}, [loggedIn.id]);
	return (
		<BrowserRouter>
			<UserContext.Provider value={{ loggedIn, setLoggedIn }}>
				<div className="App">
					<Toolbar />
					<Layout />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;

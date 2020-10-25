import React, { useState } from "react";
import classes from "./NewProject.module.css";
import Spinner from "../../../UI/Spinner/Spinner";

const NewProject = (props) => {
	const [adding, setAdding] = useState(false);
	const [loading, setLoading] = useState(false);
	const newProjectClicked = () => {
		setAdding(true);
	};
	const cancelNewProject = (e) => {
		if (!e.target.value) setAdding(false);
	};
	const createNewProject = (e) => {
		e.preventDefault();
		props.add(e.target.name.value, setLoading);
		e.target.name.value = "";
		e.target.name.focus();
		e.target.name.blur();
	};
	return (
		<div className={classes.NewProject} onClick={newProjectClicked}>
			{loading ? (
				<Spinner />
			) : adding ? (
				<form onSubmit={createNewProject} className={classes.AddForm}>
					<input name="name" type="text" onBlur={cancelNewProject} placeholder="Enter Project Name" autoFocus />
					<button>Create</button>
				</form>
			) : (
				"Add New Project"
			)}
		</div>
	);
};

export default NewProject;

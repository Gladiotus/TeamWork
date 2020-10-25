import React from "react";
import classes from "./ProjectItem.module.css";
import { useHistory } from "react-router-dom";

const ProjectItem = (props) => {
	const history = useHistory();
	const redirectToProject = () => {
		history.push({
			pathname: "/project",
			state: { project: props.project },
		});
	};
	return (
		<div className={classes.ProjectItem} onClick={redirectToProject}>
			{props.project.name}
		</div>
	);
};

export default ProjectItem;

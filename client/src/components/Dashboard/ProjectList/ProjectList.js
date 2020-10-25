import React, { useContext } from "react";
import UserContext from "../../../context/userContext";
import ProjectItem from "./ProjectItem/ProjectItem";
import classes from "./ProjectList.module.css";
import NewProject from "./NewProject/NewProject";

const ProjectList = (props) => {
	const userContext = useContext(UserContext);
	const list = props.list.map((project) => <ProjectItem project={project} key={project.id} />);
	if (userContext.loggedIn.role === "admin") list.push(<NewProject key={0} add={props.add} />);
	return <div className={classes.ProjectList}>{list}</div>;
};

export default ProjectList;

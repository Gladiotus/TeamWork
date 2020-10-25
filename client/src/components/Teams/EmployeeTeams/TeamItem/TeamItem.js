import React from "react";
import classes from "./TeamItem.module.css";

const TeamItem = (props) => {
	return (
		<div className={classes.TeamItem}>
			<h3>{props.name}</h3>
			<button onClick={() => props.clickedJoin(props.id)}>Join</button>
		</div>
	);
};

export default TeamItem;

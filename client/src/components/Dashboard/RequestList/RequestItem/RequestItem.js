import React from "react";
import classes from "./RequestItem.module.css";
import ApproveButton from "./Buttons/ApproveButton/ApproveButton";
import DeclineButton from "./Buttons/DeclineButton/DeclineButton";

const RequestItem = (props) => {
	return (
		<div className={classes.RequestItem}>
			<span>{props.name}</span>
			<span className={classes.ButtonContainer}>
				<ApproveButton click={props.add} id={props.userID} />
				<DeclineButton click={props.decline} id={props.userID} />
			</span>
		</div>
	);
};

export default RequestItem;

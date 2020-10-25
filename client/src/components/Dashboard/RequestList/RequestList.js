import React from "react";
import RequestItem from "./RequestItem/RequestItem";
import classes from "./RequestList.module.css";

const RequestList = (props) => {
	const list = props.list.map((request) => (
		<RequestItem name={request.name} key={request.id} userID={request.id} add={props.add} decline={props.decline} />
	));
	return <div className={classes.RequestList}>{list.length ? list : "No New Requests"}</div>;
};

export default RequestList;

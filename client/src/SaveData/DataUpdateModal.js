import React from "react";
import classes from "../components/UI/Modal/Modal.module.css";
import saveData from "./saveData";

const DataUpdateModal = (props) => {
	const newWindow = () => {
		window.open("/");
	};
	return (
		<div className={classes.Modal}>
			<p>
				Data was updated, please refresh the page or open a new window. Copy or download your edited data to the new
				window and then close this window.
			</p>
			<div className={classes.ButtonArea}>
				<button onClick={() => saveData(props.content)}>Download data as a text document</button>
				<button onClick={newWindow}>Open new window</button>
			</div>
		</div>
	);
};

export default DataUpdateModal;

import React, { useState } from "react";
import classes from "./ApproveButton.module.css";
import Spinner from "../../../../../UI/Spinner/Spinner";
import { AiOutlineCheck } from "react-icons/ai";

const ApproveButton = (props) => {
	const [loading, setLoading] = useState(false);
	return (
		<div className={classes.ApproveButton} onClick={() => props.click(props.id, setLoading)}>
			{loading ? <Spinner /> : <AiOutlineCheck size={28} />}
		</div>
	);
};

export default ApproveButton;

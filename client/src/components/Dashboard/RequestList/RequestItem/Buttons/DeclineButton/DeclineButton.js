import React, { useState } from "react";
import Spinner from "../../../../../UI/Spinner/Spinner";
import classes from "./DeclineButton.module.css";
import { AiOutlineClose } from "react-icons/ai";

const DeclineButton = (props) => {
	const [loading, setLoading] = useState(false);
	return (
		<div className={classes.DeclineButton} onClick={() => props.click(props.id, setLoading)}>
			{loading ? <Spinner /> : <AiOutlineClose size={28} />}
		</div>
	);
};

export default DeclineButton;

import React, { useState } from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
	const [content, setContent] = useState(props.item.content);
	const [desc, setDesc] = useState(props.item.desc);
	const modalSubmit = () => {
		props.modalUpdate({ id: props.item.id, content: content, desc: desc });
	};
	return (
		<div className={classes.Modal}>
			<textarea
				maxLength="80"
				className={classes.Name}
				type="text"
				onChange={(e) => setContent(e.target.value)}
				value={content}
			/>
			<textarea
				className={classes.Desc}
				placeholder="description..."
				onChange={(e) => setDesc(e.target.value)}
				value={desc}
			/>
			<button onClick={modalSubmit}>Save</button>
		</div>
	);
};

export default Modal;

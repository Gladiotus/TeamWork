import React, { useState, useEffect } from "react";
import classes from "./TaskItem.module.css";
import { BsFillTrashFill } from "react-icons/bs";

const TaskItem = (props) => {
	const [content, setContent] = useState(props.task.content);
	const [desc, setDesc] = useState(props.task.desc);
	useEffect(() => {
		setContent(props.task.content);
		setDesc(props.task.desc);
	}, [props.task]);
	const contentBlurHandler = (e) => {
		if (e.target.value === "") {
			props.delete(props.task.id);
		} else {
			const newContent = e.target.value;
			setContent(newContent);
			props.update({ id: props.task.id, content: newContent, desc: desc || "" });
		}
	};
	const pressedEnterHandler = (e) => {
		if (e.key === "Enter") {
			e.target.blur();
		}
	};

	const itemClickedHandler = (e) => {
		if (content) {
			if (e.target.closest(`.${classes.Delete}`)) {
				props.delete(props.task.id);
			} else {
				props.overlay(true, { id: props.task.id, content: content, desc: desc || "" }, props.listID);
			}
		}
	};
	let display = content || (
		<input
			type="text"
			autoFocus
			onKeyPress={pressedEnterHandler}
			placeholder="Enter name..."
			onBlur={contentBlurHandler}
		/>
	);

	return (
		<div className={classes.TaskItem} onClick={itemClickedHandler}>
			<p>{display}</p>
			<span className={classes.Delete} onClick={itemClickedHandler}>
				<BsFillTrashFill />
			</span>
		</div>
	);
};

export default TaskItem;

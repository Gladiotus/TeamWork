import React, { useState } from "react";
import classes from "./TaskList.module.css";
import TaskItem from "./TaskItem/TaskItem";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uniqid from "uniqid";

const TaskList = (props) => {
	const [tasks, setTasks] = useState(props.list.content);
	const [listName, setListName] = useState(props.list.name);
	const deleteItemHandler = (id) => {
		const currentTasks = [...tasks];
		const index = currentTasks.findIndex((task) => task.id === id);
		currentTasks.splice(index, 1);
		setTasks(currentTasks);
		props.update({ id: props.list.id, name: listName, content: currentTasks });
	};
	const addItemHandler = () => {
		const currentTasks = [...tasks];
		currentTasks.push({ id: uniqid(), content: "" });
		setTasks(currentTasks);
	};
	const updateItemHandler = (updatedTask) => {
		const currentTasks = [...tasks];
		const index = currentTasks.findIndex((task) => task.id === updatedTask.id);
		currentTasks[index] = updatedTask;
		setTasks(currentTasks);
		props.update({ id: props.list.id, name: listName, content: currentTasks });
	};
	const pressedEnterHandler = (e) => {
		if (e.key === "Enter") {
			e.target.blur();
		}
	};
	const listNameChangeHandler = (e) => {
		setListName(e.target.value);
		props.update({ id: props.list.id, name: e.target.value, content: tasks });
	};

	const items = tasks.map((task, i) => (
		<TaskItem
			listID={props.list.id}
			overlay={props.overlay}
			update={updateItemHandler}
			delete={deleteItemHandler}
			task={task}
			key={task.id}
			index={i}
		/>
	));

	return (
		<Draggable draggableId={props.list.id} index={props.index} type="list">
			{(provided) => (
				<div
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className={classes.TaskList}
				>
					<header>
						<textarea
							rows="1"
							onKeyPress={pressedEnterHandler}
							onBlur={listNameChangeHandler}
							placeholder={"List Name"}
							value={listName || ""}
							onChange={(e) => setListName(e.target.value)}
						></textarea>
						<span onClick={() => props.delete(props.list.id)}>
							<BsFillTrashFill size={20} />
						</span>
					</header>
					<Droppable droppableId={props.list.id} type="item">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps} className={classes.ItemContainer}>
								{items}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<div className={classes.NewItem} onClick={addItemHandler}>
						<BiPlus size={20} />
						<h4>Add New Item</h4>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default TaskList;

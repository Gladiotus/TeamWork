import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import uniqid from "uniqid";
import classes from "./Project.module.css";
import { BiPlus } from "react-icons/bi";
import { RiRefreshLine } from "react-icons/ri";
import TaskList from "./TaskList/TaskList";
import Modal from "../UI/Modal/Modal";
import DataUpdateModal from "../../SaveData/DataUpdateModal";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Project = (props) => {
	const [lists, setLists] = useState({
		_id: null,
		name: null,
		data: [
			// {
			// 	id: uniqid(),
			// 	name: "List 0",
			// 	content: [
			// 		{ id: uniqid(), content: "0", desc:"" },
			// 		{ id: uniqid(), content: "1", desc:"" },
			// 		{ id: uniqid(), content: "2", desc:"" },
			// 	],
			// },
		],
	});
	const [displayModal, setDisplayModal] = useState({ display: null, item: null, listID: null });
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(false);
	const [updated, setUpdated] = useState(false);
	const projectLists = useRef(lists);
	let interval;
	useEffect(() => {
		getProjectData();
		getLastUpdated();
		interval = setInterval(() => getLastUpdated(), 10000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const getLastUpdated = async () => {
		const currentLastUpdated = projectLists.current.lastUpdated;
		const lastUpdated = await axios.post(
			"/projects/lastupdated",
			{ projectID: props.location.state.project._id },
			{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
		);

		if (lastUpdated.data > currentLastUpdated) {
			clearInterval(interval);
			setPreview(true);
			setUpdated(true);
		}
		console.log("checked for updates");
	};
	const displayUpdateModalHandler = () => {
		setUpdated(false);
	};
	const getProjectData = async () => {
		setLoading(true);
		const token = localStorage.getItem("auth-token");
		const projectData = await axios.post(
			"/projects/get",
			{ projectID: props.location.state.project._id },
			{ headers: { "x-auth-token": token } }
		);
		setLists({
			_id: props.location.state.project._id,
			name: props.location.state.project.name,
			data: projectData.data.data,
			lastUpdated: projectData.data.lastUpdated,
		});
		setLoading(false);
	};
	const addListHandler = () => {
		const currentLists = { ...lists };
		currentLists.data.push({ id: uniqid(), name: "", content: [] });
		setLists(currentLists);
	};
	const updateListHandler = (updatedList) => {
		const currentLists = { ...lists };
		const index = currentLists.data.findIndex((list) => list.id === updatedList.id);
		currentLists.data[index] = updatedList;
		setLists(currentLists);
	};
	const deleteListHandler = (id) => {
		const currentLists = { ...lists };
		const index = currentLists.data.findIndex((list) => list.id === id);
		currentLists.data.splice(index, 1);
		setLists(currentLists);
	};
	const displayModalHandler = (display, item, listID) => {
		setDisplayModal({ display, item, listID });
	};
	const modalItemUpdate = (item) => {
		const currentLists = { ...lists };
		const itemList = currentLists.data.find((list) => list.id === displayModal.listID);
		const index = itemList.content.findIndex((task) => task.id === item.id);
		itemList.content[index] = item;
		setLists(currentLists);
		setDisplayModal({ display: null, item: null, listID: null });
	};
	const saveProject = async () => {
		setLoading(true);
		const project = { ...lists };
		project.lastUpdated = Date.now();
		await axios.post(
			"/projects/save",
			{ project },
			{ headers: { "x-auth-token": localStorage.getItem("auth-token") } }
		);
		setLoading(false);
		setLists(project);
	};

	const renderLists = lists.data.map((list, i) => (
		<TaskList
			overlay={displayModalHandler}
			update={updateListHandler}
			delete={deleteListHandler}
			key={list.id}
			list={list}
			index={i}
		/>
	));
	const dragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		const curLists = { ...lists };
		if (type === "list") {
			const col = curLists.data.find((item) => item.id === draggableId);
			curLists.data.splice(source.index, 1);
			curLists.data.splice(destination.index, 0, col);
			setLists(curLists);
		}
		if (type === "item") {
			const fromCol = curLists.data.find((item) => item.id === source.droppableId);
			const toCol = curLists.data.find((item) => item.id === destination.droppableId);
			const item = fromCol.content.find((item) => item.id === draggableId);
			fromCol.content.splice(source.index, 1);
			toCol.content.splice(destination.index, 0, item);
			setLists(curLists);
		}
	};
	projectLists.current = lists;
	return (
		<DragDropContext onDragEnd={dragEnd}>
			<Droppable droppableId={"project"} direction="horizontal" type="list">
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps} className={classes.Project}>
						{loading ? (
							<Spinner />
						) : (
							<>
								{updated ? (
									<>
										<DataUpdateModal content={{ ...lists }} /> <Backdrop click={displayUpdateModalHandler} />
									</>
								) : null}
								{displayModal.display ? (
									<>
										<Modal modalUpdate={modalItemUpdate} item={displayModal.item} />{" "}
										<Backdrop click={displayModalHandler} />
									</>
								) : null}
								{renderLists}
								{preview ? (
									<div className={classes.NewList} onClick={() => setUpdated(true)}>
										See Options
									</div>
								) : (
									<>
										<div className={classes.NewList} onClick={addListHandler}>
											<BiPlus size={18} />
											Add new list
										</div>
										<RiRefreshLine onClick={getProjectData} size={48} className={classes.Refresh} />
										<button onClick={saveProject} className={classes.SaveButton}>
											Save
										</button>
									</>
								)}
							</>
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Project;

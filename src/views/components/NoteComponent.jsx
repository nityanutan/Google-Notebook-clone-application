import React, { useCallback, useEffect, useRef } from "react";
import "../../assets/styles/noteComponent.css";
import pin from "../../assets/pin.svg";
import archive from "../../assets/archive.svg";
import unArchive from "../../assets/unarchive.svg";
import pinned from "../../assets/pinned.svg";
import restore from "../../assets/restore.svg";
import deleteForever from "../../assets/deleteForever.svg";

import { useDispatch, useSelector } from "react-redux";
import { deletNote, updateNote } from "../../redux/homeSlice";
const NoteComponent = ({ data, source, onClick }) => {
	const dispatch = useDispatch();
	const { notes = [] } = useSelector((state) => state.noteStore);
	const editableTitleRef = useRef(null);
	const editableContentRef = useRef(null);

	useEffect(() => {
		if (data) {
			editableTitleRef.current.innerText = data?.title || "";
			editableContentRef.current.innerText = data?.content || "";
		}
	}, [data]);

	const handleActionButtonClick = useCallback(
		(event, type, value) => {
			const { id } = value;
			let index = -1;
			for (let i = 0; i < notes?.length; i++) {
				if (notes?.[i]?.id === id) {
					index = i;
					break;
				}
			}
			if (index === -1) {
				return;
			}
			const updatedNotesObj = {
				...value,
			};
			if (type === "archive") {
				updatedNotesObj.label = "archive";
			}
			if (type === "unarchive") {
				updatedNotesObj.label = "notes";
			}

			if (type === "restore") {
				updatedNotesObj.label = "notes";
			}

			if (type === "trash") {
				updatedNotesObj.label = "trash";
			}

			if (type === "pin") {
				updatedNotesObj.pinned = !updatedNotesObj.pinned;
			}

			if (type === "deleteForever") {
				return dispatch(deletNote({ index }));
			}
			dispatch(updateNote({ index, payload: updatedNotesObj }));
			event.stopPropagation();
		},
		[notes]
	);

	const handleFooterOptions = useCallback(() => {
		if (source === "notes") {
			return (
				<>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "archive", data)}
					>
						<img src={archive} alt="archive" />
					</div>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "trash", data)}
					>
						<i className="fa-solid fa-trash"></i>
					</div>
				</>
			);
		}

		if (source === "archive") {
			return (
				<>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "unarchive", data)}
					>
						<img src={unArchive} alt="unarchive" />
					</div>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "trash", data)}
					>
						<i className="fa-solid fa-trash"></i>
					</div>
				</>
			);
		}

		if (source === "trash") {
			return (
				<>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "deleteForever", data)}
					>
						<img src={deleteForever} alt="deleteForever" />
					</div>
					<div
						className="bottomActionButtonWrapper"
						onClick={(e) => handleActionButtonClick(e, "restore", data)}
					>
						<img src={restore} alt="restore" />
					</div>
				</>
			);
		}
	}, [source]);

	return (
		<div
			className="notesCardParentContainer"
			onClick={() => onClick(data)}
			style={{
				backgroundColor: data?.activeBackgroudColor?.value || "",
				backgroundImage: data?.activeBackgroundImage?.value
					? `url(${data?.activeBackgroundImage?.value || ""})`
					: "",
			}}
		>
			<div className="titleContentContainer" ref={editableTitleRef}></div>

			<div className="contentContainer" ref={editableContentRef}></div>

			{source === "notes" && (
				<div
					className={`pinButton ${data?.pinned ? "pinned" : ""}`}
					onClick={(e) => handleActionButtonClick(e, "pin", data)}
				>
					<img src={data?.pinned ? pinned : pin} alt="pin" />
				</div>
			)}

			<div className="bottomActionButtonContainer">
				{handleFooterOptions(source)}
			</div>
		</div>
	);
};

export default NoteComponent;

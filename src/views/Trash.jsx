import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import NoteComponent from "./components/NoteComponent";
import "../assets/styles/trash.css";
import EditPopup from "./components/EditPopup";
const Trash = () => {
	const { notes = [], searchQuery } = useSelector((state) => state.noteStore);
	const [info, setInfo] = useState({
		editPopup: false,
		selectedNote: null,
	});

	const openEditPopup = useCallback(
		(value) => {
			setInfo((prev) => ({ ...prev, editPopup: true, selectedNote: value }));
		},
		[info?.editPopup]
	);

	const closeEditPopup = useCallback(() => {
		setInfo((prev) => ({ ...prev, editPopup: false, selectedNote: null }));
	}, [info?.editPopup]);

	const trashdata = useMemo(() => {
		return notes?.filter(
			(ele) =>
				ele?.label === "trash" &&
				ele?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
		);
	}, [notes, searchQuery]);

	return (
		<div className="notesContentContainer">
			{trashdata?.map((ele, index) => (
				<NoteComponent
					key={index}
					data={ele}
					source={"trash"}
					onClick={openEditPopup}
				/>
			))}
			<EditPopup
				open={info?.editPopup}
				onClose={closeEditPopup}
				selectedNote={info?.selectedNote}
			/>
		</div>
	);
};
export default Trash;

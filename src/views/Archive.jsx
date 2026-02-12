import React, { useCallback, useMemo, useState } from "react";
import "../assets/styles/archive.css";
import { useSelector } from "react-redux";
import NoteComponent from "./components/NoteComponent";
import EditPopup from "./components/EditPopup";

const Archive = () => {
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

	const archivedata = useMemo(() => {
		return notes?.filter(
			(ele) =>
				ele?.label === "archive" &&
				ele?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
		);
	}, [notes, searchQuery]);
	return (
		<div className="notesContentContainer">
			{archivedata?.map((ele, index) => (
				<NoteComponent
					key={index}
					data={ele}
					source={"archive"}
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

export default Archive;

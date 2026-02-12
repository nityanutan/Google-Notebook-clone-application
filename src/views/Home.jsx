import React, { useCallback, useMemo, useState } from "react";
import "../assets/styles/home.css";
import CreateComponent from "./components/CreateComponent";
import NoteComponent from "./components/NoteComponent";
import { useSelector } from "react-redux";
import EditPopup from "./components/EditPopup";

const Home = () => {
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

	const pinnedData = useMemo(() => {
		return notes?.filter(
			(ele) =>
				ele?.label === "notes" &&
				ele?.pinned &&
				ele?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
		);
	}, [notes, searchQuery]);

	const otherData = useMemo(() => {
		return notes?.filter(
			(ele) =>
				ele?.label === "notes" &&
				!ele?.pinned &&
				ele?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
		);
	}, [notes, searchQuery]);

	return (
		<div className="homeParentContainer">
			<CreateComponent />
			<div>
				{pinnedData?.length ? <span className="pinnedText">Pinned</span> : ""}
				<div className="notesContentContainer">
					{pinnedData?.map((ele, index) => (
						<NoteComponent
							key={index}
							data={ele}
							source={"notes"}
							onClick={openEditPopup}
						/>
					))}
				</div>
			</div>

			<div>
				{pinnedData?.length && otherData?.length ? (
					<span className="pinnedText">Other</span>
				) : (
					""
				)}
				<div className="notesContentContainer">
					{otherData?.map((ele, index) => (
						<NoteComponent
							key={index}
							data={ele}
							source={"notes"}
							onClick={openEditPopup}
						/>
					))}
				</div>
			</div>
			<EditPopup
				open={info?.editPopup}
				onClose={closeEditPopup}
				selectedNote={info?.selectedNote}
			/>
		</div>
	);
};

export default Home;

import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../assets/styles/editpopup.css";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../redux/homeSlice";
import colorPallete from "../../assets/colorPallete.svg";
import Popover from "./Popover";
const initialState = {
	focused: true,
	backgroundOptions: false,
	activeBackgroudColor: null,
	activeBackgroundImage: null,
	resetCompleteComponent: false,
};
const EditPopup = ({ open, onClose, selectedNote }) => {
	const { notes = [] } = useSelector((state) => state.noteStore);
	const dispatch = useDispatch();
	const [info, setInfo] = useState(initialState);
	const editableRef = useRef(null);
	const editableTitleRef = useRef(null);

	useEffect(() => {
		if (selectedNote) {
			const { title, content, activeBackgroudColor, activeBackgroundImage } =
				selectedNote || {};
			editableTitleRef.current.innerText = title;
			editableRef.current.innerText = content;

			let requireInfoObj = {
				activeBackgroudColor: null,
				activeBackgroundImage: null,
			};
			if (activeBackgroudColor) {
				requireInfoObj.activeBackgroudColor = activeBackgroudColor;
			}
			if (activeBackgroundImage) {
				requireInfoObj.activeBackgroundImage = activeBackgroundImage;
			}
			setInfo((prev) => ({ ...prev, ...requireInfoObj }));
		}
	}, [selectedNote]);

	const toggleBackgroundOptions = (val) => {
		setInfo((prev) => ({
			...prev,
			backgroundOptions: val ? val : !prev.backgroundOptions,
		}));
	};

	const handleBackgroundOptionChange = (type, val) => {
		setInfo((prev) => ({ ...prev, [type]: val }));
	};

	const handlReset = useCallback(() => {
		let index = -1;
		for (let i = 0; i < notes?.length; i++) {
			if (notes?.[i]?.id === selectedNote?.id) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			const payload = {
				...selectedNote,
				title: editableTitleRef.current.innerText,
				content: editableRef.current.innerText,
				activeBackgroudColor: info?.activeBackgroudColor || "",
				activeBackgroundImage: info?.activeBackgroundImage || "",
			};

			dispatch(updateNote({ index, payload }));
		}

		editableRef.current.innerText = "";
		editableTitleRef.current.innerText = "";
		setInfo({ ...initialState, resetCompleteComponent: true });
		onClose();
	}, [
		notes,
		editableRef,
		dispatch,
		editableTitleRef,
		info?.activeBackgroudColor,
		info?.activeBackgroundImage,
		selectedNote,
		onClose,
	]);

	const handleResetChanges = useCallback((val) => {
		setInfo((prev) => ({ ...prev, resetCompleteComponent: val }));
	}, []);

	return (
		open && (
			<div className="editPopParentContainer">
				<div className="editOverlayContainer" onClick={handlReset}></div>
				<div
					className="createComponentContainer"
					style={{
						backgroundColor: info?.activeBackgroudColor?.value || "",
						backgroundImage: `url(${info?.activeBackgroundImage?.value})`,
					}}
				>
					{info?.focused && (
						<div
							className="titleContentInputContainer"
							contentEditable="true"
							spellCheck="false"
							aria-multiline="true"
							role="textbox"
							data-placeholder="Title"
							ref={editableTitleRef}
						></div>
					)}
					<div
						ref={editableRef}
						className="notesContentInputContainer"
						contentEditable="true"
						spellCheck="false"
						aria-multiline="true"
						role="textbox"
						data-placeholder="Take a note..."
						onFocus={() => setInfo((prev) => ({ ...prev, focused: true }))}
					></div>
					{info?.focused && (
						<div
							className="notesFooterContainer"
							style={{
								backgroundColor: info?.activeBackgroudColor?.value || "#fff",
							}}
						>
							<div
								className="colorPalleteBtn"
								onClick={toggleBackgroundOptions}
							>
								<img src={colorPallete} alt="colorPallete" />
							</div>
							<button className="closeBtn" onClick={handlReset}>
								Close
							</button>
						</div>
					)}
				</div>
				<Popover
					open={info?.backgroundOptions}
					onClose={toggleBackgroundOptions}
					handleBackgroundOptionChange={handleBackgroundOptionChange}
					resetCompleteComponent={info?.resetCompleteComponent}
					handleResetChanges={handleResetChanges}
					customOuterContainerStyle={{
						bottom: "-101px",
						left: "calc(50% - 225px)",
					}}
					activeBackgroudColor={info?.activeBackgroudColor}
					activeBackgroundImage={info?.activeBackgroundImage}
				/>
			</div>
		)
	);
};

export default EditPopup;

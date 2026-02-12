import React, { useCallback, useRef, useState } from "react";
import "../../assets/styles/createComponent.css";
import colorPallete from "../../assets/colorPallete.svg";
import Popover from "./Popover";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/homeSlice";

const initialState = {
	focused: false,
	backgroundOptions: false,
	activeBackgroudColor: null,
	activeBackgroundImage: null,
	resetCompleteComponent: false,
};
const CreateComponent = () => {
	// const incomingState = useSelector((state) => state);
	const dispatch = useDispatch();
	const [info, setInfo] = useState(initialState);
	const editableRef = useRef(null);
	const editableTitleRef = useRef(null);

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
		const payload = {
			title: editableTitleRef.current.innerText,
			content: editableRef.current.innerText,
			activeBackgroudColor: info?.activeBackgroudColor || "",
			activeBackgroundImage: info?.activeBackgroundImage || "",
			label: "notes",
			pinned: false,
			id: crypto.randomUUID(),
		};
		dispatch(createNote(payload));

		editableRef.current.innerText = "";
		editableTitleRef.current.innerText = "";
		setInfo({ ...initialState, resetCompleteComponent: true });
	}, [
		editableRef,
		dispatch,
		editableTitleRef,
		info?.activeBackgroudColor,
		info?.activeBackgroundImage,
	]);

	const handleResetChanges = useCallback((val) => {
		setInfo((prev) => ({ ...prev, resetCompleteComponent: val }));
	}, []);

	return (
		<div className="createComponentParentContainer">
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
						<div className="colorPalleteBtn" onClick={toggleBackgroundOptions}>
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
				activeBackgroudColor={info?.activeBackgroudColor}
				activeBackgroundImage={info?.activeBackgroundImage}
			/>
		</div>
	);
};

export default CreateComponent;

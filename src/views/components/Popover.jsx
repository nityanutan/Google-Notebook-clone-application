import React, { useEffect, useState } from "react";
import "../../assets/styles/popover.css";

const colors = [
	{
		id: "#faafa8",
		value: "#faafa8",
	},
	{
		id: "#f39f76",
		value: "#f39f76",
	},
	{
		id: "#fff8b8",
		value: "#fff8b8",
	},

	{
		id: "#e2f6d3",
		value: "#e2f6d3",
	},
	{
		id: "#b4ddd3",
		value: "#b4ddd3",
	},

	{
		id: "#d4e4ed",
		value: "#d4e4ed",
	},
	{
		id: "#aeccdc",
		value: "#aeccdc",
	},
	{
		id: "#faafa45",
		value: "#faafa8",
	},
	{
		id: "#f39f71",
		value: "#f39f76",
	},
	{
		id: "#fff8b1",
		value: "#fff8b8",
	},

	{
		id: "#e2f6d1",
		value: "#e2f6d3",
	},
];

const backGroundImage = [
	{
		id: "1",
		value:
			"https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
	},
	{
		id: "2",
		value:
			"https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
	},

	{
		id: "3",
		value: "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
	},
	{
		id: "4",
		value: "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
	},
	{
		id: "5",
		value:
			"https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
	},
	{
		id: "6",
		value:
			"https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
	},

	{
		id: "7",
		value:
			"https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
	},
	{
		id: "8",
		value:
			"https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
	},

	{
		id: "9",
		value:
			"https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
	},
];

const BackgroundColorComponent = ({ bgColor, active, onClick }) => {
	return (
		<div
			className="backGroundColorComponent"
			style={{
				backgroundColor: bgColor,
				border: active ? "2px solid rgb(161, 66, 244)" : "",
			}}
			onClick={onClick}
		></div>
	);
};

const BackgroundImageComponent = ({ bgImage, active, onClick }) => {
	return (
		<div
			className="backGroundImageComponent"
			style={{
				backgroundImage: `url(${bgImage})`,
				border: active ? "2px solid rgb(161, 66, 244)" : "",
			}}
			onClick={onClick}
		></div>
	);
};

const initialState = {
	backgroundColor: null,
	backgroundImage: null,
};
const Popover = ({
	open,
	onClose,
	handleBackgroundOptionChange,
	resetCompleteComponent,
	handleResetChanges,
	customOuterContainerStyle = {},
	activeBackgroudColor,
	activeBackgroundImage,
}) => {
	const [info, setInfo] = useState(initialState);

	useEffect(() => {
		setInfo((prev) => ({
			...prev,
			backgroundImage: activeBackgroundImage,
			backgroundColor: activeBackgroudColor,
		}));
	}, [activeBackgroudColor, activeBackgroundImage]);

	useEffect(() => {
		if (resetCompleteComponent) {
			setInfo(initialState);
			handleResetChanges(false);
		}
	}, [resetCompleteComponent]);

	const handleBackgroundColorClick = (color) => {
		setInfo((prev) => ({
			...prev,
			backgroundColor: color,
		}));
		handleBackgroundOptionChange("activeBackgroudColor", color);
	};
	const handleBackgroundImageClick = (image) => {
		setInfo((prev) => ({
			...prev,
			backgroundImage: image,
		}));
		handleBackgroundOptionChange("activeBackgroundImage", image);
	};

	return (
		open && (
			<>
				<div className="popoverOverlay" onClick={() => onClose(false)}></div>
				<div
					className="popoverParentContainer"
					style={{ ...customOuterContainerStyle }}
				>
					<div className="backgroundColorContainer">
						<div
							className="slashDropContainer"
							style={{
								borderColor:
									info?.backgroundColor === null ? "rgb(161, 66, 244)" : "",
							}}
							onClick={() => handleBackgroundColorClick(null)}
						>
							<i class="fa-solid fa-droplet-slash"></i>
						</div>
						{colors?.map((ele, index) => (
							<BackgroundColorComponent
								key={index}
								bgColor={ele?.value}
								active={info?.backgroundColor?.id === ele?.id}
								onClick={() => handleBackgroundColorClick(ele)}
							/>
						))}
					</div>
					<div className="backgroundImageContainer">
						<div
							className="slashDropContainer"
							style={{
								borderColor:
									info?.backgroundImage === null ? "rgb(161, 66, 244)" : "",
							}}
							onClick={() => handleBackgroundImageClick(null)}
						>
							<img src="https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png" />
						</div>
						{backGroundImage?.map((ele, index) => (
							<BackgroundImageComponent
								key={index}
								bgImage={ele?.value}
								active={info?.backgroundImage?.id === ele?.id}
								onClick={() => handleBackgroundImageClick(ele)}
							/>
						))}
					</div>
				</div>
			</>
		)
	);
};

export default Popover;

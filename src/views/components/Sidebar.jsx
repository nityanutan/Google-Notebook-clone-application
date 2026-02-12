import React, { useEffect, useState } from "react";
import "../../assets/styles/sidebar.css";
import { useLocation, useNavigate } from "react-router";

const menuItems = [
	{
		icons: <i class="fa-regular fa-lightbulb"></i>,
		label: "Notes",
		id: "notes",
	},
	{
		icons: <i class="fa-regular fa-bell"></i>,
		label: "Archive",
		id: "archive",
	},
	{ icons: <i class="fa-solid fa-trash"></i>, label: "Trash", id: "trash" },
];

const mapper = {
	"/": "notes",
	"/archive": "archive",
	"/trash": "trash",
};

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState("notes");

	useEffect(() => {
		setActiveTab(mapper[location.pathname]);
	}, [location.pathname]);

	const handleNavigation = (type) => {
		if (type === "notes") {
			navigate("/");
		}

		if (type === "archive") {
			navigate("/archive");
		}

		if (type === "trash") {
			navigate("/trash");
		}
	};

	return (
		<div className="sidebarParentContainer">
			{menuItems?.map((item, index) => (
				<div
					className={`menuItems ${activeTab === item.id ? "active" : ""}`}
					key={index}
					onClick={() => handleNavigation(item?.label.toLowerCase())}
				>
					<div className="menuIcon">{item?.icons}</div>
					<div className="menuLabel">{item?.label}</div>
				</div>
			))}
		</div>
	);
};

export default Sidebar;

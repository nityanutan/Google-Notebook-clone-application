import React, { Children } from "react";
import "../../assets/styles/notesWrapper.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const NotesWrapper = ({ children }) => {
	return (
		<div className="notesParentContainer">
			<Header />
			<div className="noteContentContainer">
				<Sidebar />
				<div className="childrenContentContainer">{children}</div>
			</div>
		</div>
	);
};

export default NotesWrapper;

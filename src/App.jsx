import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./views/Home";
import Archive from "./views/Archive";
import Trash from "./views/Trash";
import NotesWrapper from "./views/layouts/NotesWrapper";

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<NotesWrapper>
							<Home />
						</NotesWrapper>
					}
				/>
				<Route
					path="/archive"
					element={
						<NotesWrapper>
							<Archive />
						</NotesWrapper>
					}
				/>
				<Route
					path="/trash"
					element={
						<NotesWrapper>
							<Trash />
						</NotesWrapper>
					}
				/>
			</Routes>
		</>
	);
};

export default App;

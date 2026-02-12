import React, { useEffect, useState } from "react";
import "../../assets/styles/searchBar.css";
import { updateSearchQuery } from "../../redux/homeSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(updateSearchQuery(search));
	}, [search, dispatch]);

	const handleInputOnChange = (e) => {
		setSearch(e.target.value);
	};

	const handleReset = () => {
		setSearch("");
	};

	return (
		<div className="searchBarParentContainer">
			<div className="searchBarIconContainer">
				<i class="fa-solid fa-magnifying-glass"></i>
			</div>
			<input
				type="text"
				className="searchBarInputContainer"
				placeholder="Search"
				value={search}
				onChange={handleInputOnChange}
			/>
			{search?.length ? (
				<div className="searchBarIconContainer" onClick={handleReset}>
					<i class="fa-solid fa-xmark"></i>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default SearchBar;

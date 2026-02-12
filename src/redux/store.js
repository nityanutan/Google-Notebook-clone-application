import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./homeSlice";
export const store = configureStore({
	reducer: {
		noteStore: notesReducer,
	},
});

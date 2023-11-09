import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalStatus: false,
	loadingModalStatus: false,
};

export const modalSlice = createSlice({
	name: "modalSlice",
	initialState,
	reducers: {
		modalStatusHandler: (state, action) => {
			state.modalStatus = !state.modalStatus;
		},
		loadingModalStatusHandler: (state, action) => {
			state.loadingModalStatus = action.payload;
		},
	},
});

export const { modalStatusHandler, loadingModalStatusHandler } =
	modalSlice.actions;
export default modalSlice.reducer;

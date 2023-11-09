import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	menuStatus: false,
	bigMenuStatus: false,
};

export const smallMenuSlice = createSlice({
	name: "smallMenuSlice",
	initialState,
	reducers: {
		changeMenuStatus: (state, action) => {
			state.menuStatus = !state.menuStatus;
		},
		changeBigMenuStatus: (state, action) => {
			state.bigMenuStatus = !state.bigMenuStatus;
		},
	},
});

export const { changeMenuStatus, changeBigMenuStatus } = smallMenuSlice.actions;
export default smallMenuSlice.reducer;

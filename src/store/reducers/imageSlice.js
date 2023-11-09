import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	coverStatus: false,
	contactStatus: false,
};

export const imageSlice = createSlice({
	name: "imageSlice",
	initialState,
	reducers: {
		detectCoverStatus: (state, action) => {
			if (!state.coverStatus) {
				state.coverStatus = true;
			} else {
				return;
			}
		},

		openContact: (state, action) => {
			if (action.payload === true) {
				state.contactStatus = true;
			} else {
				state.contactStatus = false;
			}
		},
	},
});

export const { detectCoverStatus, openContact } = imageSlice.actions;
export default imageSlice.reducer;

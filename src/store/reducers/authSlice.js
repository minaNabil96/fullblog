import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedIn: false,
};

export const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		loggedInAuth: (state, action) => {
			state.loggedIn = !state.loggedIn;
		},
	},
});

export const { loggedInAuth } = authSlice.actions;
export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import smallMenuSlice from "./reducers/smallMenuSlice";
import authSlice from "./reducers/authSlice";
import modalSlice from "./reducers/modalSlice";
export default configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		smallMenuSlice,
		authSlice,
		modalSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: false,
});

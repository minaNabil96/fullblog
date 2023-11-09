import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdDone } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	modalStatusHandler,
	loadingModalStatusHandler,
} from "../store/reducers/modalSlice";

const LoadingModal = ({ children }) => {
	const dispatch = useDispatch();

	return createPortal(
		<div
			className={` z-[60] fixed w-screen h-screen flex items-center justify-center bg-black/70 `}
		>
			<div
				className={`w-[100px] lg:w-[150px] min-h-[100px] p-2 bg-stone-200 rounded-md flex flex-col items-center justify-center space-y-4 shadow-sm shadow-slate-700/50 border border-blue-700 `}
			>
				{children}
			</div>
		</div>,

		document.getElementById("loadingModal"),
	);
};

export default LoadingModal;

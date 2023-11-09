import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PiWarningBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { modalStatusHandler } from "../store/reducers/modalSlice";
const Modal = ({ children }) => {
	const dispatch = useDispatch();
	const modalHandler = () => {
		dispatch(modalStatusHandler());
	};

	return createPortal(
		<div
			className={` z-[60] fixed w-screen h-screen flex items-center justify-center bg-black/70 `}
		>
			<div
				className={`w-[300px] lg:w-[450px] min-h-[200px] p-2 bg-stone-200 rounded-md flex flex-col items-center justify-center space-y-4 shadow-sm shadow-slate-700/50 border border-blue-700 `}
			>
				<PiWarningBold className={`text-yellow-400 text-[25px]`} />

				{children}
				<button
					type="button"
					className={`w-[60px] min-h-[20px] bg-blue-500 hover:bg-blue-600 duration-150 rounded-md text-slate-100 shadow-sm shadow-slate-300 text-[17px] p-1 `}
					onClick={() => modalHandler()}
				>
					ok
				</button>
			</div>
		</div>,

		document.getElementById("modal"),
	);
};

export default Modal;

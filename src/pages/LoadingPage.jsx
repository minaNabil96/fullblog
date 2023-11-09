import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createPortal } from "react-dom";
const LoadingPage = () => {
	return createPortal(
		<div
			className={`w-full h-full absolute z-40 flex max-md:flex-col max-md:space-y-3 items-center justify-center bg-white  `}
		>
			<AiOutlineLoading3Quarters
				className={`   animate-loading ease-linear  text-blue-500 text-[40px] mx-2 `}
			/>
			<h3
				className={`text-blue-500 text-[30px] max-sm:text-[28px] mx-2 text-center `}
				style={{ direction: "rtl" }}
			>
				{`من فضلك انتظر جاري التحميل`}
			</h3>
		</div>,
		document.getElementById("loadingPage"),
	);
};

export default LoadingPage;

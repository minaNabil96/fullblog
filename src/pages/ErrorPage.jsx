import React from "react";
import Button from "../reusable/Button";
import { Link } from "react-router-dom";
const ErrorPage = () => {
	return (
		<div
			className={`min-h-screen flex items-center justify-center bg-slate-900 `}
		>
			<div
				className={` flex flex-col gap-10 p-5 min-w-[85%] min-h-[500px] items-center justify-center bg-blue-200/80 rounded-sm`}
			>
				<h3 className={`text-red-600 text-[40px] mx-2 text-center `}>
					Error 404
					<span className={`text-red-500 text-[40px] mx-2 `}>
						Not Found
					</span>
				</h3>
				<Link to={`/`}>
					<Button
						btnstyle={`bg-purple-300 rounded-lg py-2 px-4 my-4 ring-1 ring-slate-500  hover:ring-slate-400 hover:bg-mainColor   hover:shadow-sm hover:shadow-slate-500 duration-100`}
					>
						<p className={`text-black  text-[16px]`}>
							Back to home
						</p>
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;

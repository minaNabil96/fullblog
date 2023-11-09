import React, { useEffect } from "react";
import LogIn from "../components/LogIn";
import { useSelector } from "react-redux";
const LoginPage = () => {
	// const { loggedIn } = useSelector((state) => state.authSlice);
	const username = sessionStorage.getItem("username");
	const isSuper = sessionStorage.getItem("isSuper");
	const userId = sessionStorage.getItem("userId");

	return (
		<div>
			{username && isSuper && userId ? (
				<div className={`flex items-center justify-center  h-screen `}>
					<h1
						className={`max-md:w-[300px] text-slate-900 text-[25px]`}
						style={{ direction: "rtl" }}
					>{`لقد قمت بتسجيل الدخول بالفعل !!`}</h1>
				</div>
			) : (
				<LogIn />
			)}
		</div>
	);
};

export default LoginPage;

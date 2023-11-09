import React from "react";

const UserShield = ({ children }) => {
	const username = sessionStorage.getItem("username");
	const isSuper = sessionStorage.getItem("isSuper");
	const userId = sessionStorage.getItem("userId");

	return (
		<>
			{username && isSuper && userId ? (
				children
			) : (
				<div className={`h-screen flex items-center justify-center`}>
					<h1
						className={`text-slate-900 text-[25px] max-sm:w-[90%] text-center `}
						style={{ direction: "rtl" }}
					>{`عفوا ليس لديك تصريح للدخول هنا !!`}</h1>
				</div>
			)}
		</>
	);
};

export default UserShield;

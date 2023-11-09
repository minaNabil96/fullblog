import React, { useEffect, useRef } from "react";
import { useGetAllUserArticlesMutation } from "../../store/api/apiSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useDetectOutside from "../../reusable/useDetectOutside";
const UserDashboard = () => {
	const username = sessionStorage.getItem("username");
	const arabicname = sessionStorage.getItem("arabicname");
	const isSuper = sessionStorage.getItem("isSuper");
	const userId = sessionStorage.getItem("userId");
	const selectRef = useRef();
	const outside = useDetectOutside(selectRef, "selectArticle");
	const dispatch = useDispatch();
	const [
		getAllUserArticles,
		{ isSuccess, isError, error, isLoading, data: userArticles },
	] = useGetAllUserArticlesMutation();
	useEffect(() => {
		if (username && isSuper && userId) {
			getAllUserArticles();
		}
	}, [username, isSuper, userId, getAllUserArticles]);

	const articlesMap =
		userArticles &&
		userArticles.length > 0 &&
		userArticles.map(({ image, title, _id }) => (
			<Link key={_id} to={`/articles/editable/${_id}`}>
				<div
					className={`flex flex-col items-center justify-between p-1 w-full space-y-2 `}
				>
					<div
						className={`flex items-center justify-between p-1 w-full  `}
					>
						<span className={`text-stone-100 text-[15px]`}>
							{title.slice(0, 50)}
							{title.length > 50 && "..."}
						</span>
						<img
							src={image}
							alt={`titleimg`}
							className={`h-full w-28 rounded-sm object-cover max-sm:max-w-[40%] ps-2 `}
						/>
					</div>
					<span className={`h-[1px] w-full bg-stone-100`}></span>
				</div>
			</Link>
		));

	return (
		<div className={` min-h-[800px] flex items-center justify-center `}>
			{userArticles && userArticles.length >= 0 ? (
				<div
					className={`max-md:w-[90%] max-md:h-[90vh] w-[40rem] bg-[#002d6e] rounded-md shadow-md shadow-slate-600/90 border-dotted border-blue-950 flex flex-col items-center justify-start space-y-8 p-8 `}
					style={{ direction: "rtl" }}
				>
					<div
						className={`flex items-center justify-between w-full  `}
					>
						<span
							className={`text-stone-100 text-[20px] `}
						>{`الأسم :`}</span>
						<span className={`text-stone-100 text-[20px] `}>
							{arabicname}
						</span>
					</div>
					<span className={`h-[2px] w-full bg-stone-100`}></span>
					<div
						className={`flex items-center justify-between w-full  `}
					>
						<span
							className={`text-stone-100 text-[20px] `}
						>{`عدد المقالات :`}</span>
						<span className={`text-stone-100 text-[20px] `}>
							{userArticles.length > 0
								? userArticles.length - 1
								: 0}
						</span>
					</div>
					<span className={`h-[2px] w-full bg-stone-100`}></span>
					<div
						className={`flex items-center justify-between w-full  `}
					>
						{/* <span */}
						{/* 	className={`text-stone-100 text-[20px] `} */}
						{/* >{`عدد المقالات :`}</span> */}
						{userArticles && userArticles.length > 0 && (
							<div
								className={` relative w-full flex flex-col space-y-2 border border-stone-300  p-2 cursor-pointer `}
								ref={selectRef}
								id={`selectArticle`}
							>
								{userArticles.length > 0 &&
									articlesMap[0].props.children}
								{outside === false && (
									<div
										className={`  absolute bg-blue-700 top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col space-y-2 border  p-2 overflow-y-auto h-36 `}
									>
										{articlesMap}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			) : isError || error ? (
				<h1
					className={`text-slate-900 text-[25px] `}
					style={{ direction: "rtl" }}
				>{`عفوًا لقد حدث خطأ ما !`}</h1>
			) : (
				<h1
					className={`text-slate-900 text-[25px] `}
					style={{ direction: "rtl" }}
				>{`جاري التحميل...`}</h1>
			)}
		</div>
	);
};

export default UserDashboard;

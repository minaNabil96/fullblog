import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TiptapNew from "../reusable/TiptapNew";
import { useGetOneArticleQuery } from "../store/api/apiSlice.js";
import { useLocation, useParams } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
const ArticlePage = () => {
	const [editable, setEditable] = useState(false);
	const [eToTop, setEToTop] = useState("");
	const [clicked, setClicked] = useState(false);
	const { state, pathname } = useLocation();
	const { id } = useParams();
	const articleId = id ? id : state;
	const { isLoading, isSuccess, isError, error, data } =
		useGetOneArticleQuery(articleId, { articleId });
	const accessToken = sessionStorage.getItem("accessToken");
	const username = sessionStorage.getItem("username");
	const admin = sessionStorage.getItem("admin");
	const isSuper = sessionStorage.getItem("isSuper");
	const userId = sessionStorage.getItem("userId");
	useEffect(() => {
		if (data && data.matched) {
			if (
				accessToken &&
				username === data.matched.author.username &&
				userId === data.matched.author._id &&
				isSuper &&
				pathname.includes("editable")
			) {
				setEditable(true);
			} else setEditable(false);
		}
	}, [accessToken, username, userId, isSuper, pathname, data]);
	return (
		<div
			className={`min-h-screen min-w-screen flex items-center justify-center py-10 `}
		>
			{data && data.matched && data.matched.body ? (
				<div className={`grid max-md:grid-cols-1  grid-cols-3  `}>
					{/* start aside */}
					<div
						className={` max-lg:place-self-center max-lg:order-2 max-lg:w-full w-[350px] max-md:p-3  min-h-[500px] bg-mainColor/80 border border-mainColor rounded-md`}
					>
						{/* start latest */}
						<div
							className={`w-full flex-col space-y-8`}
							style={{ direction: "rtl" }}
						>
							<h2
								className={`text-slate-50 text-[17px] px-1 pt-8 after:content-[""] after:bg-slate-50 after:h-[1px] after:block after:w-full after:my-4 `}
							>{`أحدث مقالات الكاتب`}</h2>
							{data.latestThree.map(
								({ _id, title, image }, idx) => (
									<Link
										to={`/articles/${_id}`}
										key={_id}
										className={` max-lg:rounded-md group flex flex-col justify-between px-2 space-y-3 bg-slate-50 hover:bg-slate-200 duration-200 py-4 `}
									>
										<img
											src={image}
											alt="latestimage"
											className={`object-cover h-1/2 w-1/3 rounded-md duration-500 transform group-hover:scale-105  ${
												idx % 2 === 0 ? "self-end" : ""
											}  `}
										/>
										<span
											className={`h-[1px] w-1/3 group-hover:w-full duration-500 bg-slate-900 ${
												idx % 2 === 0 ? "self-end" : ""
											}`}
										></span>
										<h2
											className={`text-slate-900 font-light text-[16px] group-hover:text-black  duration-150 `}
										>
											{title.slice(0, 45) + "..."}
										</h2>
									</Link>
								),
							)}
						</div>
						{/* end latest */}
					</div>
					{/* end aside */}
					{/* start article */}
					<div
						className={` lg:col-span-2  p-3 flex flex-col space-y-8 `}
					>
						{editable && (
							<button
								onClick={() => setClicked(!clicked)}
								className={`text-[15px] text-slate-200 p-1 w-12 h-8 bg-blue-700 shadow-sm shadow-slate-300/90 hover:shadow-slate-600 hover:text-slate-300 border hover:border-slate-500 duration-100 rounded-md ms-auto `}
							>
								تعديل
							</button>
						)}
						<div
							className={`w-full flex items-center justify-between py-4`}
						>
							{data.matched.author && (
								<h5 className={`text-[16px] text-slate-900 `}>
									{data.matched.author.arabicname}
								</h5>
							)}
							<h5 className={`text-[16px] text-slate-900 `}>
								{data.matched.date}
							</h5>
						</div>
						<img
							src={data.matched.image}
							alt="coverimge"
							className={`w-full h-[400px] object-cover `}
						/>
						<TiptapNew data={data} editable={clicked} />
					</div>
					{/* end article */}
				</div>
			) : (
				<LoadingPage />
			)}
		</div>
	);
};

export default ArticlePage;

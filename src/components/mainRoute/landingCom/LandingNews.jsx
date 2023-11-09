import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllArticlesQuery } from "../../../store/api/apiSlice.js";
import LoadingPage from "../../../pages/LoadingPage";
const LandingNews = () => {
	const [loaded, setLoaded] = useState({
		lands: false,
		apartments: false,
	});

	const {
		isLoading,
		isSuccess,
		isError,
		error,
		data: allArticles,
	} = useGetAllArticlesQuery({ page: 1, limit: 6 });

	const imagesHandler = (imgname) => {
		setLoaded((prev) => ({ ...prev, [imgname]: true }));
	};
	const newsMap =
		allArticles &&
		allArticles.posts &&
		allArticles.posts.length > 0 &&
		allArticles.posts.map(
			({ _id, title, image, body, author, date, text, section }) => (
				<Link key={_id} to={`/articles/${_id}`} state={_id}>
					<div
						key={_id}
						className={` overflow-hidden relative max-sm:h-[500px] h-[430px] flex items-start justify-start flex-col space-y-5  shadow-sm shadow-slate-600/70 rounded-sm bg-blue-50 `}
					>
						<div
							className={`relative overflow-hidden ${
								image === "yellow"
									? "bg-yellow-400"
									: image === "green"
									? "bg-green-400"
									: image === "red"
									? "bg-red-400"
									: image === "blue"
									? "bg-blue-400"
									: image === "purple"
									? "bg-purple-400"
									: "bg-slate-50"
							} min-w-full min-h-[12rem] max-xl:min-h-[16rem] rounded-sm `}
						>
							{image && (
								<img
									src={image}
									alt={title}
									className={`w-full h-full object-cover absolute transform hover:scale-110 duration-300 `}
								/>
							)}
							<div
								className={`absolute bottom-3 left-3 bg-blue-100 text-blue-700 rounded-sm `}
							>
								<h3
									className={`hover:text-red-500 duration-150 px-3 py-1 capitalize text-[12px] font-bold `}
								>
									{section &&
										section.map(
											({ sectionName }) => sectionName,
										)}
								</h3>
							</div>
						</div>

						<h2
							className={`hover:text-red-500 duration-150 text-slate-900 text-[17.5px] font-[600] line-clamp-3 text-start capitalize w-full px-1 `}
						>
							{title.slice(0, 100)}
							{title.length > 100 && "..."}
						</h2>

						<div
							className={` absolute bottom-0  flex items-end justify-center px-1 h-[100px] py-4 bg-blue-50 `}
						>
							<p
								className={`text-slate-500  font-light text-[16px]   text-start  w-full `}
							>
								{text.slice(0, 120)}
								{text.length > 120 && "..."}
							</p>
						</div>
					</div>
				</Link>
			),
		);
	const skeletons = [...Array(6)].map((el, idx) => (
		<div
			className="flex items-start justify-start flex-col space-y-5 py-5"
			key={idx}
		>
			<div className=" w-full h-[12rem] max-xl:h-[16rem] rounded-sm bg-gray-400/75  "></div>

			<h1 className="w-56 h-2 mt-4 bg-gray-400/75 rounded-lg mb-4 "></h1>
			<p className="w-24 h-2 mt-4 bg-gray-400/75 rounded-lg "></p>
			<p className="w-24 h-2 mt-4 bg-gray-400/75 rounded-lg "></p>
		</div>
	));
	return (
		<>
			{newsMap ? (
				<div className={`bg-white pb-10`}>
					<div
						className={`mx-auto max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl `}
					>
						<h1
							className={`font-bold text-[30px] text-stone-900 py-10 `}
						>
							{`أحدث المقالات`}
						</h1>
						<div
							className={`grid xl:grid-cols-3 max-md:grid-cols-1 md:grid-cols-2  gap-5 `}
						>
							{newsMap ? newsMap : skeletons}
						</div>
					</div>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
};

export default LandingNews;

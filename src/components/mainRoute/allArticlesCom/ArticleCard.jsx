import React from "react";
import { Link, useParams } from "react-router-dom";
const ArticleCard = ({ allArticles }) => {
	const params = useParams();
	const newsMap =
		allArticles &&
		allArticles.posts &&
		allArticles.posts.length > 0 &&
		allArticles.posts.map(
			({ _id, title, image, body, author, date, text, section }) => (
				<Link key={_id} to={`/articles/${_id}`} state={_id}>
					<div
						className={` flex items-start justify-start flex-col space-y-5 py-5  `}
					>
						<div
							className={`relative ${
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
									className={`w-full h-full object-cover absolute rounded-sm  `}
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
							className={`hover:text-red-500 duration-150 text-slate-900 text-[17.5px] font-[600] line-clamp-3 text-start capitalize w-full `}
						>
							{title}
						</h2>

						<div
							className={`flex items-center justify-start h-full py-4 `}
						>
							<p
								className={`text-slate-500  font-light text-[16px]  h-full  line-clamp-4 text-start  w-full `}
							>
								{text}
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
		<div
			className={`grid xl:grid-cols-3 max-md:grid-cols-1 md:grid-cols-2 gap-6 `}
		>
			{newsMap ? newsMap : skeletons}
		</div>
	);
};

export default ArticleCard;

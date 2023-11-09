import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ArticleCard from "./ArticleCard";
import {
	useGetAllArticlesQuery,
	useGetArticlesBySectionQuery,
} from "../../../store/api/apiSlice.js";
import { useLocation, useParams } from "react-router-dom";
const Articles = () => {
	const [page, setPage] = useState(1);
	const [sectionPage, setSectionPage] = useState(false);
	const [allArticlesPage, setAllArticlesPage] = useState(false);
	const [allArticles, setAllArticles] = useState([]);
	const [sectionPageStatus, setSectionPageStatus] = useState(false);
	const location = useLocation();
	const params = useParams();

	const paginate = ({ selected }) => {
		setPage(selected + 1);
	};
	const {
		isFetching,
		isLoading,
		isSuccess,
		isError,
		error,
		data: articlesPageData,
	} = useGetAllArticlesQuery(
		{ page: page, limit: 6 },
		{ skip: location.pathname.includes("allArticlesBySection") },
	);

	// const sectionPageStatus = params && params.id && sectionPage ? true : false;
	useEffect(() => {
		params && params.id && sectionPage
			? setSectionPageStatus(true)
			: setSectionPageStatus(false);
	}, [params.id, params, sectionPage]);

	const {
		isFetching: isFetching2,
		isLoading: isLoading2,
		isSuccess: isSuccess2,
		isError: isError2,
		error: error2,
		data: allArticlesBySections,
	} = useGetArticlesBySectionQuery(
		{ page: page, limit: 6, id: params.id },
		{ skip: !location.pathname.includes("allArticlesBySection") },
	);

	useEffect(() => {
		if (location.pathname.includes("allArticlesBySection")) {
			setSectionPage(true);
			setAllArticlesPage(false);
			setAllArticles(allArticlesBySections);
		} else {
			setAllArticlesPage(true);
			setSectionPage(false);
			setAllArticles(articlesPageData);
		}
	}, [location.pathname, articlesPageData, allArticlesBySections]);
	return (
		<div className={`bg-blue-50 py-10 min-h-[800px]  `}>
			<div
				className={`mx-auto max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl   `}
			>
				{allArticles &&
				allArticles.status &&
				allArticles.status.includes("no") ? (
					<div
						className={`h-screen flex items-center justify-center`}
					>
						<h1
							className={`text-mainColor text-[33px] max-md:text-[26px] max-sm:max-w-[90%] `}
							style={{ direction: "rtl" }}
						>{`عفوا لا توجد مقالات`}</h1>
					</div>
				) : (
					<ArticleCard allArticles={allArticles} />
				)}
				<div
					className={`flex  items-center justify-center w-full py-10  `}
				>
					{allArticles && (
						<ReactPaginate
							breakLabel="..."
							breakClassName="text-black bg-slate-200 p-2"
							disabledClassName="hidden"
							disabledLinkClassName="hidden"
							onPageChange={paginate}
							pageRangeDisplayed="2"
							pageCount={allArticles && allArticles.numOfPages}
							previousLabel={"Prev"}
							nextLabel={"Next"}
							containerClassName={` relative flex flex-row-reverse items-center justify-center w-full  `}
							pageClassName={`bg-blue-200 w-8 h-8 `}
							pageLinkClassName={` w-8 h-8 flex items-center justify-center `}
							previousLinkClassName={`${
								(allArticles &&
									allArticles.status &&
									allArticles.status.includes("no")) ||
								error
									? "hidden"
									: ""
							} bg-[#002d6e] p-2 absolute left-0 text-slate-50 font-light `}
							nextLinkClassName={` ${
								(allArticles &&
									allArticles.status &&
									allArticles.status.includes("no")) ||
								error
									? "hidden"
									: ""
							} bg-[#002d6e] p-2 absolute right-0 text-slate-50 font-light  `}
							activeLinkClassName={`  border border-blue-700 active`}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Articles;

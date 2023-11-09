import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwiperComponent from "../../../reusable/SwiperComponent";
import { useGetAllArticlesQuery } from "../../../store/api/apiSlice.js";
const Landing = () => {
	const {
		isLoading,
		isSuccess,
		isError,
		error,
		data: allArticles,
	} = useGetAllArticlesQuery({ page: 1, limit: 3 });
	return (
		<div className={`  overflow-hidden max-w-[100vw] `}>
			<div className={`max-w-full`}>
				<SwiperComponent articlesData={allArticles} />
			</div>
		</div>
	);
};

export default Landing;

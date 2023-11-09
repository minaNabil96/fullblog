import React, { useState, useRef, useEffect } from "react";
import TiptapNew from "../reusable/TiptapNew";
import { useLocation, useNavigate } from "react-router-dom";
import {
	useGetAllSectionsQuery,
	useUploadToCloudMutation,
} from "../store/api/apiSlice";
import useDetectOutside from "../reusable/useDetectOutside";
import { useDispatch, useSelector } from "react-redux";
import {
	modalStatusHandler,
	loadingModalStatusHandler,
} from "../store/reducers/modalSlice";
import { useAddArticleToDBMutation } from "../store/api/apiSlice";
import { createPortal } from "react-dom";
import { MdDone } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Modal from "../reusable/Modal";
import LoadingModal from "../reusable/LoadingModal";
// end of imports

// main component
const AddArticlePage = () => {
	const [selectedImg, setSelectedImg] = useState("");
	const [imageForView, setImageForView] = useState("");
	const [selectedSectionName, setSelectedSectionName] = useState("");
	const arabicFullDate = () => {
		const date = new Date();
		const arabicDate = new Intl.DateTimeFormat("ar-EG", {
			dateStyle: "full",
		}).format(date);
		return arabicDate;
	};

	const [finalArticle, setFinalArticle] = useState({
		author: sessionStorage.getItem("userId"),
		text: "",
		body: "",
		title: "",
		image: "",
		section: "",
		date: arabicFullDate(),
	});
	const dispatch = useDispatch();
	const preset = import.meta.env.VITE_CLOUDUPLOADPRESET;
	const cloudName = import.meta.env.VITE_CLOUDNAME;
	const sectionsRef = useRef();
	const outside = useDetectOutside(sectionsRef, "selectSection");

	const { modalStatus, loadingModalStatus } = useSelector(
		(state) => state.modalSlice,
	);
	const navigate = useNavigate();
	const {
		isSuccess,
		isError,
		error,
		isLoading,
		data: sections,
	} = useGetAllSectionsQuery();
	const [
		uploadToCloud,
		{
			isSuccess: isSuccess2,
			isError: isError2,
			error: error2,
			isLoading: isLoading2,
			data: uplodedImageData,
		},
	] = useUploadToCloudMutation();

	const [
		addArticleToDB,
		{
			isSuccess: isSuccess3,
			isError: isError3,
			error: error3,
			isLoading: isLoading3,
			data: uplodedArticleData,
		},
	] = useAddArticleToDBMutation();

	// end toolkit
	const sectionsMap =
		sections &&
		sections.length > 0 &&
		sections.map(({ sectionName, _id }) => (
			<div
				key={_id}
				className={`flex items-center justify-center p-1 hover:bg-blue-200 duration-100 `}
				onClick={() => {
					setSelectedSectionName(sectionName);
					setFinalArticle((prev) => ({
						...prev,
						section: _id,
					}));
				}}
			>
				<span className={`font-thin text-slate-900`}>
					{sectionName}
				</span>
			</div>
		));
	// handle image
	const location = useLocation();
	const imgHandler = async (e) => {
		const img = e.target.files[0];
		let regex =
			/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF|webp|WEBP)$/;

		const selected = URL.createObjectURL(img);
		const matched = img.name.match(regex);

		if (matched) {
			setSelectedImg(img);
			setImageForView(selected);
		} else console.log("please select valid image");
	};

	const dataFromTiptap = (dataFromTiptap) => {
		setFinalArticle((prev) => ({
			...prev,
			text: dataFromTiptap.text,
			body: dataFromTiptap.body,
		}));
	};

	const handleAddArticle = async () => {
		if (
			finalArticle.author &&
			finalArticle.text &&
			finalArticle.body &&
			finalArticle.title &&
			selectedImg &&
			finalArticle.section
		) {
			const formData = new FormData();
			formData.append("file", selectedImg);
			formData.append("upload_preset", `${preset}`);
			formData.append("cloud_name", `${cloudName}`);
			formData.append("folder", "blog1");
			uploadToCloud(formData)
				.unwrap()
				.then((data) => {
					const { secure_url } = data;
					const finalArticleWithImg = {
						...finalArticle,
						image: secure_url,
					};

					addArticleToDB(finalArticleWithImg);
				})
				.catch((error) => console.log(error));
		} else {
			dispatch(modalStatusHandler());
		}
	};
	useEffect(() => {
		isLoading3
			? dispatch(loadingModalStatusHandler(true))
			: isSuccess3
			? setTimeout(() => {
					dispatch(loadingModalStatusHandler(false));
					navigate(`/articles/editable/${uplodedArticleData[0]._id}`);
			  }, 4000)
			: null;
	}, [isLoading3, isSuccess3, dispatch, navigate, uplodedArticleData]);
	// end handle image

	return (
		<div className={` min-h-[700px] flex items-center justify-center  `}>
			<div
				className={` mx-auto lg:w-[660px]   xl:w-[730px]    max-lg:p-3 flex flex-col space-y-4 py-6 `}
			>
				<div
					className={`w-full flex items-center justify-between p-1 `}
				>
					<div
						className={`relative w-20 p-1 border border-slate-900 rounded-sm `}
						ref={sectionsRef}
						id={`selectSection`}
					>
						<div
							className={` cursor-pointer  flex items-center justify-center p-1 bg-slate-200 duration-100 `}
						>
							<span className={`font-thin text-slate-900`}>
								{selectedSectionName
									? selectedSectionName
									: `القسم`}
							</span>
						</div>
						<span
							className={` ${
								outside === true || outside === "none"
									? "hidden"
									: ""
							}  cursor-pointer bg-white w-full absolute left-1/2 top-24 transform -translate-x-1/2 -translate-y-1/2  h-fit p-1 border border-slate-900 rounded-sm flex flex-col space-y-2 `}
						>
							{sectionsMap}
						</span>
					</div>
					<span className={`text-slate-900 text-[15px] `}>
						إختيار القسم
					</span>
				</div>
				<input
					type="text"
					className={`w-full border border-slate-900 p-1 rounded-sm  `}
					onChange={(e) =>
						setFinalArticle((prev) => ({
							...prev,
							title: e.target.value,
						}))
					}
					style={{ direction: "rtl" }}
					placeholder={`كتابة العنوان`}
				/>
				<div
					className={` flex items-center justify-start h-10 p-1 bg-blue-100 text-slate-900 w-full`}
					value={finalArticle.title}
					style={{ direction: "rtl" }}
				>
					<p className={`text-[22px]`}>{finalArticle.title}</p>
				</div>
				{imageForView ? (
					<>
						<div
							className={`relative w-28 h-10 bg-red-600/50 rounded-md border border-slate-300  shadow-sm shadow-slate-600/70 flex items-center justify-center `}
						>
							<button
								type={`button`}
								className={`w-fit h-fit font-thin `}
								onClick={() => setImageForView("")}
							>
								clear photo
							</button>
						</div>
						<img
							src={imageForView}
							alt="articleimg"
							className={`w-full h-[400px] object-cover border border-slate-300 shadow-sm shadow-slate-600/70 `}
						/>
					</>
				) : (
					<div
						className={` flex items-center justify-center  h-[400px] bg-slate-200`}
					>
						<div
							className={`relative w-40 h-12 bg-blue-600/50 rounded-md border border-slate-300  shadow-sm shadow-slate-600/70 flex items-center justify-center `}
						>
							{/* <p */}
							{/* 	className={` w-full absolute left-0   text-[17px] text-slate-900 `} */}
							{/* > */}
							{/* 	please select image */}
							{/* </p> */}
							<input
								className={` left-0 absolute w-full  `}
								type="file"
								formEncType="multipart/form-data"
								id="myfile"
								name="myfile"
								placeholder="صورة المقال"
								required={true}
								onChange={(e) => imgHandler(e)}
							/>
						</div>
					</div>
				)}
				<TiptapNew
					addArticlePage={true}
					dataFromTiptap={dataFromTiptap}
				/>
				<div
					className={`relative w-28 h-10 bg-blue-600/50 rounded-md border border-slate-300  shadow-sm shadow-slate-600/70 flex items-center justify-center `}
				>
					<button
						type={`button`}
						className={`w-fit h-fit font-thin `}
						onClick={() => handleAddArticle()}
					>
						Add Article
					</button>
				</div>
			</div>
			{modalStatus && (
				<Modal>
					<span
						style={{ direction: "rtl" }}
						className={`text-center`}
					>{`من فضلك قم بأستكمال البيانات المطلوبة لإضافة مقال !!`}</span>
				</Modal>
			)}

			{loadingModalStatus && (
				<LoadingModal>
					{/* <span */}
					{/* 	style={{ direction: "rtl" }} */}
					{/* 	className={`text-center`} */}
					{/* >{`جاري التحميل...`}</span> */}
					{isSuccess3 && uplodedArticleData ? (
						<MdDone className={`text-[80px] text-green-400 `} />
					) : (
						<AiOutlineLoading3Quarters
							className={`text-[70px] text-blue-500  animate-spin `}
						/>
					)}
				</LoadingModal>
			)}
		</div>
	);
};

export default AddArticlePage;

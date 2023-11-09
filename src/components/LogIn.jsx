import React, { useState, useEffect } from "react";
import Button from "../reusable/Button";
import { useContactMutation, useRefreshQuery } from "../store/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../pages/LoadingPage";
import { openContact } from "../store/reducers/imageSlice";
import { useLoginMutation } from "../store/api/apiSlice";
import { loggedInAuth } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
//
const LogIn = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [infoMessage, setInfoMessage] = useState("");
	const [
		login,
		{
			isSuccess: isSuccess2,
			isLoading: isLoading2,
			isError: isError2,
			error: error2,
			data: loginData,
		},
	] = useLoginMutation();

	const { data: res } = useRefreshQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		if (res && res.status === "ready") {
			dispatch(openContact(true));
		} else {
			dispatch(openContact(false));
		}
	}, [dispatch, res]);
	const navigate = useNavigate();
	useEffect(() => {
		if (loginData) {
			if (loginData.status) {
				console.log(loginData);
				const {
					status,
					accessToken,
					admin,
					isSuper,
					username,
					userId,
					arabicname,
				} = loginData;
				sessionStorage.setItem("accessToken", accessToken);
				sessionStorage.setItem("username", username);
				sessionStorage.setItem("admin", admin);
				sessionStorage.setItem("isSuper", isSuper);
				sessionStorage.setItem("userId", userId);
				sessionStorage.setItem("arabicname", arabicname);
				status === "matched" ? dispatch(loggedInAuth()) : null;
				navigate("/");
			} else return;
		} else return;
	}, [loginData, dispatch, navigate]);

	const [
		contact,
		{ isSuccess, isLoading, isError, error, data: messageStatus },
	] = useContactMutation();
	const dateNow = new Date();
	const submit = (e) => {
		e.preventDefault();
		if (!name || !password) {
			setInfoMessage(`enter your login info`);
		} else {
			login({ username: name, password: password, date: dateNow });
		}
	};

	// !contactStatus ? (
	// 			<div className={`min-h-screen w-screen`}>
	// 				<LoadingPage />
	// 			</div>
	// 		) :
	return (
		<div className="min-h-screen max-lg:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-white to-slate-300 py-8">
			{
				<form
					className={` bg-[#002d6e]  max-md:w-[85%] md:min-w-[400px]  py-5 px-5 flex flex-col items-center justify-center rounded-md shadow-sm shadow-slate-400 `}
					// style={{ direction: "rtl" }}
				>
					<label
						htmlFor={`name`}
						className={`text-slate-200  w-full me-auto p-2 `}
					>
						{"username"}
					</label>
					<input
						id={`name`}
						type="text"
						className={`max-w-xl p-2 m-2 w-full rounded-sm  font-light focus:outline-2 focus:outline-black focus:bg-slate-200  `}
						onChange={(e) => setName(e.target.value)}
					/>
					<label
						htmlFor={`password`}
						className={`text-slate-200  w-full me-auto p-2 `}
					>
						{"password"}
					</label>
					<input
						id={`password`}
						type="text"
						className={`max-w-xl p-2 m-2 w-full rounded-sm  font-light focus:outline-2 focus:outline-black focus:bg-slate-200  `}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						btnstyle={`bg-blue-400 rounded-lg py-2 px-4 my-4 ring-1 ring-slate-300 text-white  text-[14px] hover:ring-slate-600 hover:bg-blue-600   hover:shadow-sm hover:shadow-slate-500 duration-150`}
					>
						<p
							className={`text-black  text-[16px]`}
							onClick={(e) => submit(e)}
						>
							{"login"}
						</p>
					</Button>
					{infoMessage && (!name || !password) && (
						<div
							className={`p-2 m-1 rounded-md ${
								infoMessage === "success"
									? "bg-green-300"
									: "bg-red-200"
							}`}
						>
							<h5
								className={`p-1 text-black font-normal text-[15px] `}
							>
								{infoMessage && infoMessage}
							</h5>
						</div>
					)}
					{isLoading && (
						<div className={`p-2 m-4 rounded-md bg-green-300 `}>
							<h5
								className={`p-1 text-black `}
							>{`loading...`}</h5>
						</div>
					)}
				</form>
			}
		</div>
	);
};

export default LogIn;

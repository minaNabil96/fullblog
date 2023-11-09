import React, { useState, useEffect } from "react";
import Button from "../reusable/Button";
import { useContactMutation, useRefreshQuery } from "../store/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import LoadingPage from "../pages/LoadingPage";
import { openContact } from "../store/reducers/imageSlice";
//
const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [errorMsg, setErrorMsg] = useState({ status: false, msg: "" });

	// const { contactStatus } = useSelector((state) => state.imageSlice);

	const { data: res } = useRefreshQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		if (res && res.status === "ready") {
			dispatch(openContact(true));
		} else {
			dispatch(openContact(false));
		}
	}, [dispatch, res]);

	const [
		contact,
		{ isSuccess, isLoading, isError, error, data: messageStatus },
	] = useContactMutation();

	const submit = (e) => {
		e.preventDefault();
		if (!name || !email || !message || !phone) {
			setErrorMsg({
				...errorMsg,
				status: true,
				msg: "please complete your info",
			});
		} else {
			const validEmail = email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
			if (!validEmail) {
				setErrorMsg({
					...errorMsg,
					status: true,
					msg: "invalid e-mail",
				});
			} else {
				contact({
					name,
					email,
					phone,
					message,
				})
					.unwrap()
					.then((res) => {
						console.log(res);
						if (res.status === "success") {
							setErrorMsg({
								...errorMsg,
								status: true,
								msg: "success",
							});
						} else {
							setErrorMsg({
								...errorMsg,
								status: true,
								msg: "sorry an error occurred, please try again later.",
							});
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
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
					className={` bg-mainColor  max-md:w-[85%] md:min-w-[600px]  py-5 px-5 flex flex-col items-center justify-center  rounded-md shadow-sm shadow-slate-400 `}
					style={{ direction: "rtl" }}
				>
					<label
						htmlFor={`name`}
						className={`text-slate-200  w-full me-auto p-2 `}
					>
						{"الإسم"}
					</label>
					<input
						id={`name`}
						type="text"
						className={`max-w-xl p-2 m-2 w-full rounded-sm focus:outline-none `}
						onChange={(e) => setName(e.target.value)}
					/>
					<label
						htmlFor={`email`}
						className={`text-slate-200 w-full me-auto p-2 `}
					>
						{"الإيميل"}
					</label>
					<input
						id={`email`}
						type="email"
						className={`max-w-xl p-2 m-2 w-full rounded-sm focus:outline-none `}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label
						htmlFor={`phone`}
						className={`text-slate-200  w-full me-auto p-2 `}
					>
						{"رقم الهاتف"}
					</label>
					<input
						id={`phone`}
						type="text"
						className={`max-w-xl p-2 m-2 w-full rounded-sm focus:outline-none `}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<label
						htmlFor={`message`}
						className={`text-slate-200 w-full me-auto p-2 `}
					>
						{"رسالتك"}
					</label>
					<textarea
						rows={8}
						id={`message`}
						type="text"
						className={`max-w-xl p-2 m-2 w-full rounded-sm focus:outline-none overflow-y-auto `}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button
						btnstyle={`bg-blue-600 rounded-lg py-2 px-4 my-4 ring-1 ring-slate-500 text-white  text-[14px] hover:ring-slate-400 hover:bg-blue-400   hover:shadow-sm hover:shadow-slate-500 duration-150`}
					>
						<p
							className={`text-black  text-[16px]`}
							onClick={(e) => submit(e)}
						>
							{"الإرسال"}
						</p>
					</Button>
					{errorMsg.status && (
						<div
							className={`p-2 m-4 rounded-md ${
								errorMsg.msg === "success"
									? "bg-green-300"
									: "bg-red-200"
							}`}
						>
							<h5 className={`p-1 text-black `}>
								{errorMsg.msg && errorMsg.msg}
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

export default Contact;

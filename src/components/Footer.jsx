import React from "react";
import { useEffect } from "react";
import Button from "../reusable/Button.jsx";
import { Link } from "react-router-dom";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { GiClover } from "react-icons/gi";
import { CiMail, CiPhone } from "react-icons/ci";
//

//
const Footer = () => {
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  const links = [
    { name: "facebook", icon: <FaSquareFacebook />, link: "#" },
    { name: "linkedin", icon: <FaLinkedin />, link: "#" },
    { name: "twitter", icon: <FaTwitterSquare />, link: "#" },
  ];

  const linksMap = links.map(({ name, icon, link }) => (
    <li key={name}>
      <Link
        className={` text-[30px] ${
          name === "facebook"
            ? "text-blue-600"
            : name === "linkedin"
            ? "text-blue-500"
            : "text-blue-400"
        } `}
        to={link}
      >
        {icon}
      </Link>
    </li>
  ));

  // const tabsMap =
  //   tabs &&
  //   tabs.map(({ name, subNames }, idx) => (
  //     <ul
  //       key={idx}
  //       className={`text-start space-y-2 lg:border-r border-separate border-slate-500/50 sm:me-5 my-3 lg:my-6 `}
  //     >
  //       <h2 className={`text-slate-50 text-[18px] capitalize cursor-pointer `}>
  //         {name}
  //       </h2>
  //       <li className={``}>
  //         {subNames.map((name, idx) => (
  //           <p
  //             key={idx}
  //             className={`text-slate-400  text-[15px] py-[0.30rem] capitalize cursor-pointer border-b border-[#002d6e] hover:border-b hover:border-slate-50 duration-150 w-fit max-w-[200px] `}
  //           >
  //             {name}
  //           </p>
  //         ))}
  //       </li>
  //     </ul>
  //   ));

  return (
    <footer className="py-5  bg-mainColor  ">
      <div className="mx-auto  max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl ">
        <div className="grid grid-cols-2 max-md:space-y-10 w-full text-center text-lg-start">
          <div className="col-span-2 md:col-span-1 md:place-self-start ">
            <h4 className="text-slate-50 py-5  cursor-default font-semibold text-[16px]">
              {"للتواصل أو الطلبات من فضلك إضغط الزر أسفله"}
            </h4>
            <div className={`flex items-center justify-center my-4`}>
              <p className="text-slate-50 mx-2 text-[16px] cursor-default">
                Programing is Life
              </p>
              <GiClover className={`text-green-500`} />
            </div>
            <Link to="/contact">
              {/* <button */}
              {/*   className="bg-purple-500 rounded-lg py-1 px-4 my-4 ring-1 ring-slate-500 text-slate-50  text-[14px] hover:ring-slate-400 hover:bg-purple-600   hover:shadow-md hover:shadow-slate-500 duration-150 " */}
              {/*   onClick={() => toTop()} */}
              {/* > */}
              {/*   {translate ? "Order" : "أطلب"} */}
              {/* </button> */}
              <Button
                btnstyle={`bg-gradient-to-tr from-mainColor2/70 to-mainColor rounded-lg py-2 px-4 my-4 ring-1 ring-slate-500 text-white  text-[14px] hover:ring-slate-400 hover:bg-mainColor   hover:shadow-sm hover:shadow-slate-500 duration-150`}
              >
                {"التواصل"}
              </Button>
            </Link>

            {/* <ul className="flex justify-center py-4 items-center gap-4"> */}
            {/*   {linksMap} */}
            {/* </ul> */}
          </div>
          <div className=" md:place-self-end col-span-2 md:col-span-1 space-y-10  flex flex-col items-center py-4 justify-between  ">
            {/* <Link to="/"> */}
            {/*   <div */}
            {/*     className={`flex items-center justify-center p-2 bg-gradient-to-tr from-mainColor2/70 to-mainColor  rounded-md`} */}
            {/*   > */}
            {/*     <img className="w-32 h-16 object-cover" src={logo} alt="" /> */}
            {/*   </div> */}
            {/* </Link> */}
            <div
              className={`flex flex-col items-center justify-center space-y-4 `}
            >
              <span className={`flex items-center justify-center space-x-1`}>
                <CiMail className={`text-slate-50  text-[22px]`} />
                <h3 className={`text-slate-50 text-thin text-[16px] `}>
                  minanabilfahmyhanna@gmail.com
                </h3>
              </span>
              <span className={`flex items-center justify-center space-x-1`}>
                <CiPhone className={`text-slate-50  text-[22px]`} />
                <h3 className={`text-slate-50 text-thin text-[16px] `}>
                  +201555832576
                </h3>
              </span>
            </div>
            <div className=" gap-3 pb-10 cursor-default">
              <p className="text-slate-50  cursor-default  text-[17px]">
                Created by{" "}
                <span className="info-span   cursor-default text-yellow-500">
                  {" "}
                  Mina Nabil
                </span>{" "}
              </p>

              <span className="text-slate-400 text-[17px]  cursor-default">
                all rights resaved &copy;{` ${new Date().getFullYear()}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

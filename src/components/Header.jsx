import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import Button from "../reusable/Button";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useLogoutMutation } from "../store/api/apiSlice";
import { loggedInAuth } from "../store/reducers/authSlice";
const tabs = [
  // { name: "About", arabicName: "عنا", path: "/about" },

  // {
  //   name: "Add Article",
  //   arabicName: "إضافة مقالة",
  //   path: "#",
  // },
  // { name: "Admin Dash", arabicName: "لوحة الأدمن", path: "#" },
  // { name: "User Dash", arabicName: "لوحة الكاتب", path: "#" },
  { name: "Contact", arabicName: "التواصل", path: "/contact" },
  { name: "AddArticle", arabicName: "إضافة مقال", path: "/addArticle" },
  { name: "All Articles", arabicName: "جميع المقالات", path: "/allArticles" },
  { name: "Home", arabicName: "الرئيسية", path: "/" },
  { name: "LogIn?", arabicName: "تسجيل الدخول", path: "/login" },
  // { name: "LogOut?", arabicName: , path: "/login" },
  // { name: "Login", arabicName: "تسجيل الدخول", path: "#" },
];

const username = sessionStorage.getItem("username");
const isSuper = sessionStorage.getItem("isSuper");
const userId = sessionStorage.getItem("userId");

const Header = () => {
  // english to arabic
  const [openMenu, setOpenMenu] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [openLanguages, setOpenLanguages] = useState(false);
  const username = sessionStorage.getItem("username");
  const isSuper = sessionStorage.getItem("isSuper");
  const userId = sessionStorage.getItem("userId");
  // toolkit
  const location = useLocation();
  const navigate = useNavigate();
  // scrolltotoponclick
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.authSlice);
  const [logout, { isSuccess, isError, error, isLoading, data }] =
    useLogoutMutation();
  const tabsMap = tabs.map(({ name, arabicName, path }, idx) => (
    <div
      key={idx}
      className={`min-w-fit   text-[14px] max-md:min-w-full  max-md:py-[0.10rem] ${
        name === "LogIn?" && username && isSuper && userId ? "hidden" : ""
      } ${
        name === "AddArticle" && (!username || !isSuper || !userId)
          ? "hidden"
          : ""
      } `}
    >
      <NavLink
        end
        className={({ isActive, isPending }) =>
          isActive
            ? "   text-slate-100 hover:text-blue-50/90  w-full h-full   max-md:text-center max-md:p-2 max-md:px-2 max-md:py-1  duration-150  "
            : "   text-blue-200 hover:text-blue-50/90  w-full h-full max-md:p-2 max-md:px-2 max-md:py-1  bg-inherit   duration-150 "
        }
        to={path}
      >
        {arabicName}
      </NavLink>
    </div>
  ));

  return (
    <nav
      className={` bg-mainColor  z-30   min-w-full   h-fit md:h-10    md:border-b border-slate-100/60 max-md:py-1 py-6  `}
      // onScroll={() => scrollHandler()}
    >
      {/* start md screens */}
      <div className="   flex items-center justify-center  ">
        <div
          className={` max-md:hidden absolute container mx-auto  md:flex items-center justify-between  max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl    `}
        >
          <div className="flex items-center justify-center h-full  max-md:hidden  ">
            <div
              className={`flex flex-row-reverse items-center justify-center   `}
            >
              {username && isSuper && userId && (
                <Link to={`/userDashboared`}>
                  <span
                    className={`  flex items-center justify-center space-x-1 border-s border-slate-100 ps-3 `}
                    title={`User Dashboared`}
                  >
                    <svg
                      className="control_svg  "
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="control__path hover:fill-yellow-200 duration-150 "
                        d="M13.702 13.175c.827.315 1.486.817 1.978 1.506.492.689.738 1.467.738 2.333h-16.419c0-1.417.532-2.5 1.595-3.248.394-.276 1.358-.591 2.894-.945.945-.118 1.457-.374 1.536-.768.039-.157.059-.61.059-1.358 0-.118-.039-.217-.118-.295-.157-.157-.315-.433-.472-.827-.079-.315-.157-.787-.236-1.417-.157.039-.285-.02-.384-.177-.098-.157-.177-.364-.236-.62l-.089-.443c-.157-.866-.098-1.28.177-1.24-.118-.157-.217-.532-.295-1.122-.118-.866-.059-1.634.177-2.303.276-.748.768-1.319 1.476-1.713.709-.394 1.476-.571 2.303-.532.787.039 1.506.276 2.156.709.65.433 1.093 1.024 1.329 1.772.197.551.217 1.319.059 2.303-.079.472-.157.768-.236.886.118-.039.207 0 .266.118.059.118.079.266.059.443l-.059.472c-.02.138-.049.246-.089.325l-.118.413c-.039.276-.108.472-.207.591-.098.118-.226.157-.384.118-.079.866-.217 1.476-.413 1.831 0 .039-.069.138-.207.295-.138.157-.207.256-.207.295v.65c0 .394.039.689.118.886.079.197.354.354.827.472.276.118.679.217 1.211.295.532.079.935.177 1.211.295z"
                        fill="#1658DA"
                      ></path>
                    </svg>
                  </span>
                </Link>
              )}
              <div
                className={` relative flex items-center justify-between w-full cursor-pointer pe-3  `}
              >
                <p
                  onClick={() => setOpenLanguages(true)}
                  className={`text-[16px] text-slate-100 capitalize font-thin `}
                >
                  {language}
                </p>
                {openLanguages ? (
                  <GoTriangleUp
                    onClick={() => setOpenLanguages(false)}
                    className={`text-[16px] text-slate-100`}
                  />
                ) : (
                  <GoTriangleDown
                    onClick={() => setOpenLanguages(true)}
                    className={`text-[16px] text-slate-100`}
                  />
                )}
                {openLanguages && (
                  <div
                    className={`absolute z-30 min-w-full bg-slate-200 rounded-md py-2 px-4 flex items-center justify-between flex-col space-y-1 -bottom-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm shadow-slate-300 border border-slate-700 `}
                  >
                    <p
                      className={`text-[16px]  text-slate-900 font-light hover:text-blue-700 capitalize `}
                      onClick={(e) => {
                        setOpenLanguages(false);
                        setLanguage(e.target.innerText);
                      }}
                    >
                      EN
                    </p>
                    <p
                      className={`text-[16px]  text-slate-900 font-light hover:text-blue-700 capitalize `}
                      onClick={(e) => {
                        setOpenLanguages(false);
                        setLanguage(e.target.innerText);
                      }}
                    >
                      AR
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-full  space-x-2 xl:space-x-3  ">
            {tabsMap}
            <div
              className={`min-w-fit cursor-pointer  text-[14px] max-md:min-w-full  max-md:py-[0.10rem] ${
                username || isSuper || userId ? "" : "hidden"
              }  `}
              onClick={() => {
                logout();
                sessionStorage.clear();
                dispatch(loggedInAuth());
                navigate("/");
              }}
            >
              <p
                className={`text-blue-600 bg-white p-2 rounded-md hover:text-blue-800/90 hover:bg-stone-100  w-full h-full   max-md:text-center max-md:p-2 max-md:px-2 max-md:py-1  duration-150  `}
              >
                {`تسجيل الخروج`}
              </p>
            </div>
          </div>
        </div>
        {/* end md screens */}
      </div>
      <div className=" md:hidden flex flex-col items-start justify-start   h-full  ">
        <div className="flex items-center justify-between h-full w-full    ">
          <div className="flex items-center justify-center h-full   ">
            <div
              className={`flex flex-row-reverse items-center justify-center space-x-3  `}
            >
              {username && isSuper && userId && (
                <Link to={`/userDashboared`}>
                  <span
                    className={`flex items-center justify-center space-x-1 border-s border-slate-100 ps-3 `}
                  >
                    <svg
                      className="control_svg"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="control__path"
                        d="M13.702 13.175c.827.315 1.486.817 1.978 1.506.492.689.738 1.467.738 2.333h-16.419c0-1.417.532-2.5 1.595-3.248.394-.276 1.358-.591 2.894-.945.945-.118 1.457-.374 1.536-.768.039-.157.059-.61.059-1.358 0-.118-.039-.217-.118-.295-.157-.157-.315-.433-.472-.827-.079-.315-.157-.787-.236-1.417-.157.039-.285-.02-.384-.177-.098-.157-.177-.364-.236-.62l-.089-.443c-.157-.866-.098-1.28.177-1.24-.118-.157-.217-.532-.295-1.122-.118-.866-.059-1.634.177-2.303.276-.748.768-1.319 1.476-1.713.709-.394 1.476-.571 2.303-.532.787.039 1.506.276 2.156.709.65.433 1.093 1.024 1.329 1.772.197.551.217 1.319.059 2.303-.079.472-.157.768-.236.886.118-.039.207 0 .266.118.059.118.079.266.059.443l-.059.472c-.02.138-.049.246-.089.325l-.118.413c-.039.276-.108.472-.207.591-.098.118-.226.157-.384.118-.079.866-.217 1.476-.413 1.831 0 .039-.069.138-.207.295-.138.157-.207.256-.207.295v.65c0 .394.039.689.118.886.079.197.354.354.827.472.276.118.679.217 1.211.295.532.079.935.177 1.211.295z"
                        fill="#1658DA"
                      ></path>
                    </svg>
                  </span>
                </Link>
              )}
              <div
                className={` relative flex items-center justify-between w-full cursor-pointer ms-4 pe-2`}
              >
                <p
                  onClick={() => setOpenLanguages(true)}
                  className={`text-[16px] text-slate-100 capitalize font-thin `}
                >
                  {language}
                </p>
                {openLanguages ? (
                  <GoTriangleUp
                    onClick={() => setOpenLanguages(false)}
                    className={`text-[16px] text-slate-100`}
                  />
                ) : (
                  <GoTriangleDown
                    onClick={() => setOpenLanguages(true)}
                    className={`text-[16px] text-slate-100`}
                  />
                )}
                {openLanguages && (
                  <div
                    className={`absolute z-30 min-w-full bg-slate-200 rounded-md py-2 px-4 flex items-center justify-between flex-col space-y-1 -bottom-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm shadow-slate-300 border border-slate-700 `}
                  >
                    <p
                      className={`text-[16px]  text-slate-900 font-light hover:text-blue-700 capitalize `}
                      onClick={(e) => {
                        setOpenLanguages(false);
                        setLanguage(e.target.innerText);
                      }}
                    >
                      EN
                    </p>
                    <p
                      className={`text-[16px]  text-slate-900 font-light hover:text-blue-700 capitalize `}
                      onClick={(e) => {
                        setOpenLanguages(false);
                        setLanguage(e.target.innerText);
                      }}
                    >
                      AR
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* smallscreens */}
          {!openMenu && (
            <RxHamburgerMenu
              fontSize={18}
              className="text-white h-12 w-12 px-3 cursor-pointer hover:text-yellow-200 active:text-yellow-200 duration-150 "
              onClick={() => setOpenMenu(!openMenu)}
            />
          )}
          {openMenu && (
            <MdClose
              fontSize={18}
              className="text-white h-12 w-12 px-3 cursor-pointer hover:text-yellow-200 active:text-yellow-200 duration-150 "
              onClick={() => setOpenMenu(!openMenu)}
            />
          )}
        </div>
        <div
          className={` ${
            openMenu ? "flex flex-col" : "hidden"
          } pb-5 w-full items-start justify-start h-full duration-150 space-y-3 mx-auto max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl `}
        >
          {tabsMap}
          <div
            className={`min-w-fit cursor-pointer  text-[14px] max-md:min-w-full  max-md:py-[0.10rem] ${
              username || isSuper || userId ? "" : "hidden"
            }  `}
            onClick={() => {
              logout();
              sessionStorage.clear();
              dispatch(loggedInAuth());
              navigate("/");
            }}
          >
            <p
              className={`text-blue-600 bg-white p-2 rounded-md hover:text-blue-800/90 hover:bg-stone-100  w-full h-full   max-md:text-center max-md:p-2 max-md:px-2 max-md:py-1  duration-150  `}
            >
              {`تسجيل الخروج`}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

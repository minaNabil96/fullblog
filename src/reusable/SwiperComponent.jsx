import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import mainswiperdata from "../assets/mainswiperdata.json";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
// Register Swiper web component
register();
const SwiperComponent = ({ articlesData }) => {
  const swiperRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();
  const dataMap =
    articlesData &&
    articlesData.posts &&
    articlesData.posts.length > 0 &&
    articlesData.posts.map(
      ({ _id, title, image, body, author, date, text, section }, idx) => (
        <swiper-slide key={idx}>
          <Link to={`/articles/${_id}`} state={_id}>
            <div
              className={`w-full h-[500px] flex items-center justify-center max-sm:border border-slate-800   `}
            >
              <div
                className={`max-lg:relative h-[300px] w-[80%]  mx-auto max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl object-cover  flex items-center justify-center flex-row-reverse `}
              >
                <div
                  className={` flex  items-center justify-center w-1/2 h-full max-sm:w-[90%]  `}
                >
                  <div className={`flex flex-col items-center justify-center`}>
                    <h1
                      className={`  z-10 text-[25px] max-lg:text-[25px] line-clamp-3 text-start max-lg:text-center text-slate-950 max-lg:text-slate-50 capitalize  sm:w-[450px]      `}
                    >
                      {title}
                    </h1>
                    <div
                      className={`max-lg:hidden min-w-full my-4 min-h-[2px] bg-mainColor`}
                    ></div>
                  </div>
                </div>
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className={` max-lg:absolute max-lg:w-full filter max-lg:brightness-[.6] h-full object-cover w-1/2 ms-auto  `}
                  />
                )}
              </div>
            </div>
          </Link>
        </swiper-slide>
      ),
    );
  useEffect(() => {
    // Object with parameters
    const params = {
      slidesPerView: 1,
      autoplay: true,
      // disableOnInteraction: true,
      loop: true,
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        beforeInit: (swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          // swiper.hostEl.style.position = "relative";
          // swiper.hostEl.style.maxWidth = "100vw";
        },
        // afterInit: (swiper) => {
        //
        //   console.log(prevRef.current);
        // },
        slideChange: (swiper) => {
          swiper.autoplay.resume();
        },
      },
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);
  return (
    <>
      <swiper-container init="false" ref={swiperRef}>
        {dataMap}
      </swiper-container>
      <div
        className={`mx-auto max-sm:w-[90%] sm:w-[90%] md:max-w-3xl xl:max-w-4xl  max-lg:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full flex items-center justify-between `}
      >
        <div
          ref={prevRef}
          className={` absolute -left-5 w-fit h-fit  bg-slate-100 focus:outline-none active:outline-none p-2 flex items-center justify-center  border border-mainColor rounded-md `}
        >
          <HiOutlineArrowNarrowLeft
            className={`text-[33px] text-mainColor  `}
          />
        </div>
        <div
          ref={nextRef}
          className={` absolute -right-5 w-fit h-fit bg-slate-100  focus:outline-none active:outline-none p-2 flex items-center justify-center  border border-mainColor rounded-md  `}
        >
          <HiOutlineArrowNarrowRight
            className={`text-[33px] text-mainColor  `}
          />
        </div>
      </div>
    </>
  );
};

export default SwiperComponent;

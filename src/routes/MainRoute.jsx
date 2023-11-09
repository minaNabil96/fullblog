import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useRefreshQuery, useRefreshBlogQuery } from "../store/api/apiSlice";
import { openContact } from "../store/reducers/imageSlice";
import { useDispatch } from "react-redux";
const MainRoute = () => {
  const { isSuccess, isLoading, isError, error, data: res } = useRefreshQuery();
  const {
    isSuccess: isSuccess2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
    data: res2,
  } = useRefreshBlogQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (res && res.status === "ready") {
      dispatch(openContact(true));
    } else {
      dispatch(openContact(false));
    }
  }, [dispatch, res]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainRoute;

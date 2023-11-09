import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MainRoute from "./routes/MainRoute";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AllArticlesPage from "./pages/AllArticlesPage";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import AddArticlePage from "./pages/AddArticlePage";
import UserShield from "./reusable/UserShield";
import UserDashboaredPage from "./pages/UserDashboaredPage";
// imports
const mode = import.meta.env.PROD;
if (mode) {
  disableReactDevTools();
  console.log = () => {};
}

// routes
const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingPage />}>
              <HomePage />
            </Suspense>
          ),
        },
        // {
        //   path: "/contact",
        //   element: <Contact />,
        // },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/allArticles",
          element: <AllArticlesPage />,
        },
        {
          path: "/allArticlesBySection/:id",
          element: <AllArticlesPage />,
        },
        {
          path: "/articles/:id",
          element: <ArticlePage />,
        },
        {
          path: "/articles/editable/:id",
          element: (
            <UserShield>
              <ArticlePage />
            </UserShield>
          ),
        },
        {
          path: "/addArticle",
          element: (
            <UserShield>
              <AddArticlePage />
            </UserShield>
          ),
        },
        {
          path: "/userDashboared",
          element: (
            <UserShield>
              <UserDashboaredPage />
            </UserShield>
          ),
        },
      ],
    },
  ],
  { basename: "/fullblog/" },
);

// main app
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
);

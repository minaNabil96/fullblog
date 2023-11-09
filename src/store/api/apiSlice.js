import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_APIBASEURL;
const url = import.meta.env.VITE_CLOUDURL;
export const apiSlice = createApi({
  reducerPath: "myWorksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    credentials: "include",
    // baseUrl: `http://192.168.1.8:5000/`,
  }),
  endpoints: (builder) => ({
    // start contact
    contact: builder.mutation({
      query: (name, email, phone, message) => ({
        url: `/users/contact-me`,
        method: "PUT",
        body: name,
        email,
        phone,
        message,
      }),
    }),
    // end contact
    // start refresh
    refresh: builder.query({
      query: () => `https://laconic-e-commerce-sample-api.onrender.com/`,
    }),
    // end refresh
    refreshBlog: builder.query({
      query: () => `/`,
      // query: () => `http://192.168.1.7:5000/`,
    }),
    // start login

    login: builder.mutation({
      query: (user) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: (user) => ({
        url: `/users/logOut`,
        method: "POST",
        body: user,
      }),
    }),
    // endlogin
    // start articles
    getAllArticles: builder.query({
      query: ({ page, limit }) => `/posts?page=${page}&limit=${limit}`,
    }),
    getOneArticle: builder.query({
      query: (articleId) => `/posts/${articleId}`,
    }),
    getArticlesBySection: builder.query({
      query: ({ page, limit, id }) =>
        `/posts/sections/${id}?page=${page}&limit=${limit}`,
    }),

    // end articles
    // start sections
    getAllSections: builder.query({
      query: () => `/sections`,
    }),

    // end sections
    // start uoload photo to cloudinary
    uploadToCloud: builder.mutation({
      query: (form) => ({
        url: url,
        method: "POST",
        body: form,
        credentials: "omit",
      }),
    }),
    // end uoload photo to cloudinary
    // start add article
    addArticleToDB: builder.mutation({
      query: (article) => ({
        url: `/posts`,
        method: "POST",
        body: article,
        credentials: "include",
      }),
    }),

    // end add article
    // start get all user's articles
    getAllUserArticles: builder.mutation({
      query: () => ({ url: `/posts/user-articles`, method: "POST" }),
    }),

    // end get all user's articles
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useContactMutation,
  useUploadToCloudMutation,
  useAddArticleToDBMutation,
  useGetAllUserArticlesMutation,
  useRefreshQuery,
  useRefreshBlogQuery,
  useGetAllArticlesQuery,
  useGetOneArticleQuery,
  useGetArticlesBySectionQuery,
  useGetAllSectionsQuery,
} = apiSlice;

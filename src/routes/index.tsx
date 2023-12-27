import React, { lazy } from "react";
import BasicLayout from "@/layout/BasicLayout";
import Home from "@/pages/Home";
// import ArticleList from "@/pages/Article";
// import Detail from "@/pages/Detail";
// import Zustand from "@/pages/Zustand";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/article",
        element: React.createElement(lazy(() => import("../pages/Article"))),
      },
      {
        path: "/article/:id",
        element: React.createElement(lazy(() => import("../pages/Detail"))),
      },
      {
        path: "/zustand",
        element: React.createElement(lazy(() => import("../pages/Zustand"))),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;

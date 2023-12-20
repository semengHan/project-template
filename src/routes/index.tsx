import BasicLayout from "@/layout/BasicLayout";
import Home from "@/pages/Home";
import ArticleList from "@/pages/Article";
import Detail from "@/pages/Detail";
import Zustand from "@/pages/Zustand";
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
        path: "/articleList",
        element: <ArticleList />,
      },
      {
        path: "/articleList/:id",
        element: <Detail />,
      },
      {
        path: "/zustand",
        element: <Zustand />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;

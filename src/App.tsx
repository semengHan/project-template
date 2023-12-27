import React, { lazy, useState, useEffect } from "react";

import { Link, useRoutes } from "react-router-dom";
import { Spin } from "antd";
import BasicLayout from "@/layout/BasicLayout";
import NotFound from "@/pages/NotFound";

import { useBearStore } from "@/store/index";
import { getAdminRoutes, getNormalRoutes } from "./services";
// import { RouterContext } from "./routes/router-context";
import Icon from "./utils/Icon";
import "./App.css";

const modules = import.meta.glob("./pages/*/index.tsx");
const components = Object.keys(modules).reduce((prev, cur) => {
  prev[cur.replace("./pages", "")] = modules[cur];
  return prev;
}, {});
console.log(modules, components, "sdf");

const router = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  const [loading, setLoading] = useState(true);
  const { setMenus } = useBearStore();
  const initData = () => {
    getAdminRoutes().then((res) => {
      const menu = [];
      const routes = [];
      res.forEach((item) => {
        let obj = {};
        if (item.children?.length > 0) {
          obj.key = item.path;
          obj.icon = <Icon icon={item.icon} />;
          obj.label = <Link to={item.path}>{item.name}</Link>;
          obj.children = [];
          item.children.forEach((child) => {
            obj.children.push({
              key: child.path,
              label: <Link to={child.path}>{child.name}</Link>,
            });
            routes.push({
              path: child.path,
              element: React.createElement(lazy(components[child.filePath])),
            });
          });
        } else {
          obj.key = item.path;
          obj.icon = <Icon icon={item.icon} />;
          obj.label = <Link to={item.path}>{item.name}</Link>;
          routes.push({
            path: item.path,
            element: React.createElement(lazy(components[item.filePath])),
          });
        }

        menu.push(obj);
      });
      router[0].children = routes;
      setMenus(menu);
      setLoading(false);
    });
  };

  useEffect(() => {
    initData();
  }, []);

  if (loading) return <Spin size="large" />;

  return <>{useRoutes(router)}</>;
}

export default App;

import { GET, POST, PUT } from "@/utils/request";
import * as API from "./apis";

export function getRadarImageList(params) {
  return GET(API.RADAR_IMAGE_LIST, params);
}

export function getEcData(params) {
  return GET(API.ISOBANDS_LIST, params);
}

export function getAdminRoutes() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve([
        {
          name: "Home",
          path: "/",
          filePath: "/Home/index.tsx",
          icon: "UserOutlined",
        },
        {
          name: "ArticleList",
          icon: "VideoCameraOutlined",
          children: [
            {
              name: "Article",
              path: "/article",
              filePath: "/Article/index.tsx",
            },
            {
              name: "Detail",
              path: "/article/:id",
              filePath: "/Detail/index.tsx",
            },
          ],
        },
        {
          name: "Zustand",
          path: "/zustand",
          filePath: "/Zustand/index.tsx",
          icon: "UploadOutlined",
        },
      ]);
    });
  });
}

export function getNormalRoutes() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve([
        {
          name: "Home",
          path: "/",
          filePath: "/Home/index.tsx",
          icon: "UserOutlined",
        },
        {
          name: "ArticleList",
          path: "/article",
          filePath: "/Article/index.tsx",
          icon: "VideoCameraOutlined",
        },
        {
          name: "Zustand",
          path: "/zustand",
          filePath: "/Zustand/index.tsx",
          icon: "UploadOutlined",
        },
      ]);
    });
  });
}

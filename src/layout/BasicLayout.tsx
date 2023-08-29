// BasicLayout/index.jsxs

import { Link, Outlet } from "react-router-dom";
import styles from "./index.module.less";

const BasicLayout = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <Link to="/">Home</Link>
        <Link to="articleList">ArticleList</Link>
      </div> */}
      {/* Outlet相当于是子路由的占位符 */}
      <Outlet />
    </div>
  );
};
export default BasicLayout;

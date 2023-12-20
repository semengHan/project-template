import { Link, Outlet } from "react-router-dom";
import { Space } from "antd";
import styles from "./index.module.less";

const BasicLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>React Map Gl</span>
        <Space>
          <Link to="/">Home</Link>
          <Link to="articleList">ArticleList</Link>
          <Link to="zustand">Zustand</Link>
        </Space>
      </div>
      {/* Outlet相当于是子路由的占位符 */}
      <Outlet />
    </div>
  );
};
export default BasicLayout;

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Space, Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
import styles from "./index.module.less";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
};

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = () => {};
  return (
    <div className={styles.container}>
      <Layout style={layoutStyle}>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
            }}
          />
          <span className={styles.title}>React Map Gl</span>
        </Header>
        <Layout>
          <Sider
            collapsed={collapsed}
            collapsible
            collapsedWidth={50}
            width={200}
            trigger={null}
            className={styles.menu}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              onSelect={handleSelect}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: <Link to="/">Home</Link>,
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: <Link to="articleList">ArticleList</Link>,
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: <Link to="zustand">Zustand</Link>,
                },
              ]}
            />
          </Sider>
          <Content className={styles.container}>
            {/* Outlet相当于是子路由的占位符 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default BasicLayout;

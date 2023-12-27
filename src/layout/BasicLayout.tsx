import { useState, Suspense, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, Spin } from "antd";
import Icon from "@/utils/Icon";
import { useBearStore } from "@/store/index";

const { Header, Sider, Content } = Layout;
import styles from "./index.module.less";

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
};

const BasicLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { menus } = useBearStore();
  return (
    <div className={styles.container}>
      <Layout style={layoutStyle}>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <Icon icon="MenuUnfoldOutlined" />
              ) : (
                <Icon icon="MenuFoldOutlined" />
              )
            }
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
              // defaultSelectedKeys={menus[0]?.key}
              items={menus}
            />
          </Sider>
          <Content className={styles.container}>
            <Suspense fallback={<Spin size="large" />}>
              {/* Outlet相当于是子路由的占位符 */}
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default BasicLayout;

import { Layout as AntLayout, Breadcrumb, Menu } from "antd";
import { TableOutlined, LogoutOutlined } from "@ant-design/icons";
import { createElement } from "react";
import { Outlet } from "react-router";

const { Header, Content } = AntLayout;

const labels = [
  { label: "Dashboard", key: "dashboard", icon: TableOutlined },
  { label: "Stock", key: "stock", icon: TableOutlined },
  { label: "Orders", key: "orders", icon: TableOutlined },
  { label: "Logout", key: "logout", icon: LogoutOutlined },
];

const items = labels.map((label, index) => ({
  key: String(index + 1),
  icon: createElement(label.icon),
  label: label.label,
}));

const Layout = () => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            background: "#fff",
            minHeight: 280,
            padding: 24,
            borderRadius: 8,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </AntLayout>
  );
};

export default Layout;

import { Layout as AntLayout, Breadcrumb, Menu, MenuProps } from "antd";
import { TableOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router";

const { Header, Content } = AntLayout;

const labels: MenuProps["items"] = [
  { label: "Stock", key: "/", icon: <TableOutlined /> },
  { label: "History", key: "/history", icon: <TableOutlined /> },
  { label: "Logout", key: "logout", icon: <LogoutOutlined /> },
];

const Layout = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname ?? ""]}
          items={labels}
          style={{ flex: 1, minWidth: 0 }}
          onSelect={(e) => {
            navigate(e.key);
          }}
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

import { Layout as AntLayout, Breadcrumb, Menu, MenuProps } from "antd";
import {
  TableOutlined,
  LogoutOutlined,
  HistoryOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

const { Header, Content } = AntLayout;

const labels: MenuProps["items"] = [
  { label: "Stock", key: "/", icon: <TableOutlined /> },
  { label: "History", key: "/history", icon: <HistoryOutlined /> },
  { label: "Material", key: "/material", icon: <ProfileOutlined /> },
  { label: "Logout", key: "logout", icon: <LogoutOutlined /> },
];

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname ?? ""]);

  useEffect(() => {
    setSelectedKeys([pathname ?? ""]);
  }, [pathname]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        navigate("/");
        localStorage.removeItem("email");
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname === "/logout") {
      supabase.auth.signOut().then(() => {
        navigate("/");
      });
    }
  }, [navigate, pathname]);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          items={labels}
          style={{ flex: 1, minWidth: 0 }}
          onSelect={(e) => {
            setSelectedKeys([e.key]);
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

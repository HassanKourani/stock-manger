import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import History from "./pages/History";
import Material from "./pages/Material";
import { App as AntApp, ConfigProvider } from "antd";
import Summary from "./pages/Summary";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0084b9",
        },
        components: {
          Table: {
            headerBg: "#0084b9",
            headerColor: "#ffffff",
          },
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="summary" element={<Summary />} />
                <Route path="history" element={<History />} />
                <Route path="material" element={<Material />} />
                <Route path="logout" element={<>YOU ARE LOGGED OUT</>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;

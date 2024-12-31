import { App as AntApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import History from "./pages/History";
import Material from "./pages/Material";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0084b9",
          borderRadius: 4,
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}>
              <Route path="" element={<Layout />}>
                <Route path="" index element={<Home />} />
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
}

export default App;

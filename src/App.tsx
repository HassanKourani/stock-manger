import { App as AntApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

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
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;

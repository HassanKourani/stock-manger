import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/login";
import Home from "./pages/Home";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0084b9",
          borderRadius: 2,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="" index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

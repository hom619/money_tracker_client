import "./App.css";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MainLayout } from "./components/layout/mainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Auth } from "./auth/Auth";
import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import { autoLogin } from "./utils/users.js";
function App() {
  const { user, setUser } = useUser();
  useEffect(() => {
    !user?._id && updateUser();
  }, [user?._id]);
  const updateUser = async () => {
    const user = await autoLogin();
    setUser(user);
  };
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          ></Route>
          <Route
            path="transactions"
            element={
              <Auth>
                <Transactions />
              </Auth>
            }
          ></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

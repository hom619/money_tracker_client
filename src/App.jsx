import "./App.css";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MainLayout } from "./components/layout/mainLayout";
function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

import "./App.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  toast("Show your message");
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;

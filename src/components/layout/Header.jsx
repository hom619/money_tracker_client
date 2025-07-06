import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { TbTransactionDollar } from "react-icons/tb";
import { useUser } from "../../context/UserContext";
import { GiMoneyStack } from "react-icons/gi";

export const Header = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleOnLogOut = () => {
    //remove the access token from the local storage
    localStorage.removeItem("accessJWT");
    setUser({});
    //redirect to the login page
  };
  return (
    <>
      {user?._id && (
        <>
          <button className="toggle-btn d-md-none" onClick={toggleSidebar}>
            ☰
          </button>
          <div
            className={`sidebar ${isOpen ? "open" : ""} d-flex flex-column p-3`}
          >
            <h2
              className="brand"
              style={{ fontFamily: "Barriecito", fontSize: "2rem" }}
            >
              <GiMoneyStack /> Tracker
            </h2>
            <hr />
            <Nav className="flex-column">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={toggleSidebar}
              >
                <BiSolidDashboard /> Dashboard
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={toggleSidebar}
              >
                <TbTransactionDollar /> Transactions
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={handleOnLogOut}
              >
                <ImExit /> Logout
              </NavLink>
            </Nav>
          </div>
          {isOpen && (
            <div className="overlay d-md-none" onClick={toggleSidebar}></div>
          )}
        </>
      )}
    </>
  );
};

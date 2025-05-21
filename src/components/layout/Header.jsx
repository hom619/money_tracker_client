import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { TbLogin } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { TbTransactionDollar } from "react-icons/tb";
import { useUser } from "../../context/UserContext";

export const Header = () => {
  const { user, setUser } = useUser();
  const handleOnLogOut = () => {
    //remove the access token from the local storage
    localStorage.removeItem("accessJWT");
    setUser({});
    //redirect to the login page
  };
  return (
    <Navbar expand="lg" variant="dark" className="bg-body-dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link className="nav-link" to="/dashboard">
                  <BiSolidDashboard />
                  Dashboard
                </Link>
                <Link className="nav-link" to="/transactions">
                  <TbTransactionDollar />
                  Transactions
                </Link>

                <Link
                  onClick={handleOnLogOut}
                  className="nav-link"
                  to="/signup"
                >
                  <ImExit />
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  <TbLogin /> Login
                </Link>
                <Link className="nav-link" to="/signup">
                  <IoCreate />
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

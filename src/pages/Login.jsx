import { React, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../components/FinancialTips";
import { SignInForm } from "../components/SignInForm";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";

import { useState } from "react";
export const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img4, img5];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="p-5">
      <Row
        className="border p-5 rounded"
        style={{
          backgroundColor: "#01c68e08",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col md={6}>
          <div
            className="border rounded d-flex flex-column justify-content-center"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              height: "100%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 58, 5, 0.1)",
            }}
          ></div>
        </Col>
        <Col md={6}>
          <SignInForm />
        </Col>
      </Row>
    </Container>
  );
};
export default Login;

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../components/FinancialTips";
import { SignInForm } from "../components/SignInForm";
export const Login = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col md={6}>
          <SignInForm />
        </Col>
        <Col md={6}>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ height: "100%" }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;

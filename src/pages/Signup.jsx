import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../components/FinancialTips";
import { SignUpForm } from "../components/SignUpForm";

export const Signup = () => {
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col md={6}>
          <FinancialTips />
        </Col>
        <Col md={6}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

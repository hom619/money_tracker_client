import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { TransactionTable } from "../components/TransactionTable.jsx";
import { useUser } from "../context/UserContext.jsx";

export const Transactions = () => {
  const { getAllTransactions } = useUser();
  // Fetch all transactions when the component mounts
  useEffect(() => {
    getAllTransactions();
  }, []);
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded">
        <Col>
          <TransactionForm />
          <hr></hr>
          <TransactionTable />
        </Col>
      </Row>
    </Container>
  );
};

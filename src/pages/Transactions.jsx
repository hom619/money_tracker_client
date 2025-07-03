import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../components/TransactionForm.jsx";
import { TransactionTable } from "../components/TransactionTable.jsx";
import { useUser } from "../context/UserContext.jsx";
import { CustomModal } from "../components/CustomModal.jsx";

export const Transactions = () => {
  const { getAllTransactions } = useUser();
  useEffect(() => {
    getAllTransactions();
  }, []);
  return (
    <>
      <Container className="p-5">
        <Row className="bg-white p-2 rounded text-dark">
          <Col>
            <CustomModal>
              <TransactionForm />
            </CustomModal>
            <TransactionTable />
          </Col>
        </Row>
      </Container>
    </>
  );
};

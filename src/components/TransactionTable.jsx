import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { MdAssignmentAdd } from "react-icons/md";
import Button from "react-bootstrap/esm/Button";

export const TransactionTable = () => {
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const { transactions, toggleModal } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);
  useEffect(() => {
    setDisplayTransactions(transactions);
  }, [transactions]);
  const handleOnSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.title.toLowerCase().includes(searchValue)
    );
    setDisplayTransactions(filteredTransactions);
    // Update the transactions state with the filtered results
    // Assuming you have a method to set transactions in your context
    // setTransactions(filteredTransactions);
  };
  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    if (value === "all") {
      checked
        ? setIdsToDelete(displayTransactions.map((item) => item._id))
        : setIdsToDelete([]);
      return;
    }
    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      setIdsToDelete(idsToDelete.filter((id) => id !== value));
    }

    return;
  };
  return (
    <>
      <div>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <label className="fw-bold fs-3">Transaction History</label>{" "}
            <label
              className="border"
              style={{
                "border-radius": "25px",
                width: "60px",
                padding: "2px",
              }}
            >
              {displayTransactions.length} Total
            </label>
          </div>
          <div>
            <Form.Control
              type="text"
              onChange={handleOnSearch}
              placeholder="Search..."
            />
          </div>
          <div>
            <MdAssignmentAdd onClick={() => toggleModal(true)} />
          </div>
        </div>
        <div>
          <Form.Check
            label="Select All"
            value="all"
            onChange={handleOnSelect}
            checked={idsToDelete.length === displayTransactions.length}
          />
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Description</th>
              <th>Expense</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.length > 0 &&
              displayTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <Form.Check
                    label={moment(transaction.tranDate).format("MMMM D, Y")}
                    value={transaction._id}
                    onChange={handleOnSelect}
                    checked={idsToDelete.includes(transaction._id)}
                  />
                  <td>{transaction.title}</td>
                  <td className="expense">
                    {transaction.type === "expense"
                      ? `$${transaction.amount}`
                      : "0"}
                  </td>
                  <td className="income">
                    {transaction.type === "income"
                      ? `$${transaction.amount}`
                      : "0"}
                  </td>
                </tr>
              ))}
            <tr className="fw-bold text-start">
              <td colSpan={3}>Total</td>
              <td>
                $
                {displayTransactions
                  .filter((t) => t.type === "expense")
                  .reduce((acc, tran) => acc + tran.amount, 0)}
              </td>
              <td>
                $
                {displayTransactions
                  .filter((t) => t.type === "income")
                  .reduce((acc, tran) => acc + tran.amount, 0)}
              </td>
            </tr>
            <tr className="fw-bold text-start">
              <td colSpan={3}>Total Balance</td>
              <td colSpan={2}>
                $
                {displayTransactions.reduce((acc, tran) => {
                  return tran.type === "income"
                    ? acc + tran.amount
                    : acc - tran.amount;
                }, 0)}
              </td>
            </tr>
          </tbody>
        </Table>
        {idsToDelete.length > 0 && (
          <div className="d-grid">
            <Button variant="danger">
              Delete {idsToDelete.length} Transaction(s)
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

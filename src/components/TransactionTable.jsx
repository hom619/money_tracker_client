import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { MdAssignmentAdd } from "react-icons/md";

export const TransactionTable = () => {
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const { transactions } = useUser();
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
            <MdAssignmentAdd />
          </div>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Transaction Description</th>
              <th>Expense</th>
              <th>Income</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.length > 0 &&
              displayTransactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>{moment(transaction.tranDate).format("MMMM D, Y")}</td>
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
      </div>
    </>
  );
};

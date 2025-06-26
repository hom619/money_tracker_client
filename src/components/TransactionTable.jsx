import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { MdAssignmentAdd } from "react-icons/md";
import Button from "react-bootstrap/esm/Button";
import CustomDatePicker from "../components/CustomDatePicker";
import {
  deleteTransactionById,
  deleteTransactions,
} from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";

export const TransactionTable = () => {
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    transactions,
    toggleModal,
    getAllTransactions,
    setTransactionById,
    setEditState,
    createPendingState,
  } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    setDisplayTransactions(transactions);
  }, [transactions]);
  const balance = displayTransactions.reduce((acc, tran) => {
    return tran.type === "income" ? acc + tran.amount : acc - tran.amount;
  }, 0);
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
  const handleOnDeleteById = async (id) => {
    if (confirm(`Are you sure you want to delete this transaction?`)) {
      const pendingResponse = deleteTransactionById(id);
      createPendingState(pendingResponse);
      const { status, message } = await pendingResponse;
      toast[status](message);
      status === "success" && getAllTransactions();
    }
  };
  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${idsToDelete.length} transaction(s)?`
      )
    ) {
      const pendingResponse = deleteTransactions(idsToDelete);
      createPendingState(pendingResponse);
      const { status, message } = await pendingResponse;
      toast[status](message);
      status === "success" && getAllTransactions();
      // Reset the idsToDelete state after deletion
      setIdsToDelete([]);
    }
  };
  const handleOnEdit = (id) => {
    // Find the transaction by id
    const transactionById = displayTransactions.find(
      (transaction) => transaction._id === id
    );
    setTransactionById(transactionById);
    setEditState(true);
    toggleModal(true);
    // Assuming you have a method to set the current transaction in your context
  };
  const addTransaction = () => {
    setTransactionById({});
    setEditState(false);
    toggleModal(true);
    // Reset the form or set it to initial state if needed
    // Assuming you have a method to reset the form in your context
    // resetForm();
  };
  const handleOnSearchByDate = (date) => {
    setSelectedDate(date);
    const filteredTransactions = transactions.filter(
      (tran) => new Date(tran.tranDate) >= new Date(date)
    );
    setDisplayTransactions(filteredTransactions);
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
      <div className="border rounded p-2">
        <div className="d-flex justify-content-between">
          <div>
            <label className="fw-bold fs-3">Transaction History</label>{" "}
          </div>
          <div className="d-flex justify-content-end m-2 gap-2">
            <div>
              <Form.Control
                type="text"
                onChange={handleOnSearch}
                placeholder="Search..."
              />
            </div>

            <div>
              <CustomDatePicker
                selectedDate={selectedDate}
                onChange={handleOnSearchByDate}
              />
            </div>
            <div>
              <Button
                className="rounded-pill"
                style={{ background: "#00573f" }}
                onClick={() => addTransaction()}
              >
                <MdAssignmentAdd /> Add Transaction
              </Button>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3">
          <label className="text-secondary mb-2">
            You have {displayTransactions.length} transaction(s){" "}
          </label>
          <Form.Check
            label="Select All"
            value="all"
            onChange={handleOnSelect}
            checked={idsToDelete.length === displayTransactions.length}
          />
        </div>
        <hr className="m-0"></hr>
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Description</th>
              <th>Expense</th>
              <th>Income</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.length > 0 &&
              displayTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <Form.Check
                      label={moment(transaction.tranDate).format("MMMM D, Y")}
                      value={transaction._id}
                      onChange={handleOnSelect}
                      checked={idsToDelete.includes(transaction._id)}
                    />
                  </td>

                  <td>{transaction.title}</td>

                  <td className="expense">
                    <FiArrowDownRight className="border rounded" />
                    &nbsp;
                    {transaction.type === "expense"
                      ? `$${transaction.amount}`
                      : "0"}
                  </td>
                  <td className="income">
                    <MdArrowOutward className="border rounded" />
                    &nbsp;
                    {transaction.type === "income"
                      ? `$${transaction.amount}`
                      : "0"}
                  </td>
                  <td>
                    <CiEdit onClick={() => handleOnEdit(transaction._id)} />
                    &nbsp;
                    <RiDeleteBinLine
                      onClick={() => handleOnDeleteById(transaction._id)}
                      className="text-danger"
                    />
                  </td>
                </tr>
              ))}
            <tr className="fw-bold text-start">
              <td colSpan={2}>Total</td>
              <td className="expense">
                $
                {displayTransactions
                  .filter((t) => t.type === "expense")
                  .reduce((acc, tran) => acc + tran.amount, 0)}
              </td>
              <td colSpan={2} className="income">
                $
                {displayTransactions
                  .filter((t) => t.type === "income")
                  .reduce((acc, tran) => acc + tran.amount, 0)}
              </td>
            </tr>
            <tr className="fw-bold text-start">
              <td colSpan={3}>Total Balance</td>
              <td colSpan={2} className={balance > 0 ? "income" : "expense"}>
                $ {balance}
              </td>
            </tr>
          </tbody>
        </Table>
        {idsToDelete.length > 0 && (
          <div className="d-grid">
            <Button variant="danger" onClick={handleOnDelete}>
              Delete {idsToDelete.length} Transaction(s)
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

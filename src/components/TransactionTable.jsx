import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { MdAssignmentAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
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
  const [loading, setLoading] = useState(false);
  const {
    transactions,
    toggleModal,
    getAllTransactions,
    setTransactionById,
    setEditState,
  } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    setDisplayTransactions(transactions);
    setLoading(false);
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
  };

  const handleOnDeleteById = async (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const pendingToastId = "deleteById-pending";
      const resultToastId = "deleteById-result-success";

      if (!toast.isActive(pendingToastId)) {
        const pendingResponse = deleteTransactionById(id);
        toast.promise(
          pendingResponse,
          { pending: "Please wait..." },
          { toastId: pendingToastId }
        );

        const { status, message } = await pendingResponse;

        if (!toast.isActive(resultToastId)) {
          toast[status](message, { toastId: resultToastId });
          if (status === "success") {
            getAllTransactions();
          }
        }
      }
    }
  };

  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${idsToDelete.length} transaction(s)?`
      )
    ) {
      const pendingToastId = "delete-pending";
      const resultToastId = "delete-result-success";

      if (!toast.isActive(pendingToastId)) {
        const pendingResponse = deleteTransactions(idsToDelete);
        toast.promise(
          pendingResponse,
          { pending: "Please wait..." },
          { toastId: pendingToastId }
        );

        const { status, message } = await pendingResponse;

        if (!toast.isActive(resultToastId)) {
          toast[status](message, { toastId: resultToastId });
          if (status === "success") {
            getAllTransactions();
            setIdsToDelete([]);
          }
        }
      }
    }
  };

  const handleOnEdit = (id) => {
    const transactionById = displayTransactions.find(
      (transaction) => transaction._id === id
    );
    setTransactionById(transactionById);
    setEditState(true);
    toggleModal(true);
  };

  const addTransaction = () => {
    setTransactionById({});
    setEditState(false);
    toggleModal(true);
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
  };

  return (
    <>
      {loading ? (
        <span className="spinner" />
      ) : (
        <div className="border rounded p-3">
          {/* Header Controls */}
          <div className="topControls d-flex justify-content-between">
            <div className="mb-2 mb-md-0">
              <label className="fw-bold fs-3" style={{ color: "#00573f" }}>
                Transaction History
              </label>
            </div>

            <div className="topControlInputs d-flex justify-content-end m-2 gap-2">
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={handleOnSearch}
                className="w-100 w-md-25"
              />

              <div className="w-100 w-md-auto">
                <CustomDatePicker
                  selectedDate={selectedDate}
                  onChange={handleOnSearchByDate}
                  className="w-100"
                />
              </div>

              <Button
                className="rounded-pill w-100 w-md-auto px-3"
                style={{ background: "#00573f", minWidth: "160px" }}
                onClick={addTransaction}
              >
                <MdAssignmentAdd /> Add Transaction
              </Button>
            </div>
          </div>

          {/* Select & Info */}
          <div className="d-flex flex-column flex-md-row gap-2 mb-2 align-items-md-center">
            <label className="text-secondary">
              You have {displayTransactions.length} transaction(s)
            </label>
            <Form.Check
              label="Select All"
              value="all"
              onChange={handleOnSelect}
              checked={idsToDelete.length === displayTransactions.length}
            />
          </div>

          <hr className="m-0" />

          {/* Responsive Table */}
          <div className="table-responsive">
            <Table hover className="table">
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
                {displayTransactions.map((transaction) => (
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
                      <FiArrowDownRight className="border rounded" />{" "}
                      {transaction.type === "expense"
                        ? `$${transaction.amount}`
                        : "0"}
                    </td>
                    <td className="income">
                      <MdArrowOutward className="border rounded" />{" "}
                      {transaction.type === "income"
                        ? `$${transaction.amount}`
                        : "0"}
                    </td>
                    <td>
                      <CiEdit
                        onClick={() => handleOnEdit(transaction._id)}
                        className="editIcon"
                      />
                      &nbsp;&nbsp;
                      <RiDeleteBinLine
                        onClick={() => handleOnDeleteById(transaction._id)}
                        className="deleteIcon text-danger"
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
                  <td
                    colSpan={2}
                    className={balance > 0 ? "income" : "expense"}
                  >
                    $ {balance}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {idsToDelete.length > 0 && (
            <div className="d-grid mt-3">
              <Button variant="danger" onClick={handleOnDelete}>
                Delete {idsToDelete.length} Transaction(s)
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

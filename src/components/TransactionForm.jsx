import { React, useEffect } from "react";

import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm";
import { CustomInput } from "./CustomInput";
import Form from "react-bootstrap/Form";
import { postTransaction, updateTransaction } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useState } from "react";
export const TransactionForm = () => {
  const {
    getAllTransactions,
    toggleModal,
    transactionById,
    editState,
    setEditState,
  } = useUser();
  const [transactionId, setTransactionId] = useState(null);
  useEffect(() => {
    // Check if transactionById is set to determine if we are editing
    if (transactionById && Object.keys(transactionById).length > 0) {
      setEditState(true);
      setTransactionId(transactionById._id);
      // If transactionById is not empty, we are in edit mode
    } else {
      setEditState(false);
    }
  }, [transactionById, setEditState]);
  let initialState = {};

  if (editState) {
    initialState = {
      title: transactionById.title,
      amount: transactionById.amount,
      tranDate: transactionById.tranDate.split("T")[0],
    };
    // setEditState(true);
  } else {
    initialState = {
      type: "",
      title: "",
      amount: "",
      tranDate: "",
    };
  }
  const { form, handleOnChange, setForm } = useForm(initialState);

  const fields = [
    {
      label: "Title",
      placeholder: "Shopping",
      required: true,
      type: "text",
      name: "title",
      value: form.title,
    },
    {
      label: "Amount",
      placeholder: "$1000",
      required: true,
      type: "number",
      name: "amount",
      value: form.amount,
    },
    {
      label: "Transaciton Date",
      required: true,
      type: "date",
      name: "tranDate",
      value: form.tranDate,
    },
  ];
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { title, amount, tranDate, type } = form;
    const emptyFieldToastId = "empty-fields";
    if (!title || !amount || !tranDate || !type) {
      if (!toast.isActive(emptyFieldToastId)) {
        return toast.error("Please fill in all fields", {
          toastId: emptyFieldToastId,
        });
      }
      return; // 🔴 Stop here if validation fails
    }
    const isEdit = editState;
    const pendingToastId = isEdit ? "edit-pending" : "add-pending";
    const resultToastIdPrefix = isEdit ? "edit-result" : "add-result";

    const apiCall = isEdit
      ? updateTransaction({ transactionId, form })
      : postTransaction(form);

    // ✅ Prevent duplicate pending toast
    if (!toast.isActive(pendingToastId)) {
      toast.promise(
        apiCall,
        {
          pending: "Please wait...",
        },
        {
          toastId: pendingToastId,
        }
      );
    }

    const { status, message } = await apiCall;

    const resultToastId = `${resultToastIdPrefix}-${status}-${message}`;

    // ✅ Prevent duplicate result toast
    if (!toast.isActive(resultToastId)) {
      if (status === "success") {
        toast.success(message, { toastId: resultToastId });

        if (isEdit) {
          setEditState(false);
        }

        setForm(initialState);
        getAllTransactions();
        toggleModal(false);
      } else {
        toast.error(message || "Something went wrong. Please Try again", {
          toastId: resultToastId,
        });
      }
    }
  };

  return (
    <div className="border rounded p-4">
      {editState ? (
        <h4 className="mb-4">Edit your Transaction</h4>
      ) : (
        <h4 className="mb-4">Add your Transaction</h4>
      )}
      {/* <h4 className="mb-4">Enter your Transaction!</h4> */}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Transaction Type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange}>
            <option value="">--Select--</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>
        {fields.map((field) => (
          <CustomInput key={field.name} {...field} onChange={handleOnChange} />
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

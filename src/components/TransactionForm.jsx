import React from "react";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm";
import { CustomInput } from "./CustomInput";
import Form from "react-bootstrap/Form";
import { postTransaction } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
export const TransactionForm = () => {
  const { getAllTransactions, toggleModal } = useUser();
  const initialState = {
    type: "",
    title: "",
    amount: "",
    tranDate: "",
  };
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
    const pendingResponse = postTransaction(form);
    toast.promise(pendingResponse, {
      pending: "Please wait...",
    });
    const { status, message } = await pendingResponse;
    toast[status](message, { theme: "dark" });
    if (status === "success") {
      setForm(initialState);
      // Reset form on success
      getAllTransactions();
      //close modal
      toggleModal(false);
    }
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-4">Enter your Transaction!</h4>
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

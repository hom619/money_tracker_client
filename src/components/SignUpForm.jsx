import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
export const SignUpForm = () => {
  const fields = [
    {
      label: "Name",
      placeholder: "Adam Smith",
      required: true,
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      placeholder: "Adam@gmail.com",
      required: true,
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "confirmPassword",
    },
  ];
  const [form, setForm] = useState({});
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      console.log(confirmPassword);
      return toast.error("Passwords don't match", { theme: "dark" });
    }
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-4">Sign up here!</h4>
      <Form onSubmit={handleOnSubmit}>
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

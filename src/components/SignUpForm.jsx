import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postUser } from "../../helpers/axiosHelper";
import { useForm } from "../hooks/useForm";
export const SignUpForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { form, handleOnChange, setForm } = useForm(initialState);
  const fields = [
    {
      label: "Name",
      placeholder: "Adam Smith",
      required: true,
      type: "text",
      name: "name",
      value: form.name,
    },
    {
      label: "Email",
      placeholder: "Adam@gmail.com",
      required: true,
      type: "email",
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "confirmPassword",
      value: form.confirmPassword,
    },
  ];
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return toast.error("Passwords don't match", { theme: "dark" });
    }
    const { status, message } = await postUser(rest);
    toast[status](message);
    status === "success" && setForm(initialState);
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

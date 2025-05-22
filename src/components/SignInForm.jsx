import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useForm } from "../hooks/useForm";
import { toast } from "react-toastify";
import { loginUser } from "../../helpers/axiosHelper";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const initialState = {
    email: "",
    password: "",
  };
  const fields = [
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
  ];
  const { form, handleOnChange } = useForm(initialState);
  const goToLocation = useLocation().state?.from?.pathname || "/dashboard";
  useEffect(() => {
    user?._id && navigate(goToLocation);
  }, [user?._id, navigate, goToLocation]);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      return toast.error("Please fill in all fields", { theme: "dark" });
    }
    const pendingResponse = loginUser(form);
    toast.promise(pendingResponse, {
      pending: "Please wait...",
    });
    const { status, message, user, accessJWT } = await pendingResponse;
    toast[status](message);
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-4">Welcome Back!</h4>
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

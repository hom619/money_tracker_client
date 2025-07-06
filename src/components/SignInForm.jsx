import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useForm } from "../hooks/useForm";
import { toast } from "react-toastify";
import { loginUser } from "../../helpers/axiosHelper";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export const SignInForm = () => {
  const navigate = useNavigate();
  const { user, setUser, createPendingState } = useUser();
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
      leftIcon: <FaEnvelope />,
      variant: "login",
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
      leftIcon: <FaLock />,
      showToggle: true,
      variant: "login",
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

    // Prevent duplicate "fill in fields" error
    const emptyFieldToastId = "empty-fields";
    if (!email || !password) {
      if (!toast.isActive(emptyFieldToastId)) {
        return toast.error("Please fill in all fields", {
          toastId: emptyFieldToastId,
        });
      }
      return;
    }

    // Show unique pending toast
    const pendingToastId = "login-pending";
    const pendingResponse = loginUser(form);
    if (!toast.isActive(pendingToastId)) {
      toast.promise(
        pendingResponse,
        {
          pending: "Please wait...",
        },
        {
          toastId: pendingToastId,
        }
      );
    }

    // Wait for response
    const { status, message, user, accessJWT } = await pendingResponse;

    // Prevent duplicate success/error messages
    const resultToastId = `login-result-${status}-${message}`;
    if (!toast.isActive(resultToastId)) {
      toast[status](message, { toastId: resultToastId });
    }

    // Handle login state
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);
  };
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-start">
        <h2
          className="mb-1 fw-bold"
          style={{
            color: "#00573f",
          }}
        >
          LOGIN
        </h2>
      </div>
      <label className="mb-2" style={{ color: "#2e8b57" }}>
        Hello Again! Please sign in to continue
      </label>
      <Form onSubmit={handleOnSubmit} className="text-secondary">
        {fields.map((field) => (
          <CustomInput key={field.name} {...field} onChange={handleOnChange} />
        ))}
        <div className="d-grid">
          <Button variant="primary" type="submit" className="submitButton">
            Submit
          </Button>
        </div>
        <div className="mt-2 d-flex justify-content-center gap-2">
          <label className="text-secondary">Don't have an account?</label>
          <label
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up here
          </label>
        </div>
      </Form>
    </div>
  );
};

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postUser } from "../../helpers/axiosHelper";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
export const SignUpForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const { form, handleOnChange, setForm } = useForm(initialState);
  const fields = [
    {
      label: "Name",
      placeholder: "Adam Smith",
      required: true,
      type: "text",
      name: "name",
      value: form.name,
      leftIcon: <FaUser />,
      variant: "signup",
    },
    {
      label: "Email",
      placeholder: "Adam@gmail.com",
      required: true,
      type: "email",
      name: "email",
      value: form.email,
      leftIcon: <FaEnvelope />,
      variant: "signup",
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
      value: form.password,
      showToggle: true,
      leftIcon: <FaLock />,
      variant: "signup",
    },
    {
      label: "Confirm Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "confirmPassword",
      showToggle: true,
      value: form.confirmPassword,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    const passwordValidationId = "password-match-validation";
    if (confirmPassword !== rest.password) {
      if (!toast.isActive(passwordValidationId)) {
        return toast.error("Passwords don't match", {
          toastId: passwordValidationId,
        });
      }
      return;
    }
    const pendingToastId = "sing-up-pending";
    const pendingResponse = postUser(form);
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

    const { status, message } = await pendingResponse;
    const resultToastId = `login-result-${status}-${message}`;
    if (!toast.isActive(resultToastId)) {
      toast[status](message, { toastId: resultToastId });
    }
    if (status === "success") {
      setForm(initialState);
      navigate("/");
    }
  };
  return (
    <div className="bg-white border rounded p-4">
      <h2
        className="mb-4 fw-bold"
        style={{
          color: "#00573f",
        }}
      >
        Create an Account!
      </h2>
      <Form className="text-secondary" onSubmit={handleOnSubmit}>
        {fields.map((field) => (
          <CustomInput key={field.name} {...field} onChange={handleOnChange} />
        ))}
        <div className="d-grid">
          <Button className="submitButton" type="submit">
            Submit
          </Button>
        </div>
        <div>
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <label
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login here
            </label>
          </p>
        </div>
      </Form>
    </div>
  );
};

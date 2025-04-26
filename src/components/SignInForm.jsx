import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useForm } from "../hooks/useForm";

export const SignInForm = () => {
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
  const { form, setForm, handleOnChange } = useForm(initialState);
  //   const [form, setForm] = useState({});
  //   const handleOnChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm({
  //       ...form,
  //       [name]: value,
  //     });
  //   };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
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

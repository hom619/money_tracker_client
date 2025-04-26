import { useState } from "react";
//Custom hook to handle form state and changes
// This hook takes an initial state and returns the form state, a function to set the form state, and a function to handle changes in the form inputs
// It uses the useState hook to manage the form state and the handleOnChange function to update the form state when an input changes
const handleOnChange = ({ e, form, setForm }) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: value,
  });
};
export const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};

import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const CustomInput = ({
  label,
  name,
  leftIcon,
  rightIcon,
  type = "text",
  showToggle = false,
  onChange,
  value,
  placeholder,
  variant = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password" && showToggle;
  const inputGroupClass = `input-group custom-input-${variant}`;
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <InputGroup className={inputGroupClass}>
        {leftIcon && (
          <InputGroup.Text className="bg-white border-end-0">
            {leftIcon}
          </InputGroup.Text>
        )}

        <Form.Control
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={leftIcon ? "border-start-0" : ""}
        />

        {isPassword ? (
          <InputGroup.Text
            className="bg-white border-start-0"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        ) : rightIcon ? (
          <InputGroup.Text className="bg-white border-start-0">
            {rightIcon}
          </InputGroup.Text>
        ) : null}
      </InputGroup>
    </Form.Group>
  );
};

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";

// Custom input using Bootstrap button
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Button
    variant="outline-white"
    onClick={onClick}
    ref={ref}
    className="d-flex align-items-center gap-2 rounded-pill px-3 py-2"
    style={{ borderColor: "#ccc", fontSize: "0.9rem" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="black"
      className="bi bi-calendar"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v1H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM0 5v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5H0zm2 2h2v2H2V7zm3 0h2v2H5V7zm3 0h2v2H8V7z" />
    </svg>
    {value || "Select Date"}
  </Button>
));

export default function CustomDatePicker({ selectedDate, onChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      customInput={<CustomInput />}
      popperPlacement="bottom-start"
    />
  );
}

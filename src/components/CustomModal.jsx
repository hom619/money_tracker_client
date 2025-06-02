import React from "react";
import { useUser } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const CustomModal = ({ children }) => {
  const { toggleModal, show } = useUser();

  return (
    <>
      <Modal
        show={show}
        onHide={() => toggleModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

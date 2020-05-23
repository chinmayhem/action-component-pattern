import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";

export const DeleteConfirmation = ({ onSubmit, onCancel, show, isWIP }) => {
  return (
    <Modal
      onClose={onCancel}
      closeable
      isOpen={show}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Delete???</ModalHeader>
      <ModalBody>You sure you want to delete?</ModalBody>
      <ModalFooter>
        <ModalButton disabled={isWIP} onClick={onCancel}>
          Cancel
        </ModalButton>
        <ModalButton disabled={isWIP} onClick={onSubmit}>
          Yes, delete!!!!
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

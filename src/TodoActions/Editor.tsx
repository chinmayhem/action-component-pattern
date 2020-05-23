import React, { useCallback, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import { Input } from "baseui/input";

export const Editor = ({ todo, onSubmit, onCancel, show, isWIP }) => {
  const [value, setValue] = React.useState(todo.value);
  const onEdit = useCallback(() => {
    onSubmit({ ...todo, value });
  }, [value, todo, onSubmit]);
  useEffect(() => {
    setValue(todo.value);
  }, [todo.value, show]);
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
      <ModalHeader>Edit</ModalHeader>
      <ModalBody>
        <Input
          disabled={isWIP}
          value={value}
          //@ts-ignore
          onChange={e => setValue(e.target.value)}
          placeholder="Controlled Input"
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton disabled={isWIP} onClick={onCancel}>
          Cancel
        </ModalButton>
        <ModalButton disabled={isWIP} onClick={onEdit}>
          Submit
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

import React from "react";
import { Editor } from "./Editor";
import { DeleteConfirmation } from "./DeleteConfirmation";

import { useTodoActions } from "./useTodoActions";

const TodoActions = ({ children, todo, onUpdate, onDelete }) => {
  const {
    actions,
    state,
    onAction,
    onEditorSubmit,
    onDeleteSubmit,
    onOverlayCancel
  } = useTodoActions({ todo, onUpdate, onDelete }); //All the business logic is contained inside the hook.

  return (
    <>
      {children({
        actions,
        state,
        onAction
      })}
      {/* 
          render all the temporary components which are
          triggered during handling of actions 
      */}
      <Editor
        show={state.selectedActionType === "EDIT"}
        todo={todo}
        onSubmit={onEditorSubmit}
        onCancel={onOverlayCancel}
        isWIP={state.loading}
      />
      <DeleteConfirmation
        show={state.selectedActionType === "DELETE"}
        onSubmit={onDeleteSubmit}
        onCancel={onOverlayCancel}
        isWIP={state.loading}
      />
    </>
  );
};

export { TodoActions };

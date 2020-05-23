import React from "react";
import { TodoActions } from "../TodoActions";
import { TodoCard } from "./TodoCard";

export const TodoItem = ({ todo, onUpdate, onDelete }) => {
  return (
    /* 
      RenderProp for
      1. generating `actions` and action handlers
      2. handle mounting of any Modals/Popovers/FullScreenForms
    */
    <TodoActions todo={todo} onUpdate={onUpdate} onDelete={onDelete}>
      {({ actions, state, onAction }) => {
        return (
          <TodoCard
            todo={todo}
            actions={actions}
            state={state}
            onAction={onAction}
          />
        );
      }}
    </TodoActions>
  );
};

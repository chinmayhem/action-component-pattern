import React, { useState, useCallback, useMemo } from "react";
import { Button, SIZE, KIND } from "baseui/button";
import "./styles.css";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

import { TodoItem } from "./TodoItem";

const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const TODOS = [
  {
    value: "Waking up at 9",
    id: 1,
    completed: false,
    permissions: {
      canEdit: false,
      canDelete: true,
    },
  },
  {
    value: "Cooking lunch",
    id: 2,
    completed: true,
    permissions: {
      canDelete: true,
      canEdit: true,
    },
  },
  {
    value: "Enjoying a power nap",
    id: 3,
    completed: false,
    permissions: {
      canDelete: false,
      canEdit: true,
    },
  },
];

export default function App() {
  const [todoList, setTodoList] = useState(TODOS);

  const onUpdate = useCallback(
    (todo) => {
      setTodoList((_todoList) => {
        return _todoList.map((td) => (td.id === todo.id ? todo : td));
      });
    },
    [setTodoList]
  );

  const onDelete = useCallback(
    (todo) => {
      setTodoList((_todoList) => {
        return _todoList.filter((td) => td.id !== todo.id);
      });
    },
    [setTodoList]
  );

  const showSingleTodoItem = useMemo(
    () => new URL(window.location.href).searchParams.has("onlyOneTodoItem"),
    []
  );

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <div className={`App ${showSingleTodoItem ? 'App-single-todo': ''}`}>
            <h1>Action Component in action</h1>
            <Button
              data-id="reset"
              onClick={() => setTodoList(TODOS)}
              kind={KIND.minimal}
              size={SIZE.mini}
            >
              Reset
            </Button>
            <ul>
              {todoList.map((todoItem) => (
                <TodoItem
                  key={todoItem.id}
                  todo={todoItem}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

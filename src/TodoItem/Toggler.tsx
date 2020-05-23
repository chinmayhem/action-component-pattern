import React from "react";
import { Block } from "baseui/block";

import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

const Toggler = ({ onChange, todo, disabled }) => (
  <Checkbox
    disabled={disabled}
    checked={todo.completed}
    onChange={onChange}
    labelPlacement={LABEL_PLACEMENT.right}
  >
    <Block $style={todo.completed ? { textDecoration: "line-through" } : {}}>
      {todo.value}
    </Block>
  </Checkbox>
);

export { Toggler };

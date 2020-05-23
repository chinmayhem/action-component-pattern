import React, { useCallback, useMemo } from "react";
import { Card } from "baseui/card";
import { Block } from "baseui/block";

import { Button, SHAPE } from "baseui/button";
import { Toggler } from "./Toggler";

/*
  render actions as you want
*/
const TodoCard = ({ todo, actions, onAction, state }) => {
  const { selectedActionType, loading } = state;

  /**
   * extracting out an action to render it differently
   */
  const toggleAction = actions.find(act => act.type === "TOGGLE");
  const onToggle = useCallback(() => {
    onAction(toggleAction);
  }, [onAction, toggleAction]);

  const filteredActions = useMemo(
    () => actions.filter(act => act.type !== "TOGGLE"),
    [actions]
  );

  return (
    <Card
      overrides={
        loading
          ? { Root: { style: { opacity: "0.4", cursor: "not-allowed" } } }
          : undefined
      }
    >
      <Block display="flex" alignItems="center" minWidth="300px">
        <Block flex="1">
          <Toggler
            onChange={onToggle}
            todo={todo}
            disabled={!toggleAction /* using `toggleAction` as a flag */}
          />
        </Block>
        <Block marginLeft="auto" flex="0 0 auto" display="flex">
          {filteredActions.map(action => {
            /* render actions as you like */

            return (
              <Block marginLeft="10px" flex="0 0 auto" key={action.type}>
                <Button
                  shape={SHAPE.round}
                  disabled={loading}
                  onClick={() => onAction(action)}
                >
                  <Block height="20px" width="20px">
                    {action.icon}
                  </Block>
                </Button>
              </Block>
            );
          })}
        </Block>
      </Block>
    </Card>
  );
};

export { TodoCard };

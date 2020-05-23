import { useCallback } from "react";

/* a way to mock network delay */
function getWaitTime() {
  return 200 + Math.floor(Math.random() * 500);
}

function getNetworkPromise(resolveWith) {
  return new Promise(res => setTimeout(() => res(resolveWith), getWaitTime()));
}

export const useTodoUpdateMutation = ({ onSuccess, onError }) => {
  /*
    use actual useMutation
  */

  const mutate = useCallback(
    todo =>
      getNetworkPromise(todo)
        .then(updatedTodo => {
          onSuccess(updatedTodo);
          return updatedTodo;
        })
        .catch(onError),
    [onSuccess, onError]
  );

  return [mutate];
};

import { useCallback } from "react";

/* a way to mock network delay */
function getWaitTime() {
  return 200 + Math.floor(Math.random() * 500);
}

function getNetworkPromise() {
  return new Promise(res => setTimeout(res, getWaitTime()));
}

export const useTodoDeleteMutation = ({ onSuccess, onError }) => {
  /*
    use actual useMutation
  */

  const mutate = useCallback(
    todoId =>
      getNetworkPromise()
        .then(onSuccess)
        .catch(onError),
    [onSuccess, onError]
  );

  return [mutate];
};

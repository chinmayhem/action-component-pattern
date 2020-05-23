import { useCallback, useState, useMemo } from "react";
import { useTodoUpdateMutation } from "./useTodoUpdateMutation";


type Action = {
  type: string;
  label: string;
  icon?: string;
};

type ViewState = {
  activeAction: Action | null;
  loading: boolean;
}

const useTodoActions = ({ todo, onUpdate, onDelete }) => {
  const [viewState, setViewState] = useState<ViewState>({
    activeAction: null,
    loading: false,
  });

  const [updateTodo] = useTodoUpdateMutation({
    onSuccess: () => {},
    onError: () => {},
  });
  const [deleteTodo] = useTodoUpdateMutation({
    onSuccess: () => {},
    onError: () => {},
  });
  /*
    create actions here
  */
  const actions = useMemo(() => {
    const actionList: Action[] = [];
    if (todo.permissions.canEdit) {
      actionList.push({ type: "TOGGLE", label: "Toggle Status" });
      actionList.push({ type: "EDIT", icon: "✎", label: "Edit todo" });
    }
    if (todo.permissions.canDelete) {
      actionList.push({ type: "DELETE", icon: "🗑", label: "Delete todo" });
    }
    return actionList;
  }, [todo.permissions]);

  /*
    the handler which is passed to the child function
    for handling all the actions
  */
  const onAction = useCallback(
    (action) => {
      switch (action.type) {
        case "DELETE": {
          setViewState((prev) => ({ ...prev, activeAction: action }));
          break;
        }
        case "EDIT": {
          setViewState((prev) => ({ ...prev, activeAction: action }));
          break;
        }
        case "TOGGLE": {
          setViewState((prev) => ({ ...prev, loading: true }));
          updateTodo({ ...todo, completed: !todo.completed }).then(
            (updatedTodo) => {
              setViewState((prev) => ({
                ...prev,
                activeAction: null,
                loading: false,
              }));

              // dispatch to update in store
              onUpdate(updatedTodo);
            }
          );
          break;
        }
      }
    },
    [updateTodo, todo, onUpdate]
  );

  /*
    handling actions from all the temporary components mounted
    as a result of users' actions
  */
  const onOverlayAction = useCallback(
    (action) => {
      setViewState((prev) => ({ ...prev, loading: true }));
      switch (action.type) {
        case "ON_EDIT_SUBMIT":
          updateTodo(action.payload.todo).then((updatedTodo) => {
            setViewState((prev) => ({
              ...prev,
              activeAction: null,
              loading: false,
            }));

            // dispatch to update in store
            onUpdate(updatedTodo);
          });
          break;
        case "ON_DELETE_SUBMIT":
          deleteTodo(action.payload.todo.id).then(() => {
            setViewState((prev) => ({
              ...prev,
              activeAction: null,
              loading: false,
            }));

            // dispatch to update in store
            onDelete(action.payload.todo);
          });
          break;
        default:
          break;
      }
    },
    [updateTodo, deleteTodo, onDelete, onUpdate]
  );

  const onEditorSubmit = useCallback(
    (todo) => {
      return onOverlayAction({ type: "ON_EDIT_SUBMIT", payload: { todo } });
    },
    [onOverlayAction]
  );

  const onDeleteSubmit = useCallback(() => {
    return onOverlayAction({ type: "ON_DELETE_SUBMIT", payload: { todo } });
  }, [onOverlayAction, todo]);

  const activeActionType = viewState.activeAction?.type;

  const onOverlayCancel = useCallback(() => {
    setViewState((prev) => ({ ...prev, activeAction: null }));
  }, []);

  const state = useMemo(
    () => ({
      selectedActionType: activeActionType,
      loading: viewState.loading,
    }),
    [activeActionType, viewState.loading]
  );

  return {
    actions,
    state,
    onAction: actions.length ? onAction : undefined,
    onEditorSubmit,
    onDeleteSubmit,
    onOverlayCancel,
  };
};

export { useTodoActions };

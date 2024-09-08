export const useRequestDeleteTodoModule = (setRefreshPage, refreshPage) => {
  const requestDeleteTodo = (value) => {
    fetch(`http://localhost:3005/todos/${value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => {
      setRefreshPage(!refreshPage);
    });
  };
  return {
    requestDeleteTodo,
  };
};

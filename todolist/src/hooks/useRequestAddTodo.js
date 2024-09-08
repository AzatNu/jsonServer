import { useState } from "react";

export const useRequestAddTodoModule = (
  TODOLIST,
  setTODOLIST,
  setErrorMessage
) => {
  const [isAdding, setIsAdding] = useState(false);
  const requestAddTodo = (value) => {
    if (TODOLIST.find((item) => item.title === value)) {
      setErrorMessage("Задача с таким названием уже существует");
      return;
    } else if (value === "") {
      setErrorMessage("Название задачи не может быть пустым");
      return;
    } else {
      setIsAdding(true);
      fetch("http://localhost:3005/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTODOLIST((lastState) => [...lastState, data]);
        })
        .finally(() => {
          setIsAdding(false);
        });
    }
  };

  return {
    requestAddTodo,
    isAdding,
  };
};

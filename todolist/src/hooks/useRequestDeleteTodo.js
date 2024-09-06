export const useRequestDeleteTodoModule = (setTODOLIST) => {
    const requestDeleteTodo = (value) => {
        fetch(`http://localhost:3005/todos/${value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    return {
        requestDeleteTodo,
    };
};

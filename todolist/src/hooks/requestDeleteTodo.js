export const RequestDeleteTodoModule = (setTODOLIST) => {
    const requestDeleteTodo = (value) => {
        fetch(`http://localhost:3005/todos/${value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTODOLIST(data);
            });
    };
    return {
        requestDeleteTodo,
    };
};

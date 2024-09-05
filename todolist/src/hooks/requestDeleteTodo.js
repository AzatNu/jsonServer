import { useState } from "react";
export const RequestDeleteTodoModule = (setTODOLIST) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const requestDeleteTodo = (value) => {
        setIsDeleting(true);
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
        isDeleting,
        setIsDeleting,
    };
};

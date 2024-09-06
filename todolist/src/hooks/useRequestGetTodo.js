import { useEffect, useState } from "react";
export const useRequestGetTodoModule = (setTODOLIST, refreshPage) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const requestGetTodo = () => {
            setIsLoading(true);
            fetch("http://localhost:3005/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTODOLIST(data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        };

        requestGetTodo();
    }, [refreshPage, setTODOLIST]);

    return { isLoading };
};

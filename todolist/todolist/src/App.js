import style from "./App.module.css";

import { useState, useEffect } from "react";
import {
    RequestAddTodoModule,
    RequestDeleteTodoModule,
    RequestUpdateTodoModule,
} from "./hooks";

export const App = () => {
    const [TODOLIST, setTODOLIST] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [updateInputValue, setUpdateInputValue] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);
    const [sortButtonClicked, setSortButtonClick] = useState(false);
    const [Id, setId] = useState(0);
    const [updateButtonClicked, setUpdateButtonClick] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:3005/todos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) =>
                response.json().then((data) => {
                    setTODOLIST(data);
                })
            )
            .finally(() => {
                setIsLoading(false);
            });
    }, [refreshPage]);
    useEffect(() => {
        sortTODOLIST();
    }, [sortButtonClicked]);

    const { requestAddTodo, isAdding } = RequestAddTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );
    const { requestDeleteTodo } = RequestDeleteTodoModule(setTODOLIST);
    const { requestUpdateTodo } = RequestUpdateTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );

    const sortTODOLIST = () => {
        if (!sortButtonClicked) {
            TODOLIST.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            TODOLIST.sort((a, b) => b.title.localeCompare(a.title));
        }
    };

    const serchInTODOLIST = () => {
        if (addInputValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else {
            const newTODOLIST = TODOLIST.filter((todo) =>
                todo.title
                    .toLowerCase()
                    .trim()
                    .includes(addInputValue.toLowerCase().trim())
            );
            setTODOLIST(newTODOLIST);
        }
    };

    return (
        <div className={style["App"]}>
            {isLoading && <div className={style["loader"]}></div>}
            {errorMessage !== "" && (
                <div className={style["errorWindow"]}>
                    <h2>{errorMessage}</h2>
                    <button
                        onClick={() => setErrorMessage("")}
                        className={style["closeErrorWindow"]}
                    >
                        OK
                    </button>
                </div>
            )}
            <h1 className={style["title"]}>TODOLIST</h1>
            <div className={style["content"]}>
                <div className={style["serch-sort-module"]}>
                    <input
                        className={style["search-input"]}
                        placeholder="Найти задачу или добавить её"
                        type="text"
                        value={addInputValue}
                        onChange={(e) => setAddInputValue(e.target.value)}
                    ></input>
                    <button
                        onClick={() => serchInTODOLIST()}
                        className={style["serch-button"]}
                    >
                        Найти
                    </button>
                    <button
                        onClick={() => {
                            setRefreshPage(!refreshPage);
                            setAddInputValue("");
                        }}
                        className={style["serch-button"]}
                    >
                        Сбросить
                    </button>
                    <button
                        onClick={() => setSortButtonClick(!sortButtonClicked)}
                        className={style["serch-button"]}
                    >
                        {sortButtonClicked ? "A — я" : "я — A"}
                    </button>
                    <button
                        onMouseOver={(e) =>
                            (e.currentTarget.title = "Добавить задачу")
                        }
                        onMouseOut={(e) => (e.currentTarget.title = "")}
                        disabled={isAdding}
                        onClick={() => {
                            setSortButtonClick(!sortButtonClicked);
                            requestAddTodo(addInputValue);
                            setRefreshPage(!refreshPage);
                            setAddInputValue("");
                        }}
                        className={style["add"]}
                    >
                        +
                    </button>
                </div>
                {TODOLIST.length === 0 && (
                    <h2 className={style["empty"]}>Задачи отсутствуют</h2>
                )}
                {Object.keys(TODOLIST).map((item) => (
                    <div className={style["item"]} key={item.id}>
                        <button
                            className={style["delete"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Удалить задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                requestDeleteTodo(TODOLIST[item].id);
                                setRefreshPage(!refreshPage);
                            }}
                        >
                            X
                        </button>
                        <button
                            className={style["update"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Редактировать задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                setUpdateButtonClick(true);
                                setId(TODOLIST[item].id);
                            }}
                        >
                            &#x270E;
                        </button>
                        {`Задача: ${TODOLIST[item].id}`} —{" "}
                        {TODOLIST[item].title}
                    </div>
                ))}
                <div className={style["buttons"]}>
                    {updateButtonClicked && (
                        <div className={style["modal"]}>
                            <div className={style["modal-content"]}>
                                <h2>Введите новый текст для задачи</h2>
                                <input
                                    placeholder="Новый текст для задачи"
                                    className={style["modal-input"]}
                                    type="text"
                                    value={updateInputValue}
                                    onChange={(e) =>
                                        setUpdateInputValue(e.target.value)
                                    }
                                />
                                <button
                                    onClick={() => {
                                        requestUpdateTodo(updateInputValue, Id);
                                        setUpdateButtonClick(false);
                                        setUpdateInputValue("");
                                        setRefreshPage(!refreshPage);
                                    }}
                                    className={style["modal-button"]}
                                >
                                    &#x2714; Обновить
                                </button>
                                <button
                                    onClick={() => {
                                        setUpdateButtonClick(false);
                                    }}
                                    className={style["modal-button"]}
                                >
                                    &#x2716; Закрыть
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

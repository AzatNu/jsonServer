import style from "./App.module.css";
import { SearchSort } from "./components/searchSrotComponent";
import { useState, useEffect } from "react";
import {
  useRequestAddTodoModule,
  useRequestDeleteTodoModule,
  useRequestUpdateTodoModule,
  useRequestGetTodoModule,
} from "./hooks";
import { ModalWindow } from "./components/errorMessageModalWinowComponent";
import { AddModalWindow } from "./components/addModalWindowComponent";

export const App = () => {
  const [TODOLIST, setTODOLIST] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [addInputValue, setAddInputValue] = useState("");
  const [updateInputValue, setUpdateInputValue] = useState("");
  const [refreshPage, setRefreshPage] = useState(false);
  const [sortButtonClicked, setSortButtonClick] = useState(false);
  const [Id, setId] = useState(0);
  const [updateButtonClicked, setUpdateButtonClick] = useState(false);

  useEffect(() => {
    sortTODOLIST();
  }, [sortButtonClicked]);
  const { isLoading } = useRequestGetTodoModule(setTODOLIST, refreshPage);
  const { requestAddTodo, isAdding } = useRequestAddTodoModule(
    TODOLIST,
    setTODOLIST,
    setErrorMessage
  );
  const { requestDeleteTodo } = useRequestDeleteTodoModule(
    setRefreshPage,
    refreshPage
  );
  const { requestUpdateTodo } = useRequestUpdateTodoModule(
    TODOLIST,
    setTODOLIST,
    setErrorMessage,
    setRefreshPage,
    refreshPage
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
      <ModalWindow
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <h1 className={style["title"]}>TODOLIST</h1>
      <div className={style["content"]}>
        <SearchSort
          addInputValue={addInputValue}
          setAddInputValue={setAddInputValue}
          serchInTODOLIST={serchInTODOLIST}
          setRefreshPage={setRefreshPage}
          refreshPage={refreshPage}
          setSortButtonClick={setSortButtonClick}
          sortButtonClicked={sortButtonClicked}
          isAdding={isAdding}
          requestAddTodo={requestAddTodo}
        />
        {!isLoading && TODOLIST.length === 0 && (
          <h2 className={style["empty"]}>Задачи отсутствуют</h2>
        )}
        {Object.keys(TODOLIST).map((item, index) => (
          <div className={style["item"]} key={index}>
            <button
              className={style["delete"]}
              onMouseOver={(e) => (e.currentTarget.title = "Удалить задачу")}
              onMouseOut={(e) => (e.currentTarget.title = "")}
              onClick={() => {
                requestDeleteTodo(TODOLIST[item].id);
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
            {`Задача: ${TODOLIST[item].id}`} — {TODOLIST[item].title}
          </div>
        ))}
        <div className={style["buttons"]}>
          <AddModalWindow
            updateInputValue={updateInputValue}
            setUpdateInputValue={setUpdateInputValue}
            requestUpdateTodo={requestUpdateTodo}
            Id={Id}
            setUpdateButtonClick={setUpdateButtonClick}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
            updateButtonClicked={updateButtonClicked}
          />
        </div>
      </div>
    </div>
  );
};

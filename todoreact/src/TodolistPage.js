import React, { useState, useRef, useCallback, useEffect } from "react";
import Todolist from "./Todolist";
import produce from "immer";
import { useRecoilState } from "recoil";
import { todoListState } from "./atom";
import { ProgressBar, ListGroup, Button } from "react-bootstrap";

const TodolistPage = () => {
  const [todoInputValue, setTodoInputValue] = useState("");
  // const [todoList, setTodoList] = useState([]);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoInputRef = useRef(null);

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const changeInputValue = useCallback(
    (e) => {
      setTodoInputValue(e.target.value);
    },
    [todoInputValue]
  );

  const addTodo = useCallback(
    (e) => {
      e.preventDefault();
      // setTodoList((v) => [...v, todoInputValue]);
      setTodoList(
        produce(todoList, (draft) => {
          draft.push({ content: todoInputValue, complete: false });
        })
      );
      setTodoInputValue("");
      todoInputRef.current.focus();
    },
    [todoInputValue]
  );

  return (
    <>
      <h1 className="d-flex justify-content-center border-bottom py-3">
        ToDoList
      </h1>
      <form
        className="d-flex align-items-center flex-column "
        onSubmit={addTodo}
      >
        <input
          placeholder="write your todo"
          className="w-50"
          type="text"
          value={todoInputValue}
          ref={todoInputRef}
          onChange={changeInputValue}
          required
        />
        <Button variant="success" className="w-25 my-3" type="submit">
          add your todo
        </Button>
      </form>
      <div className="d-flex justify-content-around">
        <div className="w-25">
          <h1>unComplete</h1>
          <div>
            <ListGroup>
              {todoList.map((v, i) =>
                v.complete === false ? (
                  <Todolist
                    key={(v, i)}
                    index={i}
                    content={v.content}
                    complete={v.complete}
                  />
                ) : null
              )}
            </ListGroup>
          </div>
        </div>
        <div className="w-25">
          <h1>Complete</h1>
          <ListGroup>
            {todoList.map((v, i) =>
              v.complete === true ? (
                <Todolist
                  key={(v, i)}
                  index={i}
                  content={v.content}
                  complete={v.complete}
                />
              ) : null
            )}
          </ListGroup>
        </div>
      </div>
      <ProgressBar
        className="mt-5"
        animated
        variant="success"
        now={
          !isNaN(
            todoList.filter((v) => v.complete === true).length / todoList.length
          )
            ? parseInt(
                (todoList.filter((v) => v.complete === true).length /
                  todoList.length) *
                  100
              )
            : null
        }
      />
    </>
  );
};

export default TodolistPage;

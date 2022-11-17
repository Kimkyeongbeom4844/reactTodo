import React, { useState, useRef, useCallback, useEffect } from "react";
import Todolist from "./Todolist";
import produce from "immer";
import { useRecoilState, useResetRecoilState } from "recoil";
import { todoListState } from "./atom";
import { ProgressBar, ListGroup, Button } from "react-bootstrap";

const TodolistPage = () => {
  const [todoInputValue, setTodoInputValue] = useState("");
  // const [todoList, setTodoList] = useState([]);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoInputRef = useRef(null);
  const resetTodoList = useResetRecoilState(todoListState);

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list`
    )
      .then((res) => res.json())
      .then((data) => {
        const arr = [];
        for (let i of data) {
          arr.push({
            contentId: i.id,
            content: i.content,
            complete: i.complete === 0 ? false : true,
          });
        }
        setTodoList(
          produce(todoList, (draft) => {
            draft.push(...arr);
          })
        );
      });
    return () => {
      resetTodoList();
    };
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
      fetch(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ content: todoInputValue }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list/${data.message}`
          )
            .then((res) => res.json())
            .then((data) => {
              setTodoList(
                produce(todoList, (draft) => {
                  draft.push({
                    contentId: data[0].id,
                    content: data[0].content,
                    complete: data[0].complete === 0 ? false : true,
                  });
                })
              );
            });
        });
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
                    key={v.contentId}
                    index={v.contentId}
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
                  key={v.contentId}
                  index={v.contentId}
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

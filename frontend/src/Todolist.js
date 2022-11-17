import React, { memo, useCallback } from "react";
import { todoListState } from "./atom";
import { useRecoilState } from "recoil";
import produce from "immer";
import { CloseButton, ListGroup } from "react-bootstrap";

const randomColor = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

const Todolist = memo(({ index, content, complete }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const changeComplete = useCallback(
    (e) => {
      fetch(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list/${e.target.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            complete: e.target.checked,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTodoList(
            produce(todoList, (draft) => {
              draft[
                draft.findIndex((v) => v.contentId === Number(data.contentId))
              ].complete = data.complete;
            })
          );
        });
    },
    [todoList]
  );

  const deleteList = useCallback(
    (e) => {
      console.log(e.target.parentElement.firstElementChild.name);
      setTodoList(
        produce(todoList, (draft) => {
          draft.splice(
            Number(e.target.parentElement.firstElementChild.name),
            1
          );
        })
      );
      fetch(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list/${e.target.parentElement.firstElementChild.name}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTodoList(
            produce(todoList, (draft) => {
              draft.splice(
                draft.findIndex((v) => v.contentId === Number(data.contentId)),
                1
              );
            })
          );
        });
    },
    [todoList]
  );

  return (
    <>
      <label>
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center"
          variant={randomColor[Math.floor(Math.random() * 7.999999)]}
        >
          <span className="fw-bold fs-5">{content}</span>
          <div>
            {complete === true ? (
              <input
                // className="d-none"
                name={index}
                type="checkbox"
                onChange={changeComplete}
                checked
              />
            ) : (
              <>
                <input
                  // className="d-none"
                  name={index}
                  type="checkbox"
                  onChange={changeComplete}
                />
              </>
            )}
            <CloseButton onClick={deleteList} />
          </div>
        </ListGroup.Item>
      </label>
    </>
  );
});
Todolist.displayName = "Todolist";

export default Todolist;

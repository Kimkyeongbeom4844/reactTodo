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
      if (e.target.checked) {
        setTodoList(
          produce(todoList, (draft) => {
            draft[e.target.name].complete = true;
          })
        );
      } else {
        setTodoList(
          produce(todoList, (draft) => {
            draft[e.target.name].complete = false;
          })
        );
      }
    },
    [todoList]
  );

  const deleteList = (e) => {
    console.log(e.target.parentElement.firstElementChild.name);
    setTodoList(
      produce(todoList, (draft) => {
        draft.splice(Number(e.target.parentElement.firstElementChild.name), 1);
      })
    );
  };

  return (
    <>
      <label>
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center"
          variant={randomColor[parseInt(Math.random() * 6.99999)]}
        >
          <span className="fw-bold fs-5">{content}</span>
          <div>
            {complete === true ? (
              <input
                className="d-none"
                name={index}
                type="checkbox"
                onChange={changeComplete}
                checked
              />
            ) : (
              <>
                <input
                  className="d-none"
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

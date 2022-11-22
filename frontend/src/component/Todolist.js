import React, { memo, useCallback } from "react";
import { todoListState, randomColorState } from "../state/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import produce from "immer";
import { CloseButton, ListGroup } from "react-bootstrap";
import { fetcher } from "../api/api";

const Todolist = memo(({ index, content, complete }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const randomColor = useRecoilValue(randomColorState);

  const changeComplete = useCallback(
    (e) => {
      fetcher(`/${e.target.name}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          complete: e.target.checked,
        }),
      }).then((data) => {
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
      setTodoList(
        produce(todoList, (draft) => {
          draft.splice(
            Number(e.target.parentElement.firstElementChild.name),
            1
          );
        })
      );
      fetcher(`/${e.target.parentElement.firstElementChild.name}`, {
        method: "DELETE",
      }).then((data) => {
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

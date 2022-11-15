import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodolistPage from "./TodolistPage";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <TodolistPage />
      </RecoilRoot>
    </>
  );
};

export default App;

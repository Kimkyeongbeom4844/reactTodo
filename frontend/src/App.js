import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodolistPage from "./page/TodolistPage";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./page/NotFound";
import { GlobalStyle } from "./style/style";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<TodolistPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;

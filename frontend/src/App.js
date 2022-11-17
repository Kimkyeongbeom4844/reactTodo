import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodolistPage from "./TodolistPage";
import { RecoilRoot } from "recoil";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import GlobalStyle from "./GlobalStyle";

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

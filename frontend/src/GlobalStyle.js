import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    user-select: none;
    accent-color: green;
  }
`;

export default GlobalStyle;

import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const randomColorState = atom({
  key: "randomColor",
  default: [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ],
});

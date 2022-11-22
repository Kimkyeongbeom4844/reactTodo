export const listDatabase = (where, content) =>
  fetch(
    `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list${where}`,
    content ?? { method: "GET" }
  ).then((res) => res.json());

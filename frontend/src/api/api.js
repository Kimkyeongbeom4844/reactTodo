export const fetcher = (url, options) =>
  fetch(
    `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/list${url}`,
    options ?? { method: "GET" }
  ).then((res) => res.json());

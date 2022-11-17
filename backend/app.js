const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/db");
const list = require("./router/list");
const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/list", list);

app.listen(process.env.EXPRESS_APP_PORT, process.env.EXPRESS_APP_HOST, () => {
  console.log(
    `app is running on http://${process.env.EXPRESS_APP_HOST}:${process.env.EXPRESS_APP_PORT}`
  );
});

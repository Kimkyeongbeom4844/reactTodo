const express = require("express");
const { sequelize } = require("./models");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/db");
const list = require("./router/list");
const app = express();

app.use(morgan("short"));
sequelize
  .sync({ force: false })
  .then((res) => console.log("sequlize DB is running"))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/list", list);

app.listen(process.env.EXPRESS_APP_PORT, process.env.EXPRESS_APP_HOST, () => {
  console.log(
    `app is running on http://${process.env.EXPRESS_APP_HOST}:${process.env.EXPRESS_APP_PORT}`
  );
});

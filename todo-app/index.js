const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/add", (req, res) => {
  const tods = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(tods);
  res.send(todos);
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

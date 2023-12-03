const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/todos", (req, res) => {
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

app.delete("/todos/:id", (req, res) => {
  parsed_id = parseInt(req.params.id);
  for (i = 0; i < todos.length; i++) {
    if (parsed_id == todos[i].id) {
      index = i;
      break;
    } else {
      index = -1;
    }
  }
  if (index == -1) {
    res.send("todo does not exist");
    res.status(400).send();
  } else {
    new_todo = [];
    for (i = 0; i < todos.length; i++) {
      if (i != index) {
        new_todo.push(todos[i]);
      }
    }
    todos = new_todo;
    res.send(todos);
    res.status(200).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

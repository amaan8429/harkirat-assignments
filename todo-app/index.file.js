const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  fs.readFile("./todos.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      final = JSON.parse(data);
      res.send(final);
    }
  });
});

app.post("/todos", (req, res) => {
  const tods = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("./todos.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong!");
    } else {
      final = JSON.parse(data);

      final.push(tods);
      fs.writeFile("./todos.json", JSON.stringify(final), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
        } else {
          res.send(final);
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

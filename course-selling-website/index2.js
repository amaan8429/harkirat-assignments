const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let ADMINS = [];
let COURSES = [];
const adminSecretKey = "AdminSecretKey";

function createAdminToken(t) {
  return jwt.sign(t, adminSecretKey);
}

function verifyAdminToken(t) {
  return jwt.verify(t, adminSecretKey);
}

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("No auth header provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const { username, password } = verifyAdminToken(token);
    const admin = ADMINS.find(
      (a) => a.username === username && a.password === password
    );

    if (admin) {
      req.admin = admin;
      next();
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

app.post("/admins/signup", (req, res) => {
  const { username, password } = req.body;
  const newAdmin = {
    username,
    password,
    purchasedCourses: [],
  };
  ADMINS.push(newAdmin);

  const token = createAdminToken({ username, password });

  res.status(200).send({
    message: "Admin created successfully",
    admins: ADMINS,
    token,
  });
});

app.post("/admins/login", authenticateAdmin, (req, res) => {
  const { username, password } = req.admin;
  const token = createAdminToken({ username, password });

  res.status(200).send({ message: "You are logged in successfully", token });
});

app.post("/admins/courses", authenticateAdmin, (req, res) => {
  const { title, description, price, imageLink, published } = req.body;

  const newCourse = {
    id: new Date().getTime(),
    title,
    description,
    price,
    imageLink,
    published,
  };

  COURSES.push(newCourse);

  res.status(200).send({
    message: "Course created successfully",
    courseId: newCourse.id,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

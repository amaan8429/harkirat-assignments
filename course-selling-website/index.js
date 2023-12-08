const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

ADMINS = [];
USERS = [];
COURSES = [];

app.post("/admins/signup", (req, res) => {
  const new_user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: [],
  };
  ADMINS.push(new_user);
  res
    .status(200)
    .send({ message: "admin created successfully", admins: ADMINS });
});

app.post("/admins/login", adminAuthentication, (req, res) => {
  user = req.body.username;
  res.status(200).send("you are logged in successfully");
});

function adminAuthentication(req, res, next) {
  const { username, password } = req.headers;
  const admin = ADMINS.find(
    (admin) => admin.username === username && admin.password === password
  );
  if (admin) {
    req.username = username;
    next();
  } else {
    res.status(401).send("login authentication failed");
  }
}

app.post("/admins/courses", adminAuthentication, (req, res) => {
  const new_course = {
    id: new Date().getTime(), //
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    published: req.body.published,
  };
  if (new_course) {
    COURSES.push(new_course);
    res.status(200).send({
      message: "Course created successfully",
      courseId: new_course.id,
    });
  } else {
    res.status(400).send("failed to add a course");
  }
});

//USER ROUTES
app.post("/users/signup", (req, res) => {
  const new_user = {
    username: req.body.username,
    password: req.body.password,
  };
  USERS.push(new_user);
  res
    .status(200)
    .send({ message: "admin created successfully", admins: USERS });
});

app.post("/users/login", userAuthentication, (req, res) => {
  user = req.body.username;
  res.status(200).send("you are logged in successfully");
});

function userAuthentication(req, res, next) {
  const { username, password } = req.headers;
  const user = USERS.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    req.username = username;
    next();
  } else {
    res.status(401).send("login authentication failed");
  }
}

app.get("/users/courses", userAuthentication, (req, res) => {
  let filteredCourses = [];
  for (i = 0; i < COURSES.length; i++) {
    if (COURSES[i].published) {
      filteredCourses.push(COURSES[i]);
    }
  }
  res.send(filteredCourses);
});

app.post("/users/courses/:courseId", userAuthentication, (req, res) => {
  courseId = req.params.courseId;
  const course = COURSES.find((c) => c.id == courseId && c.published == true);
  if (course) {
    req.user.purchasedCourses.push(course);
    res.json({ message: "course purchased successfully" });
  } else {
    res.send("error while purchasin the course");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

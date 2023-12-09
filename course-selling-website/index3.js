const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(bodyParser.json());
const secret = "i-love-momos";

//Defining Mongoose Schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

//Creating models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

//connecting to mongodb
// mongoose.connect(
//   "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/"
// );

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/courses",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

//Routes
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("username and password are required");
  }
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(409).send("admin already exists");
    } else {
      const newAdmin = Admin({ username, password });
      await newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, secret, {
        expiresIn: "1h",
      });
      res.json({ message: "admin created successfully", token: token });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(400).send("username and password are required");
  }
  const admin = await Admin.findOne({ username });
  try {
    if (admin) {
      if (admin.password == password) {
        const token = jwt.sign({ username, role: "admin" }, secret, {
          expiresIn: "1h",
        });
        res.json({ message: "you are successfully logged in", token: token });
      } else {
        res.status(404).json({ message: "password does not match" });
      }
    } else {
      res.status(404).json({ message: "admin does not exist" });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
});

app.post("/admin/add_course", AuthenticateJwt, async (req, res) => {
  try {
    const course = Course(req.body);
    await course.save();
    res
      .status(200)
      .send({ message: "course added successfully", courseId: course.id });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
});

app.put("/admin/:courseId", AuthenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.status(200).send("course has been updated successfully");
  } else {
    res.status(404).send("error while updating the course");
  }
});

app.get("/admin/courses", AuthenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  if (courses) {
    res.status(200).json(courses);
  } else {
    res.status(404).send("can't find your courses");
  }
});

function AuthenticateJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(404).send("No auth header provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).send("No token provided");
  } else {
    try {
      const stuff = jwt.verify(token, secret);
      req.username = stuff.username;
      next();
    } catch {
      res.sendStatus(403);
    }
  }
}

app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("username and password are required");
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(409).send("user already exists");
    } else {
      try {
        const newUser = User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: "user" }, secret, {
          expiresIn: "1h",
        });
        res.json({ message: "user created successfully", token: token });
      } catch (error) {
        res.sendStatus(500);
      }
    }
  } catch (error) {
    res.send("error finding user in the list");
  }
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(400).send("username and password are required");
  }
  const user = await User.findOne({ username });
  if (user) {
    if (user.password == password) {
      const token = jwt.sign({ username, role: "user" }, secret, {
        expiresIn: "1h",
      });
      res.json({ message: "you are successfully logged in", token: token });
    } else {
      res.status(404).json({ message: "password does not match" });
    }
  } else {
    res.status(404).json({ message: "user does not exist" });
  }
});

app.get("/user/courses", AuthenticateJwt, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    if (courses) {
      res.status(200).json(courses);
    } else {
      return res.status(404).send("can't find any courses");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/user/courses/:courseId", AuthenticateJwt, async (req, res) => {
  id = req.params.courseId;
  if (!id) {
    return res.status(404).send("course id is needed");
  }
  const my_course = await Course.findById(id);
  if (my_course) {
    const u = req.username;
    const my_user = await User.findOne({ username: u });
    if (my_user) {
      my_user.purchasedCourses.push(my_course);
      await my_user.save();
      res.status(200).send({
        message: "you have successfully purchased the course",
        my_course,
      });
    } else {
      res.status(404).send("error finding your user");
    }
  } else {
    res.status(404).send("error finding your course");
  }
});

app.get("/user/all_purchased_courses", AuthenticateJwt, async (req, res) => {
  const u = req.username;
  if (!u) {
    return res.status(404).send("username needed");
  }
  const my_user = await User.find({ u });
  if (my_user) {
    const all_courses = my_user.purchasedCourses;
    res.status(200).send({ all_courses });
  } else {
    res.status(404).send("can't find the user");
  }
});

app.get("/user/show_all_courses", AuthenticateJwt, async (req, res) => {
  try {
    const all_pub_courses = await Course.findOne({ published: true });
    if (all_pub_courses) {
      res.status(200).send({ all_courses: all_pub_courses });
    } else {
      res.status(404).send("can't find the courses");
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

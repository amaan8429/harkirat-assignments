const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

app.use(bodyParser.json());

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
mongoose.connect(
  "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/"
);

app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(409).send("admin already exists");
    } else {
      const newAdmin = Admin({ username, password });
      await newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, secret, {
        expiresIn: "1",
      });
      res.json({ message: "admin created successfully", token: token });
    }
  } catch (error) {
    console.log("error finding admin in the list");
  }
});

function adminAuthentication() {}

//Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

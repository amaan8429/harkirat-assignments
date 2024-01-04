import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import SignUp from "./components/signup.jsx";
import Appbar from "./components/appbar.jsx";
import Addcourse from "./components/addcourse.jsx";
import CoursesList from "./components/show_all_course.jsx";
import SingleCourse from "./components/singlecourse.jsx";

function App() {
  return (
    <div style={{ margin: "0", padding: "0", fontFamily: "Helvetica" }}>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/showcourses" element={<CoursesList />} />
          <Route path="/showcourses/:courseId" element={<SingleCourse />} />
          {/* <Route path="/showcourses" element={<CoursesList />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

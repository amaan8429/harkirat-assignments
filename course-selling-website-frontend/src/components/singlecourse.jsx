import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const SingleCourse = () => {
  const [allCourses, setAllCourses] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched courses:", data);
        setAllCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // console.log("All courses:", allCourses);

  const course = allCourses.find((course) => course._id === courseId);
  console.log("Course:", course);
  // console.log("Selected course:", course);

  return (
    <>
      {" "}
      <CourseDetails course={course} />
      <UpdateCourse course={course} />
    </>
  );
};

function CourseDetails(props) {
  // eslint-disable-next-line react/prop-types
  const course = props.course;

  // eslint-disable-next-line react/prop-types
  return (
    <div style={{ padding: "20px" }}>
      {course ? (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "10px" }}>
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {course.description}
          </Typography>
          <Typography variant="body2">Price: ${course.price}</Typography>
          <Typography variant="body2">
            Published Status : {course.published}
          </Typography>
          <Typography variant="body2">
            Image Link : {course.imageLink}
          </Typography>

          {/* <Button variant="contained" style={{ marginTop: "10px" }}>
        Enroll Now
      </Button> */}
        </Paper>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function UpdateCourse(props) {
  const course = props.course;
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Imagelink, setImageLink] = useState("");
  const [Published, setPublished] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "60vw",
        border: "2px solid Black",
        marginTop: "1em",
        marginBottom: "2em",
        margin: "auto",
      }}
    >
      <div style={{ marginBottom: "1em" }}>
        <Typography variant="h5">Update the Course</Typography>
      </div>
      <div>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          id="outlined-basic"
          label="Price"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setImageLink(e.target.value)}
          id="outlined-basic"
          label="ImageLink"
          variant="outlined"
        />
      </div>
      <div>
        <FormControlLabel
          onChange={(e) => {
            setPublished(e.target.checked);
          }}
          required
          control={<Checkbox />}
          label="Published"
        />
      </div>

      <Button
        style={{ marginTop: "4px", marginBottom: "2em" }}
        size="large"
        variant="contained"
        onClick={() => {
          fetch("http://localhost:3000/admin/" + course._id, {
            method: "PUT",
            body: JSON.stringify({
              title: Title,
              description: Description,
              price: Price,
              imageLink: Imagelink,
              published: Published,
            }),
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then(() => window.location.reload());
        }}
      >
        Update the Course
      </Button>
    </div>
  );
}

export default SingleCourse;

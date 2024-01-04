import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
} from "@mui/material";
import SingleCourse from "./singlecourse";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      {courses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="body2">Price: ${course.price}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={(id) => {
                  <SingleCourse id={id} />;
                }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesList;

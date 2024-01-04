import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export default function Addcourse() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Imagelink, setImageLink] = useState("");
  const [Published, setPublished] = useState(false);

  return (
    <center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "60vw",
          border: "2px solid Black",
          marginTop: "1em",
        }}
      >
        <div style={{ marginBottom: "1em" }}>
          <Typography variant="h5">Add a new Course</Typography>
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
          style={{ marginTop: "4px" }}
          size="large"
          variant="contained"
          onClick={() => {
            fetch("http://localhost:3000/admin/add_course", {
              method: "POST",
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
            });
          }}
        >
          Add Course
        </Button>
      </div>
    </center>
  );
}

import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Appbar() {
  const [Useremail, setUserEmail] = useState(null);

  useEffect(() => {
    // Fetch the list of courses from your API endpoint
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserEmail(data.username);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  if (Useremail) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <div>
          <Typography fontWeight={"bold"} variant={"h5"}>
            Udemy
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
          <Typography fontWeight={"bold"} variant={"h6"}>
            {Useremail}
          </Typography>
          <Link to="/login">
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.removeItem("token");
                setUserEmail(null);
              }}
            >
              Logout
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "flex",
        justifyContent: "space-between",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div>
        <Typography fontWeight={"bold"} variant={"h5"}>
          Udemy
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Link to="/signup">
          <Button variant={"contained"}>SignUp</Button>
        </Link>
        <Link to="/login">
          <Button variant={"contained"}>Login</Button>
        </Link>
      </div>
    </div>
  );
}

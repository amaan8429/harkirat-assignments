import { Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card
        variant="outlined"
        id="card-login"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "50vh",
          width: "50vh",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          border: "2px solid black",
          borderRadius: "10%",
        }}
      >
        <Typography
          style={{
            fontSize: "2rem",
            fontWeight: "Bold",
            textAlign: "center",
            marginTop: "3px",
          }}
        >
          SignUp
        </Typography>
        <TextField
          onChange={(e) => SetEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => SetPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          style={{ marginTop: "4px" }}
          size="large"
          variant="contained"
          onClick={() => {
            fetch("http://localhost:3000/admin/signup", {
              method: "POST",
              body: JSON.stringify({ username: Email, password: Password }),
              headers: {
                "Content-type": "application/json",
              },
            }).then((res) => {
              res.json().then((data) => {
                localStorage.setItem("token", data.token);
                window.location = "/";
              });
            });
          }}
        >
          SignUp
        </Button>
        <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography>Already a user?</Typography>
          <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
}

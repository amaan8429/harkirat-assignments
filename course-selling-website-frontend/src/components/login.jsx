import { Button, Card, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: Email, password: Password }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            localStorage.setItem("token", data.token);
            window.location = "/";
            // Redirect or perform any other action upon successful login
          });
        } else {
          res.json().then((data) => {
            console.error(data); // Log the error message
          });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

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
          Login
        </Typography>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          style={{ marginTop: "4px" }}
          size="large"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
        <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography>New user?</Typography>
          <Link to="/signup">SignUp</Link>
        </div>
      </Card>
    </div>
  );
}

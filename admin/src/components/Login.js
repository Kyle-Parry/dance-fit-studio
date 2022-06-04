import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios(
        {
          method: "post",
          url: "http://localhost:8080/auth/adminLogin",
          withCredentials: true,
          data: {
            email: loginEmail,
            password: loginPassword,
          },
        },
        localStorage.setItem("isLoggedIn", "true"),
        setSuccess(true)
      );
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  localStorage.removeItem("isLoggedIn");
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={login}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            marginTop: "10%",
            borderRadius: "25px",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "20%",
              paddingBottom: "20%",
            }}
          >
            Dance Fit Studio Admin
          </Typography>

          <TextField
            required
            id="email"
            label="Email"
            placeholder="Email"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Typography
            variant="p"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "10%",
              paddingBottom: "10%",
              color: "red",
            }}
          >
            {errMsg}
          </Typography>
          <Button type="submit" variant="contained" sx={{ marginTop: "30px" }}>
            Login
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
}
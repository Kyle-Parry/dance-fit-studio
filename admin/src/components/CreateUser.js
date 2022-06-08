import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateClassPage() {
  const [errMsg, setErrMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/admin/createUser",
        data: {
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          password: userPassword,
        },
      }).then((response) => {
        navigate("/Users");
      });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("User failed to create.");
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={createUser}
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
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "5%",
            }}
          >
            Create User
          </Typography>
          <TextField
            required
            id="email"
            label="Email"
            placeholder="Email"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            required
            id="firstName"
            label="First Name"
            placeholder="First Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setUserFirstName(e.target.value)}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setUserLastName(e.target.value)}
          />
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Typography
            variant="p"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              marginTop: "30px",
              color: "red",
            }}
          >
            {errMsg}
          </Typography>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="contained" sx={{ margin: "30px" }}>
              Create
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/Users")}
              sx={{ margin: "20px" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}

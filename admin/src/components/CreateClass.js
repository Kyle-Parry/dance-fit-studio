import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function CreateClassPage() {
  const [errMsg, setErrMsg] = useState("");
  const [CreateClassType, setCreateClassType] = useState("");
  const [CreateDescription, setCreateDescription] = useState("");
  const [CreateClassDate, setCreateClassDate] = useState("");
  const [CreateClassTime, setCreateClassTime] = useState("");
  const [CreateImgID, setCreateImgID] = useState("");

  const navigate = useNavigate();
  const location = useLocation;

  const login = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/auth/admin",
        withCredentials: true,
        data: {},
      });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Class failed to create.");
      }
    }
  };

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
            variant="h6"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              paddingTop: "5%",
              paddingBottom: "5%",
            }}
          >
            Create Class
          </Typography>

          <TextField
            required
            id="classType"
            label="classType"
            placeholder="Class Type"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setCreateClassType(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Description"
            style={{ minWidth: 300, resize: "none" }}
            onChange={(e) => setCreateDescription(e.target.value)}
            required
          />
          <input
            type="date"
            onChange={(e) => setCreateClassDate(e.target.value)}
          />
          <input
            type="time"
            onChange={(e) => setCreateClassTime(e.target.value)}
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

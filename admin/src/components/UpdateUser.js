import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function UpdateUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate;
  const [updateAccountLevel, setAccountLevel] = useState("");

  const handleChange = (event) => {
    setAccountLevel(event.target.value);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("working");
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8080/admin/updateUser",

        data: { accountLevel: updateAccountLevel, userId: userId },
      }).then((response) => {
        console.log(response);
      });
      console.log("still working");
    } catch (error) {
      if (!error.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log("Missing Details");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Update Failed");
      }
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={updateUser}
          sx={{
            display: "flex",
            bgcolor: "#cfe8fc",
            minHeight: "85vh",
            marginTop: "10%",
            borderRadius: "25px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="userId"
            label="userId"
            value={userId}
            readOnly
            sx={{ visibility: "hidden" }}
          />
          <FormControl sx={{ width: 100 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="accountLevel"
              value={updateAccountLevel}
              label="accountLevel"
              onChange={handleChange}
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="submit" variant="contained" sx={{ margin: "20px" }}>
              Update
            </Button>
            <Button variant="contained" sx={{ margin: "20px" }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function UpdateClassPage() {
  const { classID } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const [CreateClassType, setCreateClassType] = useState("");
  const [CreateDescription, setCreateDescription] = useState("");
  const [CreateClassDate, setCreateClassDate] = useState("");
  const [CreateClassTime, setCreateClassTime] = useState("");
  const [CreateImgID, setCreateImgID] = useState("");
  const [imgs, setImgs] = useState([]);
  const [updateClass, setUpdateClass] = useState([]);
  const [updateCancel, setUpdateCancel] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCreateImgID(event.target.value);
  };
  useEffect(() => {
    const fetchImgs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/imgs");
        if (response && response.data) setImgs(response.data);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchImgs();
  }, []);
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/classes/${classID}`
        );
        if (response && response.data) {
          setUpdateClass(response.data);
        }
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchClass();
  }, []);

  const updateClassPost = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/admin/updateClass",
        data: {
          classID: classID,
          classType: CreateClassType,
          description: CreateDescription,
          classDate: CreateClassDate,
          classTime: CreateClassTime,
          imgID: CreateImgID,
          classCancel: updateCancel,
        },
      }).then((response) => {
        navigate("../Classes");
      });
      console.log(response);
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
          onSubmit={updateClassPost}
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
            Update Class
          </Typography>

          <TextField
            required
            id="classType"
            label="Class Type"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setCreateClassType(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder="Description"
            style={{
              minWidth: 300,
              resize: "none",
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
            }}
            onChange={(e) => setCreateDescription(e.target.value)}
            required
          />
          <TextField
            required
            type="date"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setCreateClassDate(e.target.value)}
          />
          <TextField
            required
            type="Time"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setCreateClassTime(e.target.value)}
          />
          <FormControl
            sx={{
              width: 100,
              bgcolor: "#fff",
              marginTop: "30px",
              borderRadius: "5px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Image</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="accountLevel"
              value={CreateImgID}
              label="accountLevel"
              onChange={handleChange}
              required
            >
              {imgs.map((img) => (
                <MenuItem key={img.imgID} value={img.imgID}>
                  {img.imgName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            type="datetime-local"
            sx={{ bgcolor: "#fff", marginTop: "30px", borderRadius: "5px" }}
            onChange={(e) => setUpdateCancel(e.target.value)}
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
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("../Classes")}
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

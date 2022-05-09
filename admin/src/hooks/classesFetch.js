import React, { useEffect, useState } from "react";
import { postcss } from "tailwindcss";
import axios from "../axios";

const Classes = () => {
  const [classType, setClassType] = useState("");
  const [description, setDescription] = useState("");
  const [classSchedule, setClassSchedule] = useState("");
  const [classCancelled, setClassCancelled] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/classes");
        setClassType(res.data);
        setDescription(res.data);
        setClassSchedule(res.data);
        setClassCancelled(res.data);
      } catch (err) {
        if (err.res) {
          console.log(err.res.data);
          console.log(err.res.status);
          console.log(err.res.header);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchClasses();
  }, []);
};

// const submitClass = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.post("/classes/create", {
//       classType: classType,
//       description: description,
//       classSchedule: classSchedule,
//       email: email,
//     });
//   } catch (error) {
//     console.log(`Error: ${error}`);
//   }
// };

export default Classes;

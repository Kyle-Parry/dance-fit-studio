import React from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import LoginPage from "./components/Login";
import UserPage from "./components/Users";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

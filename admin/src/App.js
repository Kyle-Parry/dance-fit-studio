import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import LoginPage from "./components/Login";
import UserPage from "./components/Users";
import ClassPage from "./components/Classes";

import AuthContext from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UpdateUserPage from "./components/UpdateUser";
import DeleteUserPage from "./components/DeleteUser";
import CreateClassPage from "./components/CreateClass";
import DeleteClassPage from "./components/DeleteClass";
import UpdateClassPage from "./components/UpdateClass";
import CreateUserPage from "./components/CreateUser";

function App() {
  const [auth, setAuth] = useState({ loggedIn: false });

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="Admin/Login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="Admin/Users" element={<UserPage />} />
            <Route
              path="Admin/UpdateUser/:userId"
              element={<UpdateUserPage />}
            />
            <Route
              path="Admin/DeleteUser/:userId"
              element={<DeleteUserPage />}
            />
            <Route path="Admin/CreateUser" element={<CreateUserPage />} />
            <Route path="Admin/Classes" element={<ClassPage />} />
            <Route
              path="Admin/UpdateClass/:classID"
              element={<UpdateClassPage />}
            />
            <Route
              path="Admin/DeleteClass/:classID"
              element={<DeleteClassPage />}
            />
            <Route path="Admin/CreateClass" element={<CreateClassPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

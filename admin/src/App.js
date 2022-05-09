import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timetable from "./routes/Timetable";
import Special from "./routes/Special";
import Booking from "./routes/Booking";
import Contact from "./routes/Contact";
import Settings from "./routes/Settings";
import SignIn from "./routes/SignIn";
import Home from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/classes" element={<Timetable />} />
        <Route path="/special-occasions" element={<Special />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;

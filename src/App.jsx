import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const [mode, setMode] = useState("light");
  const [modeText, setModeText] = useState("Enable DarkMode");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setModeText("Enable LightMode");
      document.body.style.backgroundColor = "#062a43";
    } else {
      setMode("light");
      setModeText("Enable DarkMode");
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <>
    <Router>
      <Navbar
        title="TextUtils"
        home="Home"
        about="About"
        mode={mode}
        toggleMode={toggleMode}
        modeText={modeText}
      />
      <div className="container my-4">
        <Routes>
        <Route path="/about" element={<About />} />
          {/* <Route path="/about"> */}
            {/* <About /> */}
          <Route path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} />} />
        </Routes>
      </div>
      </Router>
    </>
  );
}

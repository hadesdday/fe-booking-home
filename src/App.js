import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Switch from 'react-router';
import Login from "./pages/Account/Login"
import Register from "./pages/Account/Register";
import ResetPassword from "./pages/Account/ResetPassword";
function App() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      {/*<Home />
      <div
        id={`scrollToTop`}
        className={`${visible && "show"}`}
        onClick={scrollToTop}
      >
        <i className="bx bx-chevrons-up"></i>
      </div>
      */}
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="ResetPassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

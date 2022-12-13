import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Toasts from "./components/Toasts";
import AppProvider from "./context/AppContext";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import Overview from "./pages/Listing/Overview";
import ResetPassword from "./pages/Account/ResetPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import HomeDetails from "./pages/HomeDetails";
import Footer from "./parts/Footer";
import Header from "./parts/Header";
import Payment from "./pages/Payment";
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
      <div
        id={`scrollToTop`}
        className={`${visible && "show"}`}
        onClick={scrollToTop}
      >
        <i className="bx bx-chevrons-up"></i>
      </div>
      <BrowserRouter>
        <AppProvider>
          <Header />
          <Toasts />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="ResetPassword" element={<ResetPassword />} />
            <Route path="Overview" element={<Overview />} />
            <Route path="/home/details/:id" element={<HomeDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Toasts from "./components/Toasts";
import AppProvider from "./context/AppContext";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import Overview from "./pages/Listing/Overview";
import ListingHome from "./pages/Listing/ListingHome";
import ResetPassword from "./pages/Account/ResetPassword";
import Profile from "./pages/Listing/Profile";
import ListingDetails from "./pages/Listing/ListingDetails";
import Active from "./pages/Account/Active";
import ForgotPassword from "./pages/Account/ForgotPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import HomeDetails from "./pages/HomeDetails";
import Footer from "./parts/Footer";
import Header from "./parts/Header";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import BookingHistory from "./pages/BookingHistory";
import CheckPaymentStatus from "./pages/CheckPaymentStatus";
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
            <Route path="Active/:token" element={<Active/>}/>
            <Route path="ForgotPassword/:token" element={<ForgotPassword/>}/>           
            <Route path="ResetPassword" element={<ResetPassword />} />
            <Route path="Overview" element={<Overview />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ListingHome" element={<ListingHome />} />
            <Route path="ListingDetails" element={<ListingDetails />} />
            <Route path="/home/details/:id" element={<HomeDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/booking/history" element={<BookingHistory />} />
            <Route path="/payment/check" element={<CheckPaymentStatus />} />
            {/* <Route path="/search/" */}
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

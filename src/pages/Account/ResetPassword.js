import React, { useEffect, useRef, useState } from "react";
import "./resetpassword.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ResetPassword() {
  const [email, setEmail] = useState('');
  const handleClick=(e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/user/resetAccount/${encodeURIComponent(email)}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"}
  }).then(()=>{
    console.log("email is sended");
    toast.success('email is sended', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    window.location.href = "/Login";
  }).catch(error=>{
    toast('Gmai is wrong'+error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  })
}
  return (
    <section>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className="container">
        <div className="container_left">
          <h3>Forgot Password</h3>
          <p>
            Have trouble remembering your Agoda password? Login with Facebook
            now and you'll never have to
          </p>
          <button className="facebook_btn">
            <img src="https://cdn6.agoda.net/images/universal-login/facebook-logo.svg"></img>
            Facebook
          </button>
          <div className="divice">
            <span></span>
            <p>or</p>
            <span></span>
          </div>
          <p>Email</p>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <p>
            Please enter your email in the box above. We will send you a link to
            access further instructions.
          </p>
          <button className="reset_btn" onClick={handleClick}>Reset Password</button>
          <p className="back">
            <a href="/Login">back to sign in</a>
          </p>
        </div>
        <div className="container_right">
          <img src="https://cdn0.agoda.net/images/agodavip/signupcage.svg"></img>
          <h3>Sign in to to unlock more benefits!</h3>
          <ul>
            <li>Best Price Guarantee on bookings</li>
            <li>Access our best Insider and VIP deals</li>
            <li>Earn AgodaCash to save even more</li>
            <li>Collect bookings towards your next VIP status</li>
          </ul>
        </div>
      </div>  
    </section>
  );
}
export default ResetPassword;

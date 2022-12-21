import React, { useEffect, useRef, useState } from "react";
import "./resetpassword.css";
function setPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const handleClick=(e)=>{
    e.preventDefault()
    fetch("http://localhost:8080/user/insert",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(email)
  }).then(()=>{
    console.log("email is sended");
    //window.location.href = "/Login";
  })
}
  return (
    <section>
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
          <button className="reset_btn">Reset Password</button>
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
export default setPassword;

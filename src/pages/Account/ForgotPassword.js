import React, { useEffect,  useState } from "react";
import { useParams } from 'react-router';
import "./resetpassword.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword() {
    let {token} = useParams();
    console.log(token);
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] =  useState('');
  const handleClick=(e)=>{
    e.preventDefault()
    fetch(`http://localhost:8080/user/forgotAccount/${encodeURIComponent(token)}&${encodeURIComponent(password)}&${encodeURIComponent(confirmPassword)}`,{
      method:"Put",
      headers:{"Content-Type":"application/json"}
  }).then(()=>{
    console.log("complete change password");
    toast.success('complete change password', {
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
  }).catch(error => {
    toast('Register Failure:infomation wrong', {
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
          <p>Password:</p>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          
          <button className="reset_btn" onClick={handleClick}>Change Password</button>
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
export default ForgotPassword;

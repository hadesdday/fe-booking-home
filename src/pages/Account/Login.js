import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";

function Login(){
    //Login data xem trong console
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    localStorage.setItem("message","saved in browser storage");
    const handleClick=(e)=>{
        e.preventDefault()
        const user={username,password}
        console.log(user);
        fetch(`http://localhost:8080/user/login/${encodeURIComponent(username)}&${encodeURIComponent(password)}`)
        .then(res=>res.json())
        .then((result)=>{
          console.log(result);
          const json = JSON.stringify(result);
          localStorage.setItem("userData",json);

            toast.success('Login success', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            window.location.href = "/";
         }
      ).catch(error => {
        toast('Login Failure:username or password wrong', {
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
    /*
    useEffect(() => {
        const json = localStorage.getItem("userData");
        const savedNotes = JSON.parse(json);       
        if (savedNotes) {
            console.log(savedNotes);
        }
      }, []);
    */
    return (
    <>
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
theme="light"
/>
        <section>
            
            <div className="container">
            {/*<p ref={errRef} className={errMsg ? "errMsg":"offScreen"} aria-live="assertive">{errMsg}</p>*/}
            <div className="container_left">
            <h3>Sign In</h3>
            <form>
                <p>User Name</p>
                <input type="text"  placeholder="User Name" onChange={(e)=>setUserName(e.target.value)}/>
                <p>Password</p>
                <input type="current-password"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <p>please active accout before login</p>
                <button className="login_btn" onClick={handleClick}>Sign In</button>
                <div className="link">
                    <a href="/Register">create account</a>
                    <a href="/ResetPassword">forgot password</a>
                </div>
                <div className="device_login">
                    <span></span>
                    <p>or Sign In with</p>
                    <span></span>
                </div>
                <button className="google_btn">
                    <img src="https://cdn6.agoda.net/images/universal-login/google-logo-v2.svg"></img>
                    Google
                </button>
                <div className="signup_other">
                <button className="facebook_btn">
                  <img src="https://cdn6.agoda.net/images/universal-login/facebook-logo.svg"></img>
                  FaceBook
                </button>
                <button className="apple_btn">
                  <img src="https://cdn6.agoda.net/images/universal-login/apple-logo.svg"></img>
                  Apple
                </button>
              </div>
            </form>
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
    </>
  );
}
export default Login;

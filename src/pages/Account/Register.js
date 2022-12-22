import { Button } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import "./register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register () {
    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [country,setCountry] = useState('');
    const [phone,setPhone] = useState('');
    const handleClick=(e)=>{
        e.preventDefault()
        const user={username,password,email,name,country,phone}
        console.log(user)
        fetch("http://localhost:8080/user/insert",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(user)
    
      }).then(()=>{
        console.log("New user added");
        toast.success('user is added wellcome:'+username, {
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
    /*useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result);
        }
      )
      },[])
    */
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
            {/*<p ref={errRef} className={errMsg ? "errMsg":"offScreen"} aria-live="assertive">{errMsg}</p>*/}
            <div className="container_left">
            <h3>Sign Up</h3>
            <form>
                <p>User Name</p>
                <input type="text" placeholder="User Name" onChange={(e)=>setUserName(e.target.value)}/>
                 <p>Email</p>
                <input type="text" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <p>Password</p>
                <input type="text" placeholder="setPassword" onChange={(e)=>setPassword(e.target.value)}/>
                <p>Name</p>
                <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                <p>Country</p>
                <input type="text" placeholder="Country" onChange={(e)=>setCountry(e.target.value)}/>
                <p>Phone</p>
                <input type="text" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)}/>
                <div className="check_policy">
                    <p>
                    Email me exclusive Agoda promotions. I can opt out later as stated in the Privacy Policy.
                    </p>
                </div>
                <button className="login_btn" onClick={handleClick}>Sign Up</button>
                <div className="device">
                    <span></span>
                    <p>or continue with</p>
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
                <div className="line"></div>
                <button className="link_btn">Already have an account? Sign in</button>
                

            </form>
            </div>
            <div className="container_right">
                <img src="https://cdn0.agoda.net/images/agodavip/signupcage.svg"></img>
                <h3>Sign in to to unlock more benefits!</h3>
                <ul>
                    <li>
                    Best Price Guarantee on bookings
                    </li>
                    <li>
                    Access our best Insider and VIP deals
                    </li>
                    <li>
                    Earn AgodaCash to save even more
                    </li>
                    <li>
                    Collect bookings towards your next VIP status
                    </li>
                </ul>
            </div>
            </div>
        </section>
    );
}
export default Register;
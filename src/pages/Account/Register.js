import { Button } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import "./register.css"

function Register () {
    const [firstname,SetFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    /*
    const [errMsg,setErrMsg]=useState('');
    const [errRef,setErrRef]=useState('');

    useEffect (()=>{
        useRef.current.foscus();
    })
    useEffect (()=>{
        setErrMsg('');
    },[email,password])
*/
    return (
        
        <section>
            <div className="container">
            {/*<p ref={errRef} className={errMsg ? "errMsg":"offScreen"} aria-live="assertive">{errMsg}</p>*/}
            <div className="container_left">
            <h3>Sign Up</h3>
            <form>
                <p>First Name</p>
                <input type="text" name="f_name" placeholder="First Name" onChange={(e)=>SetFirstName(e.target.value)}/>
                <p>Last Name</p>
                <input type="text" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}/>
                 <p>Email</p>
                <input type="text" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <p>Password</p>
                <input type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <p>Confirm Password</p>
                <input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <div className="check_policy">
                    <p>
                    Email me exclusive Agoda promotions. I can opt out later as stated in the Privacy Policy.
                    </p>
                </div>
                <button className="login_btn">Sign Up</button>
                <div className="device">
                    <p>or</p>
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
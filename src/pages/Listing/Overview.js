import React, { useEffect, useRef, useState } from "react";
import "./overview.css";
function Overview(){
    return(
        <>
        <div className="overview_container">
        <div className="list_head">
            <ul>
                <li>
                    <i></i>
                    OverView
                </li>
                <li>
                    <i></i>
                    Listings    
                </li>
                <li>
                    <i></i>
                    Messages
                </li>
                <li>
                    <i></i>
                    Profile   
                </li>
            </ul>
        </div>
        <div className="content_overview">
        <div className="card_profile">
            <div className="profile">
                <img src="https://tse2.mm.bing.net/th?id=OIP.zl_Nch6D6OfZLqxf302AhgHaHw&pid=Api&P=0" alt="profile_logo" />
                <p>Wellcome back, <span>Hiep!</span></p>
                <button>Edit Your Profile</button>
            </div>
            <div className="profile_content">
                <p className="profile_title">To become a verified host, complete the steps below:</p>
                <div className="edit_profile">
                    <div className="editprofile_box">
                        <p className="profile_box_title">your name</p>
                        <p className="profile_box_content">first name, last name</p>
                        <button>edit name</button>
                    </div>
                    <div className="editprofile_box">
                        <p className="profile_box_title">Photo</p>
                        <p className="profile_box_content">upload your profile photo</p>
                        <button>upload now</button>
                    </div>
                    <div className="editprofile_box">
                        <p className="profile_box_title">email</p>
                        <p className="profile_box_content">verify your email</p>
                        <button>verify now</button>
                    </div>
                    <div className="editprofile_box">
                        <p className="profile_box_title">phone number</p>
                        <p className="profile_box_content">verify your phone number</p>
                        <button>add your phone number</button>
                    </div>
                </div>
            </div>
            <p className="text_line">We'll check the Verified Host criteria on a daily basis. Once you achieve the requirements, you’ll become a Verified Host.</p>
        </div>
        <p className="profile_box_title">Let's see what we can do today to get more bookings.</p>
        <div className="more_content">
            
            <div className="more_left">
                <p>content box</p>
            </div>
            <div className="more_right">
                <h5>Feed back</h5>
                <div className="feedback_box">
                    <img src="https://img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png" alt="feed back image" />
                    <p>Help us to improve the product you use</p>
                    <a href="#">Give us feedback</a>
                </div>
                <div className="feedback_box">
                    <img src="https://img.agoda.net/images/agoda-homes/overview-dashboard/announcment.png" alt="feed back image" />
                    <p>Click ”Help center” below if you need any help or call our Partner Support Team at</p>
                    <a href="#">Help center</a>
                </div>
            </div>
        </div>
        </div>
    </div>
        </>
    );
}
export default Overview
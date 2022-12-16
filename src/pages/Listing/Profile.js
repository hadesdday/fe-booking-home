import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
function Profile(){
    const [showhide, SetShowHide] = useState("own");
    const handleShow = e =>{
        const getshow = e.target.value;
        SetShowHide(getshow);
    }
    return(
        <>
        <div className="profile_container">
        <div className="list_head_profile">
            <ul>
                <li>
                    <i></i>
                    <a href="/Overview">OverView</a>
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
                    <a href="/Profile">Profile</a> 
                </li>
            </ul>
        </div>
        <div className="profile_host">
        <div className="host_type">
            <h3>Host Type</h3>
            <p>In order to comply with consumer authority commitments, we must collect the following information from partners</p>
            <div className="host_type_box">
                <div className="host_own">
                   <input type="radio" name="userdetail" value="yes" onClick={ handleShow } />
                   <div>
                        <p className="host_own_title">I host on my own behalf</p>
                        <p>Private host - any party who is renting out a property or properties for purposes which are outside their trade, business, or profession</p>
                   </div>
                </div>
                <div className="host_own">
                <input type="radio" name="userdetail" value="no" checked={ showhide==='no' } onClick={ handleShow }/>
                   <div>
                        <p className="host_own_title">I represent a company</p>
                        <p>Professional host - any party who is renting out a property or properties for purposes relating to their trade, business, or profession (you are a property management company)</p>
                   </div>
                </div>
            
            </div>
        </div>
        {
                    showhide ==='yes' && (
                        <div>
                            <div className="add_change_profile">
                                <h3 className="profile_title">Add/Change profile photo (optional)</h3>
                                <p>Put a face to your name! We’ll add this to your profile, and share it with future hosts and guests.</p>
                                <div className="add_change_box">
                                    <img src="https://tse4.mm.bing.net/th?id=OIP.LYPZMHdM55TtNv3V-M8JTQHaEr&pid=Api&P=0" />
                                    <p>Your picture matters. Pick a clear and friendly-looking one, to increase bookings.</p>
                                    <button>ADD/CHANGE PROFILE PHOTO</button>
                                </div>
                            </div>
                            <div className="profile_name">
                                <h3 className="profile_title">Name</h3>
                                <div className="profile_name_box">
                                    <div>
                                        <div>
                                            <p className="profile_box_title">First name</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Last name</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="profile_box_title">Display name (optional)</p>
                                        <p>This is the name that will be shown on Agoda website and app.</p>
                                        <input type="text"></input>
                                    </div>
                                    <div>
                                        <p className="profile_box_title">Date of birth</p>
                                        <div>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                        </div>
                                    </div>                     
                                </div>
                                <h3 className="profile_title">Contact details</h3>
                                <div className="profile_contact_box">
                                    <p className="profile_box_title">Mobile phone number (optional)(we will send you an SMS to verify)</p>
                                    <div>
                                        <input type="text"></input>
                                        <input type="text"></input>           
                                    </div>
                                    <p className="profile_box_title">Language preference</p>
                                    <p>This is the language which Agoda Homes will contact you.</p>
                                    <input type="text"></input>
                                    <p className="profile_box_title">Email</p>
                                    <p>We will send you verify email</p>
                                    <div>
                                        <input type="text"></input>
                                        <button>verified</button>        
                                    </div>
                                </div>
                                <h3 className="profile_title">Location details</h3>
                                <div className="profile_location_box">
                                    <p className="profile_box_title">Where you live</p>
                                    <div>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="profile_box_title">Primary Address (where you stay at least 8 months of the year)</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Zip code</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <p className="profile_box_title">Nationality</p>
                                    <input type="text"></input>
                                </div>
                                <h3 className="profile_title">Describe yourself</h3>
                                <div className="profile_location_box">
                                    <area></area>
                                </div>
                                <h3 className="profile_title">AirBnB profile link (optional)</h3>
                                <div className="profile_airbnb_link">
                                    <div>
                                        <p className="profile_box_title">Already hosting on AirBnB?</p>
                                        <p>Your review score and super host status can raise your ranking on Agoda! Just provide us your AirBnB profile link so we can verify your host accomplishments.</p>
                                        <input type="text" />
                                    </div>
                                    <img src="https://img.agoda.net/images/agoda-homes/host-profile/airbnb-profile.svg"/>
                                </div>
                            </div>
                            <div className="group_button">
                                <button className="btn_cancel">Cancel</button>
                                <button className="btn_save">Save</button>
                            </div>
                        </div>
                        
                        

                    )

                    }
                    {showhide === 'no' &&(
                        <div>
                            <div className="profile_company_info">
                                <h3 className="profile_title">Company Information</h3>
                                <p>Please enter your company information</p>
                                <div className="profile_company_box">
                                    <p className="profile_box_title">Company's legal name</p>
                                    <input type="text"></input>
                                    <div>
                                        <div>
                                            <p className="profile_box_title">Company Address</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Country / Region</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <p className="profile_box_title">Zip code</p>
                                    <input type="text"></input>
                                </div>
                                <h3 className="profile_title">Ultimate beneficial owner Information</h3>
                                <p>Please provide the name of the ultimate beneficial owners of the company. This is any individual who owns 20% or more of the company either directly or through holding company OR individual who holds the highest authority, responsibility and decision-making for this company (e.g. CEO, Managing Director)</p>
                                <div className="profile_ownerinfo_box">
                                    <div>
                                        <div>
                                            <p className="profile_box_title">First name</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Last name</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Nationality</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="profile_box_title">Address (optional)</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Country / Region</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="profile_box_title">Zip code</p>
                                        <input type="text"></input>
                                    </div>
                                    <p className="profile_box_title">Date of birth</p>
                                    <div>
                                       <input type="text"></input>
                                       <input type="text"></input>
                                       <input type="text"></input>
                                    </div>
                                    <p>Add another ultimate beneficial owner</p>
                                </div>
                                <h3 className="profile_title">Government Control</h3>
                                <p>If any portion of the company is owned by or under control of a government official, please provide the names below.</p>

                            </div>
                            <div className="add_change_profile">
                                <h3 className="profile_title">Add/Change profile photo (optional)</h3>
                                <p>Put a face to your name! We’ll add this to your profile, and share it with future hosts and guests.</p>
                                <div className="add_change_box">
                                    <img src="https://tse4.mm.bing.net/th?id=OIP.LYPZMHdM55TtNv3V-M8JTQHaEr&pid=Api&P=0" />
                                    <p>Your picture matters. Pick a clear and friendly-looking one, to increase bookings.</p>
                                    <button>ADD/CHANGE PROFILE PHOTO</button>
                                </div>
                            </div>
                            <div className="profile_name">
                                <h3 className="profile_title">Name</h3>
                                <div className="profile_name_box">
                                    <div>
                                        <div>
                                            <p className="profile_box_title">First name</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Last name</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="profile_box_title">Display name (optional)</p>
                                        <p>This is the name that will be shown on Agoda website and app.</p>
                                        <input type="text"></input>
                                    </div>
                                    <div>
                                        <p className="profile_box_title">Date of birth</p>
                                        <div>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                        </div>
                                    </div>                     
                                </div>
                                <h3 className="profile_title">Contact details</h3>
                                <div className="profile_contact_box">
                                    <p className="profile_box_title">Mobile phone number (optional)(we will send you an SMS to verify)</p>
                                    <div className="profile_flex_name">
                                        <input type="text" placeholder="country/region"></input>
                                        <input type="text" placeholder="phone number"></input>           
                                    </div>
                                    <p className="profile_box_title">Language preference</p>
                                    <p>This is the language which Agoda Homes will contact you.</p>
                                    <input type="text"></input>
                                    <p className="profile_box_title">Email</p>
                                    <p>We will send you verify email</p>
                                    <div>
                                        <input type="text"></input>
                                        <button>verified</button>        
                                    </div>
                                </div>
                                <h3 className="profile_title">Location details</h3>
                                <div className="profile_location_box">
                                    <p className="profile_box_title">Where you live</p>
                                    <div>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                            <input type="text"></input>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="profile_box_title">Primary Address (where you stay at least 8 months of the year)</p>
                                            <input type="text"></input>
                                        </div>
                                        <div>
                                            <p className="profile_box_title">Zip code</p>
                                            <input type="text"></input>
                                        </div>
                                    </div>
                                    <p className="profile_box_title">Nationality</p>
                                    <input type="text"></input>
                                </div>
                                <h3 className="profile_title">Describe yourself</h3>
                                <div className="profile_location_box">
                                    <textarea></textarea>
                                </div>
                                <h3 className="profile_title">AirBnB profile link (optional)</h3>
                                <div className="profile_airbnb_link">
                                    <div>
                                        <p className="profile_box_title">Already hosting on AirBnB?</p>
                                        <p>Your review score and super host status can raise your ranking on Agoda! Just provide us your AirBnB profile link so we can verify your host accomplishments.</p>
                                        <input type="text" placeholder="Example: https://www.airbnb.com/users/show/377396370"/>
                                    </div>
                                    <img src="https://img.agoda.net/images/agoda-homes/host-profile/airbnb-profile.svg"/>
                                </div>
                            </div>
                            <div className="group_button">
                                <button className="btn_cancel">Cancel</button>
                                <button className="btn_save">Save</button>
                            </div>
                        </div>
                    )}
                    </div>
        </div>
        </>
    );
}
export default Profile
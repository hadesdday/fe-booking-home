import React, { useEffect, useRef, useState } from "react";
import "./ListingDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function ListingDetails(){
    const [property,SetProperty] = useState("none");
    const bg = 0;
    const choseHouse = (e) =>{
        const housechosen = e;
        SetProperty(housechosen)
        console.log(housechosen);
        if(housechosen === "department"){
            bg=1;
        }
        else if(housechosen === "bungalow"){
            bg=2;
        }
        else if(housechosen === "house"){
            bg=3;
        }
        else if(housechosen === "villa"){
            bg=4;
        }
    }

    
    return(
        
        <>
        <div className="listing_details_container">
                <div className="listing_details_head">
                    <div className="listing_details_head_title">
                        <h4>Match your property to the right travelers.</h4>
                        <p>All information is required unless marked optional.</p>
                    </div>
                    <img src="https://img.agoda.net/images/header/ec-basics@2x.png"></img>
                </div>
                <h3 className="Listing_Details_title">Property</h3>
                <div className="listing_property">
                    <h4>property type</h4>
                    <p>Select one property type</p>
                    <ul>
                            <li onClick={() => choseHouse("department")} style={{backgroundColor:bg==1 ? "blue" : "white"}}>
                                <FontAwesomeIcon icon={['fas', 'coffee']} />
                                <p>Entire department</p>
                            </li>
                            <li value="bungalow" onClick={() => choseHouse("bungalow")} style={{backgroundColor:bg==2 ? "blue" : "white"}}>
                                <FontAwesomeIcon icon={['fas-regular', 'building']} />
                                <p>Entire bungalow</p>
                            </li>
                            <li value="house" onClick={() => choseHouse("house")} style={{backgroundColor:bg==3 ? "blue" : "white"}}>
                                <FontAwesomeIcon icon={['fa-regular', 'house']} />
                                <p>Entire house</p>
                            </li>
                            <li value="villa" onClick={() => choseHouse("villa")} style={{backgroundColor:bg==4 ? "blue" : "white"}}>
                                <FontAwesomeIcon icon={['fa-solid', 'house-tsunami']} />
                                <p>villa</p>
                            </li>
                    </ul>

                </div>
                <h3 className="Listing_Details_title">Rooms and details</h3>
                <div className="listing_room">
                    <h3>Accommodates</h3>
                    <p>The maximum number of people who can sleep comfortably given the total bed space and sofas.</p>
                    <input type="number"></input>
                    <p>Bathrooms</p>
                    <p>Count only bathrooms on your property, not shared or common bathrooms in your building or complex.</p>
                    <input type="number"></input>
                    <p>Bedrooms</p>
                    <p>If your property is a loft or studio, the number of bedrooms is zero.</p>
                    <input type="number"></input>
                </div>
                <h3 className="Listing_Details_title">Location</h3>
                <div className="listing_loaction">
                    <p>address</p>
                    <input type="text" />
                </div>
                <h3 className="Listing_Details_title">Name your property</h3>
                <div className="listing_name_property">
                    <p>Make it count, and make it sound inviting! Don’t worry, we’ll generate other languages using a standard translation template.</p>
                    <input type="text" />
                </div>
                <h3 className="Listing_Details_title">Describe your place</h3>
                <div className="listing_info_property">
                    <p>Why should a traveler choose to stay at your property?</p>
                    <input type="textarea" />
                </div>
                <h3 className="Listing_Details_title">Nightly price</h3>
                <div className="listing_price">
                    <p>The maximum number of people who can sleep in your place is 4.</p>
                    <p>Nightly price</p>
                    <input type="number" />
                </div>
                <h3 className="Listing_Details_title">Import Image</h3>
                <div className="listing_image">
                    <p>Show them what they’re missing.</p>
                    <p>Pictures matter to travelers. Upload as many high-quality images as you have. You can add more later. Want some tips on how to upload quality photos that generate more bookings?Check this out.</p>
                    <input type = 'file' multiple/>
                </div>
                <div className="listing_button">
                <button>exit</button>
                <button>public</button>
                </div>

        </div>
        </>
    );
}
export default ListingDetails
import React, { useEffect, useRef, useState } from "react";
function ListingHome(){
    const [statelist,SetStateList] = useState("unfinished");
    
    const handleStateList = e =>{
        const getstate = e.target.value;
        SetStateList(getstate);
    }
    return(
        
        <>
        <div className="listing_container">
        <div className="listing_head">
            <ul>
                <li>
                    <i></i>
                    <a href="/Profile">OverView</a>
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
        <div className="Listing_content">
            <div>
                <div className="list_search">
                    <input type="text"></input>
                    <i></i>
                </div>
                <div className="list_button">
                    <button className="import_btn">Import Listing</button>
                    <button className="add_btn">Add Listing</button>
                </div>
            </div>
            <div className="list_state">
                <input type="button" value="unfinished" onClick={ handleStateList }/>
                <input type="button" value="active" onClick={ handleStateList }/>
                <input type="button" value="deactivated" onClick={ handleStateList }/>
            </div>
        </div>
        {
            statelist === 'unfinished' &&(
                <div>
                    <h3>this is unfinish state</h3>
                </div>
            )         
        }
        {
            statelist === 'active' &&(
                <div>
                    <h3>this is active state</h3>
                </div>
            )         
        }
        {
            statelist === 'deactivated' &&(
                <div>
                    <h3>this is deactivated state</h3>
                </div>
            )         
        }
        </div>
        </>
    );
}
export default ListingHome
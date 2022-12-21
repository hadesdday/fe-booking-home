import React, { useState ,useEffect} from "react";
import "./ListingDetails.css";
function ListingDetails(){
    const [propertyType,SetPropertyType] = useState("none");
    const [roomType,SetRoomType] = useState("")
    const handleProperty = e =>{
        const getProperty = e.target.value;
        SetPropertyType(getProperty);
    }
    const handleRoom = e =>{
        const getRoom = e.target.value;
        SetRoomType(getRoom);
    }
    var bg = 0;
    function color(propertyType){
        if(propertyType==="department"){
            bg=1;
        }
        else if(propertyType==="EntireBugalow"){
            bg=2;
        }
        else if(propertyType==="EntireHoue"){
            bg=3;
        }
        else if(propertyType==="Villa"){
            bg=4;
        }
    }
    color(propertyType);
    var bgroom = 0;
    function colorRoom(roomType){
        if(roomType==="Romantic"){
            bgroom=1;
        }
        else if(roomType==="Resident"){
            bgroom=2;
        }
        else if(roomType==="Normal"){
            bgroom=3;
        }
        else if(roomType==="Luxury"){
            bgroom=4;
        }
    }
    colorRoom(roomType)
    useEffect(()=>{
        const json = localStorage.getItem("userData");
        if(json!=null){
            const note = JSON.parse(json);
            const map = Object.values(note);
            console.log(map);
            fetch(`http://localhost:8080/List/getOwner/${encodeURIComponent(map[1])}`)
            .then(res=>res.json())
            .then((result)=>{
            console.log(result);
            const json = JSON.stringify(result);
            setOwnnerId(json)
        }
        )
        }
        
      },[])
    
    const [nameProperty,setNameProperty] = useState("");
    const [infoProperty,setInfoProperty] = useState("none");
    const [policy,setPolicy] = useState("");
    const [owner_id,setOwnnerId] = useState("");
    const [price,setPrice] = useState("");
    const [numberAdult,setNumberAdult] = useState("");
    const [numberChildren,setNumberChildren] = useState("");
    const [address,setAddress] = useState("");
    const [district,setdistrics] = useState("");
    const [province,setProvince] = useState("");
    const [country,setCountry] = useState("");
   // const [propertyType,SetPropertyType] = useState("");
    const [image,setImage] = useState("image sample");
    
    const handleClick=(e)=>{
        e.preventDefault()
        const data ={nameProperty,infoProperty,policy,roomType,owner_id,price,numberAdult,numberChildren,address,district,province,country,propertyType,image}
        console.log(data)
        fetch("http://localhost:8080/List/save",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then(()=>{
        console.log("New Property is added");
        //window.location.href = "/ListingHome";
      })
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
                    <div className="chose_home_type">
                        <input type="button" value="department" onClick={handleProperty} style={{backgroundColor:bg===1 ? "blue" : "white",color:bg===1 ? "white" : "black"}}/>
                        <input type="button" value="EntireBugalow" onClick={handleProperty} style={{backgroundColor:bg===2 ? "blue" : "white",color:bg===2 ? "white" : "black"}}/>
                        <input type="button" value="EntireHoue" onClick={handleProperty} style={{backgroundColor:bg===3 ? "blue" : "white",color:bg===3 ? "white" : "black"}}/>
                        <input type="button" value="Villa" onClick={handleProperty} style={{backgroundColor:bg===4 ? "blue" : "white",color:bg===4 ? "white" : "black"}}/>
                    </div>
                </div>
                <div className="listing_property">
                    <h4>Rooms type</h4>
                    <p>Select one room type</p>
                    <div className="chose_home_type">
                        <input type="button" value="Romantic" onClick={handleRoom} style={{backgroundColor:bgroom === 1 ? "blue" : "white",color:bgroom===1 ? "white" : "black"}}/>
                        <input type="button" value="Resident" onClick={handleRoom} style={{backgroundColor:bgroom === 2 ? "blue" : "white",color:bgroom===2 ? "white" : "black"}}/>
                        <input type="button" value="Normal" onClick={handleRoom} style={{backgroundColor:bgroom === 3 ? "blue" : "white",color:bgroom===3 ? "white" : "black"}}/>
                        <input type="button" value="Luxury" onClick={handleRoom} style={{backgroundColor:bgroom === 4 ? "blue" : "white",color:bgroom===4 ? "white" : "black"}}/>
                    </div>
                </div>
                <h3 className="Listing_Details_title">Rooms and details</h3>
                <div className="listing_room">
                    <h3>Accommodates</h3>
                    <p>The maximum number of people who can sleep comfortably given the total bed space and sofas.</p>
                    <input type="number" onChange={(e)=>setNumberAdult(e.target.value)}/>
                    <p>Children Rooms</p>
                    <p>Count only bathrooms,Bedroom,... on your property, not shared or common bathrooms in your building or complex.</p>
                    <input type="number"onChange={(e)=>setNumberChildren(e.target.value)}/>
                </div>
                <h3 className="Listing_Details_title">Location</h3>
                <div className="listing_loaction">
                    <p>address</p>
                    <input type="text" onChange={(e)=>setAddress(e.target.value)} />
                    <p>district</p>
                    <input type="text" onChange={(e)=>setdistrics(e.target.value)} />
                    <p>province</p>
                    <input type="text" onChange={(e)=>setProvince(e.target.value)} />
                    <p>country</p>
                    <input type="text" onChange={(e)=>setCountry(e.target.value)} />
                </div>
                <h3 className="Listing_Details_title">Name your property</h3>
                <div className="listing_name_property">
                    <p>Make it count, and make it sound inviting! Don’t worry, we’ll generate other languages using a standard translation template.</p>
                    <input type="text" onChange={(e)=>setNameProperty(e.target.value)}/>
                </div>
                <h3 className="Listing_Details_title">Describe your place</h3>
                <div className="listing_info_property">
                    <p>Why should a traveler choose to stay at your property?</p>
                    <input type="text" onChange={(e)=>setInfoProperty(e.target.value)}/>
                </div>
                <h3 className="Listing_Details_title">Describe your Policy</h3>
                <div className="listing_info_property">
                    <p>what is policy in your property?</p>
                    <input type="text" onChange={(e)=>setPolicy(e.target.value)}/>
                </div>
                <h3 className="Listing_Details_title">Nightly price</h3>
                <div className="listing_price">
                    <p>The maximum number of people who can sleep in your place is 4.</p>
                    <p>Nightly price</p>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <h3 className="Listing_Details_title">Import Image</h3>
                <div className="listing_image">
                    <p>Show them what they’re missing.</p>
                    <p>Pictures matter to travelers. Upload as many high-quality images as you have. You can add more later. Want some tips on how to upload quality photos that generate more bookings?Check this out.</p>
                    <input type = 'file' multiple/>
                </div>
                <div className="listing_button">
                <button>exit</button>
                <button onClick={handleClick}>public</button>
                </div>

        </div>
        </>
    );
}
export default ListingDetails
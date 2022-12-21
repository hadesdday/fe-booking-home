import { data } from "jquery";
import React, { Component, useEffect, useRef, useState } from "react";
import "./ListingHome.css"
function ListingHome(){
    const [statelist,SetStateList] = useState('unfinished');
    
    const handleStateList = e =>{
        const getstate = e.target.value;
        SetStateList(getstate);
    }
    var bg = 0;
    function color(statelist){
        if(statelist==="unfinished"){
            bg=1;  
        }
        else if(statelist==='active'){
            bg=2;
        }
        else if(statelist==='deactivated'){
            bg=3;
        }
    }
    color(statelist);
    const truncate = (input) =>
      input?.length > 12 ? `${input.substring(0, 8)}...` : input;
    
     const [id,setId] =useState(0);
     const handleClick1 = (e)=>{
          e.preventDefault()
          console.log(data)
          console.log(id);
          fetch(`http://localhost:8080/List/publishRoom/${encodeURIComponent(id)}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"}
        }).then(()=>{
          console.log("you change success");
          window.location.reload();
        })
     }
     const [id2,setId2] =useState(0);
     const handleClick2 = (e)=>{
          e.preventDefault()
          console.log(data)
          console.log(id2)
          fetch(`http://localhost:8080/List/activeRoom/${encodeURIComponent(id2)}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"}
        }).then(()=>{
          console.log("you change success");
          window.location.reload();
        })
     }
     const [id3,setId3] =useState(0);
     const handleClick3 = (e)=>{
          e.preventDefault()
          console.log(data)
          fetch(`http://localhost:8080/List/deActiveRoom/${encodeURIComponent(id3)}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"}
        }).then(()=>{
          console.log("you change success");
          window.location.reload();
        })
     }
    const getDataValue1 = ()=>{
        fetch(`http://localhost:8080/List/getRoom/${encodeURIComponent(0)}`)
        .then(res=>res.json())
        .then((result)=>{
          console.log(result);
          const json = JSON.stringify(result);
          localStorage.setItem("dataRoom1",json);
          //SetValue1(Object.values(result))
          //console.log(Object.values(result));
        }
      )
    }
    getDataValue1();
    
    const getDataValue2 = ()=>{
        fetch(`http://localhost:8080/List/getRoom/${encodeURIComponent(1)}`)
        .then(res=>res.json())
        .then((result)=>{
          console.log(result);
          const json = JSON.stringify(result);
          localStorage.setItem("dataRoom2",json);
          //SetValue2(Object.values(result))
          //console.log(Object.values(result));
        }
      )
    }
    getDataValue2();
    const getDataValue3 = ()=>{
        fetch(`http://localhost:8080/List/getRoom/${encodeURIComponent(2)}`)
        .then(res=>res.json())
        .then((result)=>{
          console.log(result);
          const json = JSON.stringify(result);
          localStorage.setItem("dataRoom3",json);
          //SetValue3(Object.values(result))
          //console.log(Object.values(result));
        }
      )
    }
   getDataValue3();

    
    
    /*const json = localStorage.getItem("dataRoom");
    const savedNotes = JSON.parse(json);
    const maper = Object.values(savedNotes);*/
    const json = localStorage.getItem("dataRoom1");
    const saved1 = JSON.parse(json);       
    const map1 = Object.values(saved1);
    const viewdata1 = map1.map((ele)=>{
        console.log(ele);
        return(
            <div className="state_list_data">
        <input type="checkbox" className="state_checkbox" value={ele.id} onChange={(e)=>setId(e.target.value)}/>
        <ul>
            <li>
                {ele.roomType.name}
            </li>
            <li>
               {ele.status}
            </li>
            <li>
               {ele.id}
            </li>
            <li>
                {ele.adult}
            </li>
            <li>
                {truncate("binh an, thu thua, Long An")}             
            </li>
            <li>
                5 star
            </li>
            <li>
                {ele.roomType.description}
            </li>
            <li>
                {ele.price}
            </li>                        
        </ul>
        
    </div>
        )
        
    })
    const json2 = localStorage.getItem("dataRoom2");
    const saved2 = JSON.parse(json2);       
    const map2 = Object.values(saved2);
    const viewdata2 = map2.map((ele)=>{
        console.log(ele);
        return(
            <div className="state_list_data">
        <input type="checkbox" className="state_checkbox" value={ele.id} onChange={(e)=>setId2(e.target.value)}/>
        <ul>
            <li>
                {ele.roomType.name}
            </li>
            <li>
               {ele.status}
            </li>
            <li>
               {ele.id}
            </li>
            <li>
                {ele.adult}
            </li>
            <li>
                {truncate("binh an, thu thua, Long An")}             
            </li>
            <li>
                5 star
            </li>
            <li>
                {ele.roomType.description}
            </li>
            <li>
                {ele.price}
            </li>                        
        </ul>
        
    </div>
        )
        
    })
    const json3 = localStorage.getItem("dataRoom3");
    const saved3 = JSON.parse(json3);       
    const map3 = Object.values(saved3);
    const viewdata3= map3.map((ele)=>{
        console.log(ele);
        return(
            <div className="state_list_data">
        <input type="checkbox" className="state_checkbox" value={ele.id} onChange={(e)=>setId3(e.target.value)}/>
        <ul>
            <li>
                {ele.roomType.name}
            </li>
            <li>
               {ele.status}
            </li>
            <li>
               {ele.id}
            </li>
            <li>
                {ele.adult}
            </li>
            <li>
                {truncate("binh an, thu thua, Long An")}             
            </li>
            <li>
                5 star
            </li>
            <li>
                {ele.roomType.description}
            </li>
            <li>
                {ele.price}
            </li>                        
        </ul>
        
    </div>
        )
        
    })
   
    
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
            <div className="listing_search">
                <div className="list_search">
                    <input type="text" placeholder="Searching Home"></input>
                    <i></i>
                </div>
                <div className="list_button">
                    <button className="import_btn">Import Listing</button>
                    <button className="add_btn">Add Listing</button>
                </div>
            </div>
            <div className="list_state">
                <input type="button" value="unfinished" onClick={ handleStateList } style={{backgroundColor: bg==1 ? "blue" : "white",color:bg==1 ? "white" : "black"}}/>
                <input type="button" value="active" onClick={ handleStateList } style={{backgroundColor: bg==2 ? "blue" : "white",color:bg==2 ? "white" : "black"}}/>
                <input type="button" value="deactivated" onClick={ handleStateList } style={{backgroundColor: bg==3 ? "blue" : "white",color:bg==3 ? "white" : "black"}}/>
            </div>
        {
            statelist === 'unfinished' &&(
                <div>
                <div className="state_list_box">
                    
                    <div className="state_list_header">
                        <ul>
                            <li className="big_property">Property</li>
                            <li>Status</li>
                            <li>Id</li>
                            <li>Size</li>
                            <li>Address</li>
                            <li>Star rating</li>
                            <li>How to get there</li>
                            <li>Nightly price</li>
                        </ul>
                    </div>
                    {viewdata1}
                         
                    
                </div>
                <div className="publish_button">
                    <button onClick={handleClick1}>PubLish</button>
                </div>
                </div>
            )         
        }
        {
            statelist === 'active' &&(
                <div>
                    <div className="state_list_box">
                    
                    <div className="state_list_header">
                        <ul>
                            <li className="big_property">Property</li>
                            <li>Status</li>
                            <li>Id</li>
                            <li>Size</li>
                            <li>Address</li>
                            <li>Star rating</li>
                            <li>How to get there</li>
                            <li>Nightly price</li>
                        </ul>
                    </div>
                    {viewdata2}
                    
                </div>
                <div className="publish_button">
                    <button onClick={handleClick2}>Deactivated</button>
                </div>
                </div>
            )         
        }
        {
            statelist === 'deactivated' &&(
                <div>
                    <div className="state_list_box">
                    
                    <div className="state_list_header">
                        <ul>
                            <li className="big_property">Property</li>
                            <li>Status</li>
                            <li>Id</li>
                            <li>Size</li>
                            <li>Address</li>
                            <li>Star rating</li>
                            <li>How to get there</li>
                            <li>Nightly price</li>
                        </ul>
                    </div>
                    {viewdata3}
                    
                </div>
                <div className="publish_button">
                    <button onClick={handleClick3}>Re Active</button>
                </div>
                </div>
            )         
        }
        </div>        
        </div>
        </>
    );
}
export default ListingHome
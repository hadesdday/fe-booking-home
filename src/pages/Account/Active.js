import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router';
function Active () {
    let {token} = useParams();
    console.log(token);
    useEffect(() => {
        fetch(`http://localhost:8080/user/active/${encodeURIComponent(token)}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
      }).then(()=>{
        console.log("Active success");
        window.location.href = "/Login";
      })
    }, []);

    
    return (
        
        <section>
       
        </section>
    );
}
export default Active;
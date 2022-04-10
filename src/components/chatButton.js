import React from "react";

const chatButton = (props)=>{  
    console.log(props.room) 
    return( 
        <button className="btn btn-primary" onClick={()=>props.changeChatRoom(props.room)}>{props.room}</button>
    )
  }

  export default chatButton;
import React from "react";

const chatButton = (props)=>{  
    console.log(props.room) 
    return( 
        <button className={props.room === props.activeChat ? "btn btn-info" : "btn btn-primary"} onClick={()=>props.changeChatRoom(props.room)}>{props.room}</button>
    )
  }

  export default chatButton;
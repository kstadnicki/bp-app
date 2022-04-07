import React from "react";

const ChatMessage =(props)=>{ 
     //const messageClass = uid === props.userid ? 'sent' : 'received';
     const msg_list = props.messages.map((msg)=>(
       <div className={props.userid===msg.userid ? 'text-end' : ''} key={msg.id}>
         <h6>{msg.userid}</h6>
         <p>{msg.text}</p>        
       </div>
     ))
    return( 
      <div>
        {msg_list}
      </div>
    )
  }

  export default ChatMessage;
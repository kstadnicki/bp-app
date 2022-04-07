import React from "react";

// const ChatMessage =(props)=>{ 
//      //const messageClass = uid === props.userid ? 'sent' : 'received';
//      const msg_list = props.messages.map((msg)=>(
//        <div className={props.userid===msg.userid ? 'text-end' : ''} key={msg.id}>
//          <h6>{msg.userid}</h6>
//          <p>{msg.text}</p>        
//        </div>
//      ))
//     return( 
//       <div>
//         {msg_list}
//       </div>
//     )
//   }

//   export default ChatMessage;

const ChatMessage = (props)=>{
    //const {text, userid} = props.message;
  
    // const messageClass = uid === props.userid ? 'sent' : 'received';
    //console.log(props.userid+" "+ userid)
    return( 
        <div className={props.userid === props.username ? 'text-end' : ''} key={props.id}>
            <h6>{props.userid}</h6>
            <p>{props.text}</p>        
        </div>
    //   <div className={`message ${messageClass}`}>
    //     <p>{text}</p>
    //   </div>
    )
  }

  export default ChatMessage;
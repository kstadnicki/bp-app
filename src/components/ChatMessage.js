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
        <div style={{borderRadius:"25px", padding:".5rem", marginBottom:"0.2rem", maxWidth:"20rem", clear:"both"}} className={props.userid === props.username ? 'text-end bg-primary float-end' : 'bg-secondary'} key={props.id}>
                {props.userid === props.username ? null : <h6 className="bg-primary" style={{display:"inline", borderRadius:"25px", padding:".5rem", marginLeft:"-.45rem"}}>{props.userid}:</h6>  } 
                <p style={{display:"inline"}}>{" "+ props.text}</p>
            
                 
        </div>
    //   <div className={`message ${messageClass}`}>
    //     <p>{text}</p>
    //   </div>
    )
  }

  export default ChatMessage;
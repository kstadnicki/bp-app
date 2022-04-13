import React from "react";
import ChatButton from './chatButton'

const ListOfChatButtons = (props)=>{
    if(props.chats){

        const chatsList = props.chats.map((room)=>(
           <ChatButton activeChat={props.activeChat} key={room.id} room={room.id} changeChatRoom={props.changeChatRoom}/>
        ))    
          console.log(chatsList);
  return(
      <div className="buttons-list" style={{paddingBottom:"2rem"}}>
        {chatsList}
      </div>
    )
    }
}

  export default ListOfChatButtons;
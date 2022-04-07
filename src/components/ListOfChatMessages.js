import React from 'react';
import ChatMessage from './ChatMessage';

const ListOfChatMessages = (props) =>{
    if(props.messages){
    const listOfMessages= props.messages.map((msg)=>{
        return(<ChatMessage key={msg.id} text={msg.text} userid={msg.userid} username={props.userid} />)
    })


    return(
        <div>
            {listOfMessages}
        </div>
    )
    }
}
export default ListOfChatMessages;
import React, {useState} from 'react';
import ListOfChatButtons from "./ListOfChatButtons";
import logo from '../logo.png'
import Modal from './Modal'

const Header = (props) =>{
    // console.log(props.changeView)

    return(        
    <div className="d-flex flex-row" style={{maxHeight:"100px", backgroundColor:"red", marginBottom:"2rem"}}>
        <div className="d-flex flex-row">
        <p><img src={logo} style={{maxHeight:"100px", marginBottom:"1rem", borderRadius:"20px"}}></img></p>
        <div style={{position:"absolute", right:"15rem", top:"3rem"}}>
        <ListOfChatButtons activeChat={props.currentView} chats={props.chats} changeChatRoom={props.changeView}></ListOfChatButtons>
        </div>
        </div>
    </div>
    )
}

export default Header;
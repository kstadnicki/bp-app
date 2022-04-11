import React from 'react';
import Chat from './Chat';

const WelcomeScreen = ({imie, rola, userid})=>{
    return(
        <div>
            <h1 className="float-md-end">Witaj {imie} Rola: {rola}</h1>
            <Chat imie={imie} rola={rola} userid = {userid}></Chat>              
        </div>
    );
}

export default WelcomeScreen;
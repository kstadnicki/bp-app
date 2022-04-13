import React from 'react';
import Calendar from './Calendar/Calendar.js';

const WelcomeScreen = ({imie, rola, userid})=>{
    return(
        <div>
            <h1 className="float-md-end">Witaj {imie} Rola: {rola}</h1>
            <Calendar />              
        </div>
    );
}

export default WelcomeScreen;
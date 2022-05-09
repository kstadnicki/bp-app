import React from 'react';
import Calendar from './Calendar/Calendar.js';
import NewUserForm from './NewUserForm.js';

const WelcomeScreen = ({imie, rola, userid})=>{
    return(
        <div>
            <h1 className="float-md-end">Witaj {imie} Rola: {rola}</h1>
            <Calendar />      
            <NewUserForm></NewUserForm>        
        </div>
    );
}

export default WelcomeScreen;
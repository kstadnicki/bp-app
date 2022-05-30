import React from 'react';
import Calendar from './Calendar/Calendar.js';
import TasksPanel from './TasksPanel';
import domek from "../imgs/domek.jpg";

const WelcomeScreen = ({imie, rola, userid})=>{
    return(
        <div>
            <img src={domek} alt="Domek <3" width="300" height="300"/> 
            <h1 className="float-md-end">Witaj {imie} Rola: {rola}</h1>
            <Calendar /> 
            <TasksPanel imie={imie} rola={rola} userid = {userid}/>      
            {/* <NewTaskForm/>         */}
        </div>
    );
}

export default WelcomeScreen;
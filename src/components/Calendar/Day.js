import React from 'react';
import '../../Styles/calendar.css'

const Day = (props) =>{
   
    //console.log(props.currentDate);
    return <p className={props.dayNumber === props.currentDate.getDate() && (props.isCurrentMonth === true) ? "fw-bold text-center border border-info" : 'text-center'} style={{padding:"10px", minWidth:"38px"}}>{props.dayNumber}</p>
}

export default Day;
import { map } from '@firebase/util';
import React, {useEffect, useState} from 'react';
import '../../Styles/calendar.css';
import Day from "./Day";

const Calendar = ()=>{    


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const currentDate = new Date(); 


    var week0, week1, week2, week3, week4, week5, week6 = [];


    const upMonth = () => {
        
    }

    const downMonth = () => {
        
    }


    // currentDate.setMonth(currentDate.getMonth()+1);
    //const currentDate = new Date(currentDate2.getFullYear() ,currentDate2.getMonth(),1);
    const first = new Date(currentDate.getFullYear() ,currentDate.getMonth(),1); 
    const previousDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),0); 
    const nextDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0); 
    const day = first.getDay() == 0 ? 7 : first.getDay(); // number of the day of the week represented by a number in range 1 - monday to 7 sunday
    var month = currentDate.toLocaleString('default', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);

    var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    var tempDays = [];
    for(var i = 0; i < 7; i ++){
        tempDays.push(days[i].substring(0,2));
    }

    week0 = tempDays.map((number) =>(
        <Day currentDate={currentDate} isCurrentMonth={number > 7 ? false : true} dayNumber={number}></Day>
     ))
       
    tempDays = [];
    var currentMonthDay = 1
    if(day != 7){
            
        //  console.log(month);
        var oldMonthDays =  previousDate.getDate() - day + 2;
        // var currentMonthDays = new Data
        // console.log(oldMonthDays +"="+ previousDate.getDate() +" - " + day );
        // console.log(currentDate);
        for(var i = oldMonthDays; i < 32; i++){
            tempDays.push(i);
            // console.log(i + " = "+oldMonthDays+" - " +day);
        }
        var newMonthDays = 7 - day + 2;
        // console.log(newMonthDays);
        // console.log(currentMonthDay);
        for(currentMonthDay = 1; currentMonthDay < newMonthDays; currentMonthDay++){
            tempDays.push(currentMonthDay);
            // console.log(currentMonthDay);
        }
    }else{
        //  console.log(month);
        var oldMonthDays =  previousDate.getDate() - day + 2;
        // var currentMonthDays = new Data
        console.log(oldMonthDays +"="+ previousDate.getDate() +" - " + day );
        // console.log(currentDate);
        for(var i = oldMonthDays; i < nextDate.getDate(); i++){
            tempDays.push(i);
            // console.log(i + " = "+oldMonthDays+" - " +day);
        }
        var newMonthDays = 7 - day + 2;
        // console.log(newMonthDays);
        // console.log(currentMonthDay);
        for(currentMonthDay = 1; currentMonthDay < newMonthDays; currentMonthDay++){
            tempDays.push(currentMonthDay);
            // console.log(currentMonthDay);
        }
    }

    week1 = tempDays.map((number) =>(
        <Day currentDate={currentDate} isCurrentMonth={number > 7 ? false : true} dayNumber={number}></Day>
     ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    week2 = tempDays.map((number) =>(
        <Day currentDate={currentDate} isCurrentMonth={number < 20 ? true : false} dayNumber={number}></Day>
    ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    week3 = tempDays.map((number) =>(
        <Day currentDate={currentDate} isCurrentMonth={true} dayNumber={number}></Day>
    ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    week4 = tempDays.map((number) =>(
        <Day currentDate={currentDate} isCurrentMonth={true} dayNumber={number}></Day>
    ))

    tempDays = [];



    const currentMonthDays = nextDate.getDate();


    var nextMonthDays = 1;

    // console.log(currentMonthDays - currentMonthDay + 1);
    if(currentMonthDays - currentMonthDay + 1 > 7){
        for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
            tempDays.push(currentMonthDay);
        }
    
        week5 = tempDays.map((number) =>(
            <Day currentDate={currentDate} isCurrentMonth={number > 10 ? true : false} dayNumber={number}></Day>
        ))

        tempDays = [];
    
        var lastWeekDays = 0
        for(var i = currentMonthDay+currentMonthDays - currentMonthDay + 1;currentMonthDay<i;currentMonthDay++){
            tempDays.push(currentMonthDay);
            lastWeekDays++;
        }
        // console.log(lastWeekDays);
        for(; lastWeekDays < 7; lastWeekDays++, nextMonthDays++)
            tempDays.push(nextMonthDays);

        week6 = tempDays.map((number) =>(
            <Day currentDate={currentDate} isCurrentMonth={number > 7 ? true : false} dayNumber={number}></Day>
        ))

    }else{
        var lastWeekDays = 0
        for(var i = currentMonthDay+currentMonthDays - currentMonthDay + 1;currentMonthDay<i;currentMonthDay++){
            tempDays.push(currentMonthDay);
            lastWeekDays++;
        }
        // console.log(lastWeekDays);
        for(; lastWeekDays < 7; lastWeekDays++, nextMonthDays++)
            tempDays.push(nextMonthDays);

        week5 = tempDays.map((number) =>(
            <Day currentDate={currentDate} isCurrentMonth={number > 14 ? true : false} dayNumber={number}></Day>
        ))

        tempDays = [];

        for(var i = 0;i<7;nextMonthDays++, i++){
            tempDays.push(nextMonthDays);
        }

        week6 = tempDays.map((number) =>(
            <Day currentDate={currentDate} isCurrentMonth={number > 14 ? true : false} dayNumber={number}></Day>
        ))
    }

    // console.log(days);
    // props.chats.map((room)=>(
    //     <ChatButton activeChat={props.activeChat} key={room.id} room={room.id} changeChatRoom={props.changeChatRoom}/>
    //  ))    
    return (
        <div className="container-md">
            {/* <div className="inner-container"><h1>{month}</h1><button></button></div> */}
            {/* <h1>{month}</h1><button></button> */}
            <div className="outer-container">
                <div className="inner-container"><button>{'<'}</button><h1>{month}</h1><button>{'>'}</button></div>
                <div className="inner-container">{week0}</div>
                <div className="inner-container">{week1}</div>
                <div className="inner-container">{week2}</div>
                <div className="inner-container">{week3}</div>
                <div className="inner-container">{week4}</div>
                <div className="inner-container">{week5}</div>
                <div className="inner-container">{week6}</div>
            </div>
        </div>
    );
}

export default Calendar;
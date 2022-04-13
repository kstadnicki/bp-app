import { map } from '@firebase/util';
import React, {useEffect, useState} from 'react';
import '../../Styles/calendar.css';

const Calendar = ({imie, rola, userid})=>{    

    const currentDate = new Date(); 
    const first = new Date(currentDate.getFullYear() ,currentDate.getMonth(),1); 
    const previousDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),0); 
    const nextDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0); 
    const day = first.getDay() == 0 ? 7 : first.getDay(); // number of the day of the week represented by a number in range 1 - monday to 7 sunday
    var month = currentDate.toLocaleString('default', { month: 'long' });


    month = month.charAt(0).toUpperCase() + month.slice(1);
        var tempDays = [];
        var currentMonthDay = 1
        if(day != 7){
             
            //  console.log(month);
            var oldMonthDays =  previousDate.getDate() - day + 2;
            // var currentMonthDays = new Data
            console.log(oldMonthDays +"="+ previousDate.getDate() +" - " + day );
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
    const week1 = tempDays.map((number) =>(
        <div>{number}</div>
     ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    const week2 = tempDays.map((number) =>(
        <div>{number}</div>
    ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    const week3 = tempDays.map((number) =>(
        <div>{number}</div>
    ))

    tempDays = [];

    for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
        tempDays.push(currentMonthDay);
    }

    const week4 = tempDays.map((number) =>(
        <div>{number}</div>
    ))

    tempDays = [];



    const currentMonthDays = nextDate.getDate();

    var week5 = [];

    var week6 = [];

    var nextMonthDays = 1;

    // console.log(currentMonthDays - currentMonthDay + 1);
    if(currentMonthDays - currentMonthDay + 1 > 7){
        for(var i = currentMonthDay+7;currentMonthDay<i;currentMonthDay++){
            tempDays.push(currentMonthDay);
        }
    
        week5 = tempDays.map((number) =>(
            <div>{number}</div>
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
            <div>{number}</div>
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
            <div>{number}</div>
        ))

        tempDays = [];

        for(var i = 0;i<7;nextMonthDays++, i++){
            tempDays.push(nextMonthDays);
        }

        week6 = tempDays.map((number) =>(
            <div>{number}</div>
        ))
    }

    // console.log(days);
    // props.chats.map((room)=>(
    //     <ChatButton activeChat={props.activeChat} key={room.id} room={room.id} changeChatRoom={props.changeChatRoom}/>
    //  ))    

    return (
        <div>
            <h1>{month}</h1>
            <div className="outer-container">
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

export default Chat;
import React from 'react';
import db from './firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';

const Chat = ({imie, rola, userid})=>{

    const onLoginChange =(event)=>{
        //setLogin(event.target.value);
    }

    const onFormSubmit = (event)=>{
        event.preventDefault();

    }
     
    const response = getDoc(doc(db,"msg","1"));

    console.log(response);
    return (
        <div>
            {/* <div>
            {isError === true &&
                <Error Text={errorText} alertType="alert-warning"></Error>
            }
            </div > */}
            <div id="messenger">

            </div>

            <form onSubmit={onFormSubmit}>
                <label>
                Wiadomość:
                <input onChange={onLoginChange} type="text" name="login" />
                </label>
                <input type="submit" value="Wyślij" />
            </form>
        </div>
    );
}

export default Chat;
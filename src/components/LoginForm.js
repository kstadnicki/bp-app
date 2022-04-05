import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'

const LoginForm = (props) =>{
    const [login,setLogin]= useState(null);
    const [password,setPassword]= useState(null);  
    const [isError,setIsError] = useState(false);
    const [errorText, setErrorText] = useState("") 

    const onFormSubmit = (event)=>{
        event.preventDefault();
        if(login && password){
          setIsError(false);
          props.onSubmit(login,password);
        }
        else{
        setIsError(true);
        setErrorText("Wypełnij wymagane pola");
        }
    }

    const onLoginChange =(event)=>{
        setLogin(event.target.value);
    }

    const onPasswordChange =(event)=>{
        setPassword(event.target.value);
    }

    return (
      <div>
        {isError === true &&
       <Error Text={errorText} alertType="alert-warning"></Error>
      }
      <form onSubmit={onFormSubmit}>
        <label>
          Login:
          <input onChange={onLoginChange} type="text" name="login" />
        </label>
        <label>
          Hasło:
          <input  onChange={onPasswordChange} type="password" name="password" />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
      </div>
    );
}

export default LoginForm;
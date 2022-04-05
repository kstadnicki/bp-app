import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';

const LoginForm = (props) =>{
    const [login,setLogin]= useState(null);
    const [password,setPassword]= useState(null);
   

    const onFormSubmit = (event)=>{
        event.preventDefault();
        if(login && password)
        props.onSubmit(login,password);
    }

    const onLoginChange =(event)=>{
        setLogin(event.target.value);
    }

    const onPasswordChange =(event)=>{
        setPassword(event.target.value);
    }

    return (
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
    );
}

export default LoginForm;
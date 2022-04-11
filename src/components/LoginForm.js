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
      <div style={{padding:"5rem", backgroundColor:"#222", maxWidth:"500px", borderRadius:"5rem"}} className="d-flex justify-content-center container-sm shadow">
      <div>  
        {isError === true &&     
       <Error Text={errorText} alertType="alert-warning"></Error>
      }
      <form onSubmit={onFormSubmit}>
        <div>
        <label className="form-label fs-5 text-center">
          Login:
          <input className="form-control shadow-sm" onChange={onLoginChange} type="text" name="login" />
        </label>
        </div>
        <label className="form-label fs-5 text-center">
          Hasło:
          <input className="form-control shadow-sm" onChange={onPasswordChange} type="password" name="password" />
        </label>
        <br />
        <button style={{width:"100%", marginTop:"3rem"}} type="submit" value="Wyślij" className="btn btn-primary shadow">Zaloguj</button>
      </form>
      </div>
      </div>
    );
}

export default LoginForm;
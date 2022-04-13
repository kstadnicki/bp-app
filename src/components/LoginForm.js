import React from "react";
import {useState} from 'react';
import db from '../firebase/firebase.js';
import { getDocs, collection, doc, setDoc, addDoc, query, orderBy, limit, getDoc } from 'firebase/firestore';
import Error from './error.js'
import logo from '../logo.png'

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
        <p><img src={logo} style={{maxWidth:"100%", marginBottom:"1rem", borderRadius:"20px"}}></img></p>
        {isError === true &&     
       <Error Text={errorText} alertType="alert-warning"></Error>
      }
      <form onSubmit={onFormSubmit}>
        <div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"80%"}}>
          Login:
          <input className="form-control shadow-sm" onChange={onLoginChange} type="text" name="login"/>
        </label>
        </div>
        <label className="form-label fs-5 text-center text-light" style={{marginLeft:"auto", marginRight:"auto", display:"block", maxWidth:"80%"}}>
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